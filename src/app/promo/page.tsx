import Content from "@/components/promo/Content"
import { mergeOpenGraph } from "@/lib/mergeMetaData";

const PromoPage = () => <Content />

export const metadata = {
    title: "Promotions",
    description:
        "Discover exclusive Adidas promotions including the Year End Super Sale and flexible payment options with partners like Affirm, Klarna, Afterpay, and TBI Bank. Upgrade your Adidas collection with great deals and smooth checkout experiences.",
    alternates: {
        canonical: "https://weiser-adidas.vercel.app/promo",
    },
    openGraph: mergeOpenGraph({
        title: "Adidas Promotions",
        description:
            "Explore Adidas promotions including limited-time discounts and easy installment payments. Join adClub for exclusive offers and save up to 40% on your favorite Adidas gear.",
        url: "https://weiser-adidas.vercel.app/promo",
    }),
};

export default PromoPage;
