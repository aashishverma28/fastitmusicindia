import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Meet Founder Aashish Verma & Co-Founder Sahil Mustak Hussain",
  description:
    "Learn about Fastit Music India — founded by Aashish Verma (Founder & CEO) & Sahil Mustak Hussain (Co-Founder & CMD). Discover our mission empowering 500+ independent musicians across 150+ global DSP streaming platforms.",
  keywords: [
    "Aashish Verma",
    "Aashish Verma Fastit Music",
    "Aashish Verma Founder",
    "Aashish Verma CEO",
    "Sahil Mustak Hussain",
    "Sahil Mustak Hussain Fastit Music",
    "Sahil Mustak Hussain Co-Founder",
    "Sahil Mustak Hussain CMD",
    "Fastit Music India founders",
    "Fastit Music leadership",
    "About Fastit Music India",
    "Indian music distribution team",
    "Fastit Music India founding team"
  ],
  alternates: { canonical: "https://fastitmusic.in/about" },
  openGraph: {
    title: "About Us | Founders Aashish Verma & Sahil Mustak Hussain | Fastit Music India",
    description: "Meet Founder & CEO Aashish Verma and Co-Founder & CMD Sahil Mustak Hussain — the leadership team empowering independent musicians across India.",
    url: "https://fastitmusic.in/about",
    siteName: "Fastit Music India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://fastitmusic.in/aashish-verma.png",
        width: 1200,
        height: 1200,
        alt: "Aashish Verma - Founder & CEO of Fastit Music India",
        type: "image/png"
      },
      {
        url: "https://fastitmusic.in/sahil-mustak-hussain.png",
        width: 1080,
        height: 1080,
        alt: "Sahil Mustak Hussain - Co-Founder & CMD of Fastit Music India",
        type: "image/png"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founders of Fastit Music India | Aashish Verma & Sahil Mustak Hussain",
    description: "Meet Aashish Verma (Founder & CEO) and Sahil Mustak Hussain (Co-Founder & CMD) of Fastit Music India.",
    images: [
      "https://fastitmusic.in/aashish-verma.png",
      "https://fastitmusic.in/sahil-mustak-hussain.png"
    ],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fastitmusic.in/#organization",
      "name": "Fastit Music India Pvt. Ltd.",
      "alternateName": "Fastit Music India",
      "url": "https://fastitmusic.in",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://fastitmusic.in/#logo",
        "url": "https://fastitmusic.in/logo.png",
        "caption": "Fastit Music India Logo"
      },
      "description": "Fastit Music India is an independent record label and DSP distributor empowering indie artists across India.",
      "founders": [
        {
          "@type": "Person",
          "@id": "https://fastitmusic.in/team/aashish-verma#person",
          "name": "Aashish Verma",
          "jobTitle": "Founder & CEO",
          "image": {
            "@type": "ImageObject",
            "@id": "https://fastitmusic.in/aashish-verma.png#image",
            "url": "https://fastitmusic.in/aashish-verma.png",
            "contentUrl": "https://fastitmusic.in/aashish-verma.png",
            "caption": "Aashish Verma - Founder & CEO of Fastit Music India",
            "description": "Official portrait of Aashish Verma, Founder and Chief Executive Officer of Fastit Music India Pvt. Ltd.",
            "width": 1200,
            "height": 1200
          },
          "url": "https://fastitmusic.in/team/aashish-verma",
          "sameAs": [
            "https://www.instagram.com/aashishverma_28"
          ],
          "worksFor": {
            "@id": "https://fastitmusic.in/#organization"
          }
        },
        {
          "@type": "Person",
          "@id": "https://fastitmusic.in/team/sahil-mustak-hussain#person",
          "name": "Sahil Mustak Hussain",
          "jobTitle": "Co-Founder & CMD",
          "image": {
            "@type": "ImageObject",
            "@id": "https://fastitmusic.in/sahil-mustak-hussain.png#image",
            "url": "https://fastitmusic.in/sahil-mustak-hussain.png",
            "contentUrl": "https://fastitmusic.in/sahil-mustak-hussain.png",
            "caption": "Sahil Mustak Hussain - Co-Founder & CMD of Fastit Music India",
            "description": "Official portrait of Sahil Mustak Hussain, Co-Founder and Chairman & Managing Director of Fastit Music India Pvt. Ltd.",
            "width": 1080,
            "height": 1080
          },
          "url": "https://fastitmusic.in/team/sahil-mustak-hussain",
          "sameAs": [
            "https://www.instagram.com/sahil.mustaak"
          ],
          "worksFor": {
            "@id": "https://fastitmusic.in/#organization"
          }
        }
      ]
    },
    {
      "@type": "AboutPage",
      "@id": "https://fastitmusic.in/about#webpage",
      "url": "https://fastitmusic.in/about",
      "name": "About Us | Meet Founder Aashish Verma & Co-Founder Sahil Mustak Hussain",
      "description": "Meet the team and founders of Fastit Music India — Aashish Verma (Founder & CEO) and Sahil Mustak Hussain (Co-Founder & CMD).",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://fastitmusic.in/#website",
        "url": "https://fastitmusic.in",
        "name": "Fastit Music India"
      },
      "primaryImageOfPage": {
        "@id": "https://fastitmusic.in/aashish-verma.png#image"
      }
    }
  ]
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
