import { Metadata } from "next";

const teamMetadata: Record<
  string,
  {
    name: string;
    role: string;
    description: string;
    image: string;
    instagram: string;
  }
> = {
  "aashish-verma": {
    name: "Aashish Verma",
    role: "Founder & CEO",
    description:
      "Official profile of Aashish Verma, Founder and Chief Executive Officer of Fastit Music India Pvt. Ltd. Leading the revolution in indie music distribution across India.",
    image: "https://fastitmusic.in/aashish-verma.png",
    instagram: "https://www.instagram.com/aashishverma_28",
  },
  "sahil-mustak-hussain": {
    name: "Sahil Mustak Hussain",
    role: "Co-Founder & CMD",
    description:
      "Official profile of Sahil Mustak Hussain, Co-Founder and Chairman & Managing Director of Fastit Music India Pvt. Ltd. Driving strategic brand growth and operations.",
    image: "https://fastitmusic.in/sahil-mustak-hussain.png",
    instagram: "https://www.instagram.com/sahil.mustaak",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMetadata[slug];

  if (!member) {
    return {
      title: "Team Member | Fastit Music India",
    };
  }

  const title = `${member.name} - ${member.role} | Fastit Music India`;
  const url = `https://fastitmusic.in/team/${slug}`;

  return {
    title,
    description: member.description,
    keywords: [
      member.name,
      `${member.name} Fastit Music`,
      `${member.name} ${member.role}`,
      "Fastit Music India founders",
      "Fastit Music leadership",
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description: member.description,
      url,
      siteName: "Fastit Music India",
      type: "profile",
      locale: "en_IN",
      images: [
        {
          url: member.image,
          width: 1200,
          height: 1200,
          alt: `${member.name} - ${member.role} of Fastit Music India`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: member.description,
      images: [member.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function TeamMemberLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = teamMetadata[slug];

  const jsonLd = member
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `https://fastitmusic.in/team/${slug}#person`,
        "name": member.name,
        "jobTitle": member.role,
        "description": member.description,
        "image": {
          "@type": "ImageObject",
          "@id": `${member.image}#image`,
          "url": member.image,
          "contentUrl": member.image,
          "caption": `${member.name} - ${member.role} of Fastit Music India`,
          "description": `Official high-resolution portrait of ${member.name}, ${member.role} at Fastit Music India Pvt. Ltd.`,
          "width": 1200,
          "height": 1200,
        },
        "url": `https://fastitmusic.in/team/${slug}`,
        "sameAs": [member.instagram],
        "worksFor": {
          "@type": "Organization",
          "name": "Fastit Music India Pvt. Ltd.",
          "url": "https://fastitmusic.in",
          "logo": "https://fastitmusic.in/logo.png",
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
