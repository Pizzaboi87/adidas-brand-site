"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const Era1900 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const frames = gsap.utils.toArray<HTMLDivElement>(".scroll-frame");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: true,
                    pin: true,
                },
            });

            // text
            tl.fromTo(
                ".intro-text",
                { x: "-20vw", opacity: 0 },
                { x: "0vw", opacity: 1, duration: 0.9, ease: "power2.out" }
            );

            // images
            const overlap = "-=0.2";
            frames.forEach((frame, i) => {
                tl.fromTo(
                    frame,
                    { x: "100vw", opacity: 0 },
                    { x: "15vw", opacity: 1, duration: 0.9, ease: "none" },
                    i === 0 ? "+=0.3" : overlap
                ).to(
                    frame,
                    { x: "-100vw", opacity: 0, duration: 0.9, ease: "none" },
                    "+=0.2"
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const era = about[0];

    return (
        <section
            ref={sectionRef}
            id="1900"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* title and text */}
            <div className="intro-text absolute left-32 top-1/4 z-20 max-w-md opacity-0">
                <h2 className="text-6xl mb-3 font-bold">
                    {era.year}
                </h2>
                <h3 className="text-3xl mb-6 italic font-light">
                    {era.title}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                    {era.text[0]}
                </p>
            </div>

            {/* images */}
            <div className="absolute inset-0 flex justify-center items-center">
                {era.images.map((img, index) => (
                    <figure
                        key={index}
                        className="scroll-frame absolute flex flex-col justify-center items-center"
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={500}
                            height={700}
                            className="w-[23rem] h-auto mt-12 object-contain brightness-90 rounded shadow-lg"
                        />
                        <figcaption className="mt-4 text-center text-md text-gray-300 bg-black/60 px-4 py-2 rounded max-w-[345px]">
                            {img.alt}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    );
};

export default Era1900;
