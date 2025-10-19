"use client";

import Image from "next/image";
import { Shoe } from "@/types/types";
import { Icon } from "@iconify/react";
import { useCompare } from "@/context/CompareContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    shoe: Shoe;
    baseUrl: string;
}

const CompareCard = ({ shoe, baseUrl }: Props) => {
    const router = useRouter();
    const { removeFromCompare } = useCompare();
    const limit = 160;

    const fullText = shoe.description ?? "";
    const isTruncated =
        (fullText as string).replace(/<[^>]+>/g, "").length > limit;

    // --- new image logic ---
    const heroImg = shoe.slug
        ? `${baseUrl}/${shoe.slug}_00.jpg`
        : "/other/logo-transparent.png";
    const [imgSrc, setImgSrc] = useState<string>(heroImg);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleImgError = () => {
        setImgSrc("/other/no-image.webp");
        setIsLoading(false);
    };

    const handleImgLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="w-full relative text-gray-600 bg-white font-adineu p-2 pb-5 shadow-sm shadow-gray-500 hover:shadow-blue-600 hover:shadow-md rounded-lg transition-all ease-in-out duration-500">
            <Icon
                icon="line-md:minus-circle"
                width="36"
                height="36"
                className="transition-all duration-300 hover:scale-125 cursor-pointer absolute top-2 right-2 z-[10] text-red-400"
                onClick={() => removeFromCompare(shoe.slug)}
            />

            {/* image area */}
            <div className="relative w-full flex justify-center items-center min-h-[16rem]">
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
                        <Image
                            src="/other/logo-transparent.png"
                            alt="Loading placeholder"
                            width={100}
                            height={100}
                            className="opacity-70"
                        />
                    </div>
                )}
                <Image
                    src={imgSrc}
                    alt={shoe.title}
                    width={400}
                    height={400}
                    className={`mx-auto w-[90%] cursor-pointer transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"
                        }`}
                    onError={handleImgError}
                    onLoad={handleImgLoad}
                    unoptimized
                    onClick={() => router.push(`/shoes/${shoe.slug}`)}
                />
            </div>

            <p className="mt-2 text-xl font-semibold">
                {shoe.title.replaceAll("adidas ", "")}
            </p>
            <p className="text-xl font-bold mt-1">
                €{shoe.avg_price?.toFixed(2)}
            </p>
            <p className="mt-4 text-lg">
                Gender: <strong>{shoe.gender}</strong>
            </p>
            <p className="text-lg">
                Country: <strong>{shoe.country}</strong>
            </p>
            <p className="text-lg">
                Code: <strong>{shoe.sku}</strong>
            </p>
            <p className="text-lg">
                Rank: <strong>{shoe.rank}</strong>
            </p>

            {isTruncated && (
                <div className="mt-8 text-md text-left overflow-hidden">
                    <p dangerouslySetInnerHTML={{ __html: fullText }} />
                </div>
            )}
        </div>
    );
};

export default CompareCard;
