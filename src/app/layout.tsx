import type { Metadata } from "next";
import { Epilogue, Manrope, Caveat } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fastitmusic.in"),
  title: {
    default: "Fastit Music India | Premier Music Distribution",
    template: "%s | Fastit Music India",
  },
  description:
    "India's most powerful music distribution platform. Upload music to Spotify, Apple Music, YouTube Music, JioSaavn & more. Keep 100% of your royalties. Built for independent artists and labels.",
  keywords: [
    "music distribution india",
    "independent artist india",
    "fastit music",
    "upload music to spotify india",
    "music label india",
    "royalty management india",
    "digital music distribution",
    "indian music platform",
    "release music online india",
    "music distribution platform",
  ],
  authors: [{ name: "Fastit Music India", url: "https://fastitmusic.in" }],
  creator: "Fastit Music India",
  publisher: "Fastit Music India",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fastitmusic.in",
    siteName: "Fastit Music India",
    title: "Fastit Music India | Premier Music Distribution",
    description:
      "Upload your music to Spotify, Apple Music, YouTube Music, JioSaavn & 150+ stores. Keep 100% royalties. India's premier music distribution platform.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Fastit Music India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fastit Music India | Premier Music Distribution",
    description:
      "Upload your music to Spotify, Apple Music, YouTube Music, JioSaavn & 150+ stores. Keep 100% royalties. India's premier music distribution platform.",
    images: ["/logo.png"],
    creator: "@fastitmusicindia",
  },
  alternates: {
    canonical: "https://fastitmusic.in",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AudioPlayer from "@/components/audio/AudioPlayer";

import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${epilogue.variable} ${manrope.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Fastit Music India",
              "url": "https://fastitmusic.in",
              "logo": "https://fastitmusic.in/logo.png",
              "description": "India's premier music distribution and financial management platform for independent artists and labels.",
              "sameAs": [
                "https://www.instagram.com/fastitmusicindia",
                "https://youtube.com/@fastitmusicindia"
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground relative transition-colors duration-200">
        <div className="noise-bg" />
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <AudioPlayer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
