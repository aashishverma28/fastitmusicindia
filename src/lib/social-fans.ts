/**
 * Real-time Social Fans Resolution Utility
 * Resolves verified follower counts from Instagram and Spotify artist profiles.
 */

// In-memory cache to prevent hitting rate limits: key -> { data, expiresAt }
const followerCache = new Map<string, { total: number; formatted: string; instagramCount: number; spotifyCount: number; expiresAt: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export function parseCountString(str: string): number {
  if (!str) return 0;
  const cleaned = str.trim().replace(/,/g, '');
  const match = cleaned.match(/^([\d\.]+)\s*([kmKM])?$/);
  if (!match) {
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : Math.round(num);
  }
  const base = parseFloat(match[1]);
  if (isNaN(base)) return 0;
  const suffix = (match[2] || '').toUpperCase();
  if (suffix === 'K') return Math.round(base * 1000);
  if (suffix === 'M') return Math.round(base * 1000000);
  return Math.round(base);
}

export function formatFansCount(total: number): string {
  if (total <= 0) return "0";
  if (total >= 1000000) {
    const val = total / 1000000;
    return `${val.toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (total >= 1000) {
    const val = total / 1000;
    return `${val.toFixed(1).replace(/\.0$/, '')}K`;
  }
  return total.toLocaleString();
}

export async function fetchInstagramFollowers(url?: string | null): Promise<number> {
  if (!url) return 0;
  try {
    const match = url.match(/instagram\.com\/([a-zA-Z0-9_\.]+)/i);
    if (!match) return 0;
    const username = match[1].replace(/\/$/, '');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) return 0;
    const text = await res.text();
    const followerMatch = text.match(/([0-9,KMkm\.]+)\s*Followers/i);
    if (followerMatch) {
      return parseCountString(followerMatch[1]);
    }
  } catch (err: any) {
    console.warn(`[SOCIAL FANS] Error fetching Instagram followers for ${url}:`, err.message);
  }
  return 0;
}

export async function fetchSpotifyFollowers(url?: string | null): Promise<number> {
  if (!url) return 0;
  try {
    const { fetchSpotifyArtistDetails } = await import("./spotify");
    const details = await fetchSpotifyArtistDetails(url);
    if (details.followers > 0) {
      return details.followers;
    }
    if (details.monthlyListeners > 0) {
      return details.monthlyListeners;
    }
  } catch {
    // fallback to HTML scraper
  }

  try {
    const match = url.match(/artist\/([a-zA-Z0-9]+)/i);
    if (!match) return 0;
    const artistId = match[1];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`https://open.spotify.com/artist/${artistId}`, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) return 0;
    const text = await res.text();
    const listenerMatch = text.match(/Artist\s*·\s*([0-9,KMkm\.]+)\s*(?:monthly listeners|listeners|followers)/i) ||
                          text.match(/([0-9,KMkm\.]+)\s*(?:monthly listeners|listeners|followers)/i);
    if (listenerMatch) {
      return parseCountString(listenerMatch[1]);
    }
  } catch (err: any) {
    console.warn(`[SOCIAL FANS] Error fetching Spotify followers for ${url}:`, err.message);
  }
  return 0;
}

export async function calculateRealFans(
  instagramUrl?: string | null, 
  spotifyUrl?: string | null
): Promise<{ total: number; formatted: string; instagramCount: number; spotifyCount: number }> {
  const normInsta = (instagramUrl || "").trim();
  const normSpotify = (spotifyUrl || "").trim();

  if (!normInsta && !normSpotify) {
    return { total: 0, formatted: "0", instagramCount: 0, spotifyCount: 0 };
  }

  const cacheKey = `${normInsta}__${normSpotify}`;
  const cached = followerCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached;
  }

  const [instagramCount, spotifyCount] = await Promise.all([
    normInsta ? fetchInstagramFollowers(normInsta) : Promise.resolve(0),
    normSpotify ? fetchSpotifyFollowers(normSpotify) : Promise.resolve(0)
  ]);

  const total = instagramCount + spotifyCount;
  const result = {
    total,
    formatted: formatFansCount(total),
    instagramCount,
    spotifyCount,
    expiresAt: Date.now() + CACHE_TTL_MS
  };

  followerCache.set(cacheKey, result);
  return result;
}
