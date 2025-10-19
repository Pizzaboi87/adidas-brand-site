"use client";

import Loading from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";
import Banner from "@/components/shoe/Banner";
import Details from "@/components/shoe/Details";
import Recommendation from "@/components/shoe/Recommendation";
import { useShoeBySlugQuery } from "@/hooks/useShoeBySlugQuery";
import { useShoeImagesQuery } from "@/hooks/useShoeImagesQuery";
import { Description } from "@/types/types";
import { useParams } from "next/navigation";

const Content = () => {
    const { slug } = useParams();
    const { data: shoe, isLoading, error } = useShoeBySlugQuery(slug as string);
    const { data: images, isLoading: isImageLoading = [] } = useShoeImagesQuery(slug as string);

    if (isLoading || isImageLoading) return <Loading />
    if (error) return <NotFound errorMsg="An error occurred while loading the shoe details." />
    if (!shoe) return <NotFound errorMsg="The shoes you are looking for are not found." />

    const heroImage = images?.[0];

    return (
        <main className="py-14 overflow-hidden">
            <Banner heroImage={heroImage as string} title={shoe.title} />
            <Details {...{ shoe }} />
            <Recommendation description={shoe.description as Description} excludeSlug={shoe.slug} />
        </main>
    );
};

export default Content;
