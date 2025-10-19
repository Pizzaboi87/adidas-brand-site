"use client";

import Image from "next/image";
import CompareCard from "@/components/compare/CompareCard";
import AICompare from "@/components/compare/AICompare";
import EmptyComparison from "@/components/compare/EmptyComparison";
import { useCompare } from "@/context/CompareContext";

const Content = () => {
    const baseUrl = "https://res.cloudinary.com/ds75izhfs/image/upload";
    const { compareElements } = useCompare();

    return (
        <main className={`${compareElements.length ? "container mx-auto px-3 xs:px-0" : "xs:ml-10 lg:ml-24"} relative flex flex-col pb-[5rem] 2xl:pb-[10rem]`}>
            <Image
                src="/splash/splash-big_2.webp"
                alt="splash-1"
                width={1000}
                height={800}
                className="opacity-40 absolute -top-[15vh] -right-[10vw] w-[100vw] xl:w-[50vw] h-auto z-[-1]"
            />

            {compareElements.length > 0 ? (
                <>
                    <h1 className="font-doodle text-3xl xs:text-4xl lg:text-5xl mb-5 pt-10">Compare Shoes</h1>

                    {/* --- AI SECTION --- */}
                    <AICompare elements={compareElements} />

                    {/* --- SHOE CARDS --- */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-8">
                        {compareElements.map((shoe, index) => (
                            <CompareCard
                                key={index}
                                shoe={shoe}
                                baseUrl={baseUrl}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <EmptyComparison />
            )}

            <Image
                src="/splash/splash-big_1.webp"
                alt="splash-1"
                width={1000}
                height={800}
                className="opacity-40 absolute -bottom-[10vh] -left-[10vw] w-[100vw] xl:w-[65vw] h-auto z-[-1]"
            />

        </main>
    );
};

export default Content;
