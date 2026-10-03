import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "https://fastitmusic.in";

  // Core static routes with rich image attachments for Google Image Search
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      images: [`${baseUrl}/logo.png`],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      images: [
        `${baseUrl}/aashish-verma.png`,
        `${baseUrl}/sahil-mustak-hussain.png`,
        `${baseUrl}/founder.png`,
        `${baseUrl}/co-founder.png`,
      ],
    },
    {
      url: `${baseUrl}/team/aashish-verma`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${baseUrl}/aashish-verma.png`],
    },
    {
      url: `${baseUrl}/team/sahil-mustak-hussain`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${baseUrl}/sahil-mustak-hussain.png`],
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/artists`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/releases`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    // Fetch dynamic public artists
    const artists = await prisma.publicArtist.findMany({
      select: { slug: true, avatar: true, updatedAt: true },
    });

    const artistUrls: MetadataRoute.Sitemap = artists.map((artist) => ({
      url: `${baseUrl}/artists/${artist.slug}`,
      lastModified: artist.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: artist.avatar ? [artist.avatar] : undefined,
    }));

    // Fetch dynamic public releases
    // @ts-ignore
    const releases = await (prisma as any)['publicRelease'].findMany({
      select: { slug: true, id: true, coverArtUrl: true, updatedAt: true },
    });

    const releaseUrls: MetadataRoute.Sitemap = releases.map((rel: any) => ({
      url: `${baseUrl}/releases/${rel.slug || rel.id}`,
      lastModified: rel.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: rel.coverArtUrl ? [rel.coverArtUrl] : undefined,
    }));

    return [...staticUrls, ...artistUrls, ...releaseUrls];
  } catch (err) {
    console.error("Error generating dynamic sitemap:", err);
    return staticUrls;
  }
}
