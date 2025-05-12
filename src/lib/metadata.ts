import { Metadata } from "next"

export const siteConfig = {
  name: "Trimix",
  description: "Trimix: Cut, Clip and Create! Maximize Your Content, Minimize Your Effort",
  url: "https://trimix.yourdomain.com",
  ogImage: "https://trimix.yourdomain.com/og.jpg",
  links: {
    twitter: "https://twitter.com/trimix",
    github: "https://github.com/trimix",
  },
}

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "content creation",
    "video editing",
    "AI content",
    "content repurposing",
    "video trimming",
    "content automation",
    "video clips"
  ],
  authors: [
    {
      name: "Trimix Team",
    },
  ],
  creator: "Trimix Team",
  publisher: "Trimix",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@trimix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": 30,
      "max-image-preview": "large",
      "max-snippet": 100,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}