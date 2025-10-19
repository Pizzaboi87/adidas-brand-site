import Content from "@/components/compare/Content";
import { mergeOpenGraph } from "@/lib/mergeMetaData";

const ComparePage = () => <Content />

export const metadata = {
    title: "Shoe Comparison",
    description:
        "Compare Adidas shoes side by side with AI-powered analysis. Discover differences in design, materials, comfort, and heritage — and find your perfect pair effortlessly.",
    alternates: {
        canonical: "https://weiser-adidas.vercel.app/compare",
    },
    openGraph: mergeOpenGraph({
        title: "AI Shoe Comparison | Adidas Brand Site",
        description:
            "Experience Adidas AI comparison — analyze sneakers by design, build quality, and history. Let AI help you decide which pair suits your style best.",
        url: "https://weiser-adidas.vercel.app/compare",
    }),
};

export default ComparePage