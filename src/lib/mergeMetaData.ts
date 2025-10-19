import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
    type: "website",
    url: "https://weiser-adidas.vercel.app",
    title: "Adidas Brand Site",
    description: "Discover Adidas shoes that blend cutting-edge technology with timeless design. Explore iconic models, AI-powered comparisons, natural-language search, and intelligent recommendations across one of the world’s most legendary footwear brands.",
    siteName: "Adidas Brand Site",
    countryName: "Hungary",
    locale: "en_GB",
    emails: ["contact@peterweiser.com"],
    images: [
        {
            url: "https://weiser-adidas.vercel.app/og-image.png",
            width: 1200,
            height: 630,
            alt: "Adidas Brand Site",
        },
    ],
};

export const mergeOpenGraph = (
    og?: Metadata["openGraph"]
): Metadata["openGraph"] => {
    return {
        ...defaultOpenGraph,
        ...og,
        images: defaultOpenGraph.images,
    };
};