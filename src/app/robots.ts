import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "https://fastitmusic.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/sysadmin/",
          "/staff/",
          "/login",
          "/forgot-password",
          "/onboarding",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/*.png$", "/*.jpg$", "/*.jpeg$", "/*.webp$", "/*.svg$"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
