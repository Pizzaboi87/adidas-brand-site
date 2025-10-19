import Shoe360Viewer from "../common/Shoe360Viewer"
import CompareButton from "../compare/CompareButton";
import Image from "next/image"
import Link from "next/link";
import { Shoe } from "@/types/types";
import { partners } from "@/data/partners";

const Details = ({ shoe }: { shoe: Shoe }) => (
    <div className="container mx-auto px-5 md:px-0 pt-24 md:pt-32 xl:pt-40 font-adineu relative">
        {/* background-top */}
        <Image
            src="/splash/scratch-tp.webp"
            alt="scratch"
            width={1000}
            height={1000}
            className="absolute z-[-2] w-full h-auto opacity-40 top-10 -left-1/3 scale-200 md:-top-10 md:scale-150 xl:-top-60 xl:scale-100 2xl:scale-85 2xl:-top-100" />

        {/* title, text, 360 */}
        <div className=" grid lg:grid-cols-2 gap-10 items-center">

            {/* title + text */}
            <div className="flex flex-col">
                <span className="flex items-center gap-x-4">
                    <h2 className="text-3xl font-bold">
                        {shoe.title.replaceAll("adidas ", "")}
                    </h2>
                    <CompareButton shoe={shoe} />
                </span>
                <p
                    className="text-gray-800 mt-2 text-xl"
                    dangerouslySetInnerHTML={{ __html: shoe.description ?? "" }}
                />
            </div>

            {/* 360 view */}
            <div className="flex flex-col items-center justify-center mt-10 lg:mt-0">
                <Shoe360Viewer slug={shoe.slug as string} />
            </div>
        </div>

        {/* details, partners */}
        <div className=" mt-16 grid gap-12 2xl:gap-0 lg:grid-cols-2 items-start">

            {/* details */}
            <div className="text-lg flex flex-col gap-y-2">
                <p>SKU: <strong>{shoe.sku}</strong></p>
                <p>Rank: <strong>{shoe.rank}</strong></p>
                <p>Gender: <strong>{shoe.gender}</strong></p>
                <p>Country: <strong>{shoe.country ?? shoe.country}</strong></p>
                <p className="text-xl">
                    Retail price: <strong>€{Number(shoe.avg_price).toFixed(2)}</strong>
                </p>
            </div>

            {/* partners */}
            <div className="lg:text-center p-3 shadow-lg rounded-lg bg-white lg:w-fit lg:mx-auto">
                <h3 className="text-3xl font-bold">Where you can buy</h3>
                <div className="flex flex-wrap items-center gap-5 xl:gap-10 mt-5 justify-start lg:justify-center">
                    {partners.map((partner, index) => (
                        <Link
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            href={partner.link}
                            className="hover:scale-110 transition-all ease-in-out duration-300"
                        >
                            <Image
                                src={partner.src}
                                alt={partner.name}
                                width={300}
                                height={300}
                                className="w-full h-auto max-h-16"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>

        {/* background bottom */}
        <Image
            src="/splash/scratch-tp.webp"
            alt="scratch"
            width={1000}
            height={1000}
            className="absolute z-[-1] w-full h-auto rotate-135 opacity-40 bottom-1/3 scale-150 -right-1/3 md:scale-250 md:hidden lg:block lg:-bottom-1/3 lg:scale-100 2xl:-bottom-1/6 2xl:-right-2/5 2xl:scale-85"
        />
    </div>
);

export default Details;
