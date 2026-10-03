/**
 * Real-time Spotify Telemetry Service
 * Resolves verified artist statistics, monthly listeners, and song plays directly from Spotify.
 */

interface SpotifyArtistStats {
  artistId: string;
  monthlyListeners: number;
  followers: number;
  totalPlays: number;
  trackPlays: Record<string, number>;
}

// In-memory cache for artist stats
const statsCache = new Map<string, { data: SpotifyArtistStats; expiresAt: number }>();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

// In-memory cache for anonymous session token
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Extracts Spotify artist ID from various URL formats
 */
export function extractSpotifyArtistId(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(/artist\/([a-zA-Z0-9]+)/i);
  return match ? match[1] : null;
}

/**
 * Fetches an anonymous WebPlayer session access token from an embed page
 */
async function getAnonymousToken(): Promise<string | null> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) {
    return cachedToken.token;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch("https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const html = await res.text();
    const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (!match) return null;

    const parsed = JSON.parse(match[1]);
    const session = parsed?.props?.pageProps?.state?.data?.session || 
                    parsed?.props?.pageProps?.state?.settings?.session;

    if (session?.accessToken) {
      const expiresAt = session.accessTokenExpirationTimestampMs || Date.now() + 3600000;
      cachedToken = {
        token: session.accessToken,
        expiresAt,
      };
      return session.accessToken;
    }
  } catch (err: any) {
    console.warn("[SPOTIFY TELEMETRY] Failed to fetch anonymous embed token:", err.message);
  }

  return null;
}

/**
 * Fallback to OpenGraph meta tag scraping for monthly listeners
 */
async function fetchMonthlyListenersFallback(artistId: string): Promise<number> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`https://open.spotify.com/artist/${artistId}`, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return 0;

    const text = await res.text();
    const listenerMatch = text.match(/Artist\s*·\s*([0-9,KMkm\.]+)\s*(?:monthly listeners|listeners|followers)/i) ||
                          text.match(/([0-9,KMkm\.]+)\s*(?:monthly listeners|listeners|followers)/i);
    if (listenerMatch) {
      const cleaned = listenerMatch[1].trim().replace(/,/g, "");
      const num = parseFloat(cleaned);
      if (listenerMatch[1].toLowerCase().includes("m")) return Math.round(num * 1000000);
      if (listenerMatch[1].toLowerCase().includes("k")) return Math.round(num * 1000);
      return isNaN(num) ? 0 : Math.round(num);
    }
  } catch (err: any) {
    console.warn(`[SPOTIFY TELEMETRY] Meta fallback error for artist ${artistId}:`, err.message);
  }
  return 0;
}

/**
 * Fetches real Spotify statistics, monthly listeners, and track playcounts for an artist.
 * If Spotify URL is not available, returns strictly 0s.
 */
export async function fetchSpotifyArtistDetails(spotifyUrl?: string | null): Promise<SpotifyArtistStats> {
  const artistId = extractSpotifyArtistId(spotifyUrl);
  if (!artistId) {
    return {
      artistId: "",
      monthlyListeners: 0,
      followers: 0,
      totalPlays: 0,
      trackPlays: {},
    };
  }

  const cached = statsCache.get(artistId);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  const token = await getAnonymousToken();
  const shaHashes = [
    "1ac33ddab5d39a3a9c27802774e6d78b9405cc188c6f75aed007df2a32737c72",
    "9f8134ef565e78621f1e1793555bd6633c5ac144ae0f89604ed3ae3f80b3c8e6",
  ];

  let monthlyListeners = 0;
  let followers = 0;
  let totalPlays = 0;
  const trackPlays: Record<string, number> = {};

  if (token) {
    for (const hash of shaHashes) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);

        const url = `https://api-partner.spotify.com/pathfinder/v1/query?operationName=queryArtistOverview&variables=${encodeURIComponent(
          JSON.stringify({
            uri: `spotify:artist:${artistId}`,
            locale: "",
            includePrerelease: true,
          })
        )}&extensions=${encodeURIComponent(
          JSON.stringify({
            persistedQuery: {
              version: 1,
              sha256Hash: hash,
            },
          })
        )}`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "app-platform": "WebPlayer",
          },
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (res.ok) {
          const json = await res.json();
          if (!json.errors && json.data?.artistUnion) {
            const artistData = json.data.artistUnion;
            
            // Extract stats
            monthlyListeners = artistData.stats?.monthlyListeners || 0;
            followers = artistData.stats?.followers || 0;

            // Extract top tracks and their play counts
            const topTracks = artistData.discography?.topTracks?.items || [];
            for (const item of topTracks) {
              const track = item?.track;
              if (track?.name) {
                const plays = parseInt(track.playcount || "0", 10) || 0;
                const cleanKey = track.name.toLowerCase().trim();
                trackPlays[cleanKey] = plays;
                totalPlays += plays;
              }
            }
            break; // Successfully loaded from pathfinder
          }
        }
      } catch (err: any) {
        console.warn(`[SPOTIFY TELEMETRY] Error querying pathfinder with hash ${hash.slice(0, 8)}:`, err.message);
      }
    }
  }

  // If pathfinder didn't return monthly listeners, use OpenGraph fallback
  if (monthlyListeners === 0) {
    monthlyListeners = await fetchMonthlyListenersFallback(artistId);
  }

  const result: SpotifyArtistStats = {
    artistId,
    monthlyListeners,
    followers,
    totalPlays,
    trackPlays,
  };

  statsCache.set(artistId, {
    data: result,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });

  return result;
}
