"use client";

import Image from "next/image";
import Link from "next/link";
import CompareButton from "../compare/CompareButton";
import { useState } from "react";
import type { Shoe } from "@/types/types";

type ShoeCardProps = {
    shoe: Shoe;
    index?: number;
};

const formatPrice = (n: number | null | undefined): string => {
    if (n == null || !Number.isFinite(n)) return "-";
    try {
        return new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }).format(n);
    } catch {
        return `${Math.round(n)} €`;
    }
};

const ShoeCard = ({ shoe, index = 0 }: ShoeCardProps) => {
    const baseUrl = "https://res.cloudinary.com/ds75izhfs/image/upload";

    const heroWebp = shoe.slug
        ? `${baseUrl}/${shoe.slug}_00.webp`
        : "/other/logo-transparent.png";

    const [imgSrc, setImgSrc] = useState<string>(heroWebp);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleImgError = () => {
        setImgSrc("/other/no-image.webp");
        setIsLoading(false);
    };

    const handleImgLoad = () => setIsLoading(false);

    return (
        <Link
            href={`/shoes/${shoe.slug}`}
            className="group bg-white h-[25rem] flex flex-col justify-between shadow-xl rounded-xl overflow-hidden transition-all duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="relative h-[15rem] w-full overflow-hidden flex justify-center items-center">
                {/* skeleton placeholder while loading */}
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
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
                    className={`${imgSrc.includes("no-image")
                        ? "w-full h-auto -mt-5"
                        : "h-[13rem] 2xl:h-[15rem] w-auto"
                        } mx-auto object-contain group-hover:scale-110 transition-transform duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
                    loading="lazy"
                    onError={handleImgError}
                    onLoad={handleImgLoad}
                    unoptimized
                />

                <div className="absolute top-3 right-3 bg-blue-950 text-white text-sm font-medium px-2 py-1 rounded-full">
                    #{shoe.rank ?? "-"}
                </div>
            </div>

            {/* text area */}
            <div className="p-4 h-[10rem] w-full flex flex-col justify-between font-adineu">
                <div className="flex flex-col gap-y-2">
                    <h3 className="text-lg font-semibold line-clamp-2">
                        {shoe.title.replaceAll("adidas ", "")}
                    </h3>

                    <div className="flex items-center gap-x-2">
                        <span className="inline-flex items-center py-1 rounded-md bg-gray-300 px-2 font-medium lowercase">
                            {shoe.gender ?? "-"}
                        </span>
                        {shoe.sku ? <span>SKU: {shoe.sku}</span> : null}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-2xl">
                        Retail price:{" "}
                        <strong>{formatPrice(Number(shoe.avg_price))}</strong>
                    </p>

                    {/* dynamic compare button */}
                    <CompareButton shoe={shoe} />
                </div>
            </div>
        </Link>
    );
};

export default ShoeCard;
