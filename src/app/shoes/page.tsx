import Content from "@/components/shoes/Content";
import { mergeOpenGraph } from "@/lib/mergeMetaData";

const ShoesPage = () => <Content />

export const metadata = {
    title: "Shoe Collection",
    description:
        "Browse the full Adidas shoe collection. Use AI-powered search to find the perfect pair by style, color, gender, or price — from iconic classics to the latest releases.",
    alternates: {
        canonical: "https://weiser-adidas.vercel.app/shoes",
    },
    openGraph: mergeOpenGraph({
        title: "Adidas Shoe Collection",
        description:
            "Explore Adidas shoes and sneakers with smart filters and AI-assisted search. Find models by style, gender, or budget — from Superstar and Samba to Yeezy and beyond.",
        url: "https://weiser-adidas.vercel.app/shoes",
    }),
};

export default ShoesPage;
