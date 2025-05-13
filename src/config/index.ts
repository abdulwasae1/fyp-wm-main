import { Metadata } from "next";

export const SITE_CONFIG: Metadata = {
    title: {
        // write a default title for Trimix a Cut, Clip & Creater suggest something unique and catchy don't use the same words of Cut, Clip & Creater give a unique name
        default: "Trimix - Cut, Clip & Create",
        template: `%s | Trimix`
    },
    description: "Trimix is an Cut, Clip & Create Repurpose your content in minutes with AI. No coding skills required. Get started for free!",
    icons: {
        icon: [
            {
                url: "/icons/favicon.ico",
                href: "/icons/favicon.ico",
            }
        ]
    },
    openGraph: {
        title: "Trimix - Cut, Clip & Create",
        description: "Trimix is an Cut, Clip & Create Repurpose your content in minutes with AI. No coding skills required. Get started for free!",
        images: [
            {
                url: "/assets/image.png",
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        creator: "@shreyassihasane",
        title: "Trimix - Cut, Clip & Create",
        description: "Trimix is an Cut, Clip & Create Repurpose your content in minutes with AI. No coding skills required. Get started for free!",
        images: [
            {
                url: "/assets/image.png",
            }
        ]
    },
    metadataBase: new URL("https://Trimix-app.vercel.app"),
};
