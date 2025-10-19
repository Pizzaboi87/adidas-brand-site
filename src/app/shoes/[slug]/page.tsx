import Content from "@/components/shoe/Content";
import { mergeOpenGraph } from "@/lib/mergeMetaData";

const ShoePage = () => <Content />

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const formattedName =
        slug
            .replaceAll("adidas-", "")
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ") || "Adidas Shoe";

    const title = `${formattedName} | Adidas Brand Site`;
    const description = `Explore the ${formattedName} — an Adidas shoe that combines innovation, comfort, and timeless design. View details, materials, and AI-powered recommendations.`;

    return {
        title,
        description,
        alternates: {
            canonical: `https://weiser-adidas.vercel.app/shoes/${slug}`,
        },
        openGraph: mergeOpenGraph({
            title,
            description,
            url: `https://weiser-adidas.vercel.app/shoes/${slug}`,
            images: [
                {
                    url: `https://weiser-adidas.vercel.app/api/og/shoe?slug=${slug}`,
                    width: 1200,
                    height: 630,
                    alt: `${formattedName} | Adidas Brand Site`,
                },
            ],
        }),
    };
}

export default ShoePage