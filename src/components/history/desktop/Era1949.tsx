"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const Era1949 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const sealRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2500",
                    scrub: true,
                    pin: true,
                },
            });

            // background zoom
            tl.fromTo(
                imageRef.current,
                { scale: 1.1, opacity: 0 },
                { scale: 1.3, opacity: 1, duration: 1.5, ease: "power2.out" }
            );

            // text
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
                "-=0.8"
            );

            // stamp
            tl.fromTo(
                sealRef.current,
                { opacity: 0, scale: 0 },
                {
                    opacity: 1,
                    scale: 1.3,
                    duration: 0.2,
                    ease: "power4.out",
                },
                "+=0.5"
            )
                .to(sealRef.current, {
                    scale: 0.9,
                    duration: 0.1,
                    ease: "power2.inOut",
                })
                .to(sealRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: "elastic.out(1, 0.4)",
                })
                .to(sealRef.current, {
                    rotate: gsap.utils.random(-5, 5),
                    duration: 0.3,
                    ease: "power2.out",
                }, "-=0.3");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const era = about[1];

    return (
        <section
            ref={sectionRef}
            id="1949"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* background */}
            <Image
                ref={imageRef}
                src={era.images[0].src}
                alt={era.images[0].alt}
                width={600}
                height={800}
                className="absolute top-1/4 2xl:top-1/5 left-0 w-1/2 h-auto object-cover brightness-90"
            />

            {/* text */}
            <div
                ref={textRef}
                className="absolute right-0 top-1/2 max-w-xl 2xl:max-w-2xl -translate-y-1/2 mr-5 flex flex-col justify-center items-center text-center px-8"
            >
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

            {/* stamp */}
            <div
                ref={sealRef}
                className="absolute bottom-[60%] 2xl:bottom-[12%] right-[5%] 2xl:right-[20%] flex justify-center items-center opacity-0"
            >
                <div className="bg-white w-40 2xl:w-32 h-40 2xl:h-32 overflow-hidden rounded-full p-4 shadow-2xl">
                    <Image
                        src={era.images[1].src}
                        alt={era.images[1].alt}
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default Era1949;
