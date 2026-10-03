import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateRealFans } from "@/lib/social-fans";
import { fetchSpotifyArtistDetails } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const artist = await (prisma as any)['publicArtist'].findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      }
    });

    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    // @ts-ignore
    const releases = await (prisma as any)['publicRelease'].findMany({
      where: {
        artistName: artist.name
      },
      orderBy: {
        releaseDate: "desc"
      }
    });

    // Find the verified ArtistProfile by stageName matching the PublicArtist name
    const artistProfile = await prisma.artistProfile.findFirst({
      where: {
        stageName: {
          equals: artist.name,
          mode: 'insensitive'
        }
      },
      include: {
        user: true
      }
    });

    const targetInsta = artist.instagramUrl || artistProfile?.instagramUrl || null;
    const targetSpotify = artist.spotifyUrl || artistProfile?.spotifyUrl || null;
    
    // Resolve real fans and verified Spotify telemetry in parallel
    const [fansInfo, spotifyData] = await Promise.all([
      calculateRealFans(targetInsta, targetSpotify),
      targetSpotify ? fetchSpotifyArtistDetails(targetSpotify) : Promise.resolve(null)
    ]);

    let totalStreams = 0;
    let monthlyListeners = 0;
    const platformMap: Record<string, number> = {};

    // 1. Check verified database Revenue records
    if (artistProfile) {
      const revenues = await prisma.revenue.findMany({
        where: { artistId: artistProfile.id }
      });
      if (revenues.length > 0) {
        totalStreams = revenues.reduce((sum, rev) => sum + rev.streams, 0);
        revenues.forEach(rev => {
          const platform = rev.platform || "Other";
          platformMap[platform] = (platformMap[platform] || 0) + rev.streams;
        });
      }
    }

    // 2. Real Spotify plays and monthly listeners
    if (spotifyData && targetSpotify) {
      monthlyListeners = spotifyData.monthlyListeners;
      
      // If Spotify has track plays, aggregate them
      if (spotifyData.totalPlays > 0) {
        totalStreams += spotifyData.totalPlays;
        platformMap["Spotify"] = (platformMap["Spotify"] || 0) + spotifyData.totalPlays;
      } else {
        // If Spotify is linked but plays are 0, explicitly record 0 plays for Spotify
        if (platformMap["Spotify"] === undefined) {
          platformMap["Spotify"] = 0;
        }
      }
    } else {
      // If Spotify link is not available, strict 0 plays and 0 listeners
      monthlyListeners = 0;
    }

    const platformStats = Object.entries(platformMap).map(([platform, streams]) => ({
      platform,
      streams
    }));

    // Formatted releases with verified streams (real Spotify playcounts or DB revenues)
    const formattedReleases = await Promise.all(releases.map(async (rel: any) => {
      let streams = 0;
      
      const matchingRelease = await prisma.release.findFirst({
        where: {
          title: { equals: rel.title, mode: 'insensitive' },
          artist: { stageName: { equals: artist.name, mode: 'insensitive' } }
        }
      });
      
      if (matchingRelease) {
        const relRevenues = await prisma.revenue.aggregate({
          where: { releaseId: matchingRelease.id },
          _sum: { streams: true }
        });
        streams = relRevenues._sum.streams || 0;
      }
      
      // Match with real Spotify track playcount if available
      if (streams === 0 && spotifyData?.trackPlays) {
        const normRelTitle = rel.title.toLowerCase().trim();
        for (const [spotifyTrackTitle, playcount] of Object.entries(spotifyData.trackPlays)) {
          if (normRelTitle.includes(spotifyTrackTitle) || spotifyTrackTitle.includes(normRelTitle)) {
            streams = playcount;
            break;
          }
        }
      }
      
      // Strictly 0 if no play data, never any fake hash
      return {
        id: rel.id,
        title: rel.title,
        cover: rel.coverArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
        releaseDate: rel.releaseDate,
        slug: rel.slug || rel.id,
        streams
      };
    }));

    const formattedArtist = {
      id: artist.id,
      name: artist.name,
      genre: artist.genre,
      avatar: artist.avatar || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
      bio: artist.bio || artistProfile?.bio || "Independent artist making waves from the heart of India.",
      email: artist.email || artistProfile?.user?.email || null,
      followers: fansInfo.formatted,
      fansTotal: fansInfo.total,
      fansBreakdown: {
        instagram: fansInfo.instagramCount,
        spotify: fansInfo.spotifyCount
      },
      totalStreams,
      monthlyListeners,
      platformStats,
      links: {
        instagram: targetInsta,
        spotify: targetSpotify,
        youtube: artist.youtubeUrl || null,
        twitter: artist.twitterUrl || null
      },
      releases: formattedReleases
    };

    return NextResponse.json({ artist: formattedArtist });
  } catch (error: any) {
    console.error("Public artist detail fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch artist detail" }, { status: 500 });
  }
}
