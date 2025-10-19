import Content from "@/components/history/Content";
import { mergeOpenGraph } from "@/lib/mergeMetaData";

const HistoryPage = () => <Content />

export const metadata = {
    title: "History",
    description:
        "Step into the Adidas legacy. Discover how decades of craftsmanship, design evolution, and innovation shaped one of the world’s most iconic sneaker brands.",
    alternates: {
        canonical: "https://weiser-adidas.vercel.app/history",
    },
    openGraph: mergeOpenGraph({
        title: "Adidas Legacy and History",
        description:
            "Explore the story behind Adidas—from its roots in athletic heritage to its evolution through innovation and design. See how the 3-Stripes became a global symbol of performance and style.",
        url: "https://weiser-adidas.vercel.app/history",
    }),
};

export default HistoryPage