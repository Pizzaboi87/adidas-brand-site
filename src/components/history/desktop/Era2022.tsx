"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const Era2022 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

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

            // image
            tl.fromTo(
                imageRef.current,
                { opacity: 0, rotate: -10, scale: 1.1, filter: "brightness(0.3)" },
                {
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                    filter: "brightness(1)",
                    duration: 2,
                    ease: "power2.out",
                }
            );

            // text
            tl.fromTo(
                textRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
                "-=1"
            );

            // highlight
            tl.to(imageRef.current, {
                scale: 1.05,
                duration: 0.3,
                ease: "power1.inOut",
                yoyo: true,
                repeat: 1,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const era = about[29];

    return (
        <section
            ref={sectionRef}
            id="2022"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* image */}
            <Image
                ref={imageRef}
                src={era.images[0].src}
                alt={era.images[0].alt}
                width={400}
                height={300}
                className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-auto object-contain drop-shadow-2xl"
            />

            {/* text */}
            <div
                ref={textRef}
                className="absolute left-1/2 bottom-[12%] -translate-x-1/2 text-center max-w-3xl px-8"
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
        </section>
    );
};

export default Era2022;
