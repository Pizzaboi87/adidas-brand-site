import Content from "@/components/stores/Content";
import { mergeOpenGraph } from "@/lib/mergeMetaData";

const StoresPage = () => <Content />

export const metadata = {
    title: "Store Locator",
    description:
        "Find Adidas stores near you with our interactive store locator. Search by city or district and explore each location through Google Maps and Street View integration.",
    alternates: {
        canonical: "https://weiser-adidas.vercel.app/stores",
    },
    openGraph: mergeOpenGraph({
        title: "Find Adidas Stores Near You",
        description:
            "Locate Adidas stores quickly with our interactive map and Street View experience. Search for retail partners and official Adidas locations by city or area.",
        url: "https://weiser-adidas.vercel.app/stores",
    }),
};

export default StoresPage