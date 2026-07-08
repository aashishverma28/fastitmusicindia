import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://fastitmusicindia.com";

  // Static routes
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/pricing",
    "/artists",
    "/releases",
    "/contact",
    "/faq",
    "/career",
    "/privacy",
    "/terms",
    "/apply",
  ];

  const staticUrls = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  try {
    // Fetch dynamic public artists
    const artists = await prisma.publicArtist.findMany({
      select: { slug: true, updatedAt: true },
    });

    const artistUrls = artists.map((artist) => ({
      url: `${baseUrl}/artists/${artist.slug}`,
      lastModified: artist.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    // Fetch dynamic public releases
    // @ts-ignore
    const releases = await (prisma as any)['publicRelease'].findMany({
      select: { slug: true, id: true, updatedAt: true },
    });

    const releaseUrls = releases.map((rel: any) => ({
      url: `${baseUrl}/releases/${rel.slug || rel.id}`,
      lastModified: rel.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticUrls, ...artistUrls, ...releaseUrls];
  } catch (err) {
    console.error("Error generating dynamic sitemap:", err);
    return staticUrls;
  }
}
