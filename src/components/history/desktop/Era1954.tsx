"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const Era1954 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const img1Ref = useRef<HTMLImageElement | null>(null);
    const img2Ref = useRef<HTMLImageElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=1800",
                    scrub: true,
                    pin: true,
                },
            });

            // first image (newspaper)
            tl.fromTo(
                img1Ref.current,
                { opacity: 0, rotate: -180, scale: 0.8 },
                {
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                    duration: 1.6,
                    ease: "power3.out",
                }
            );

            // first image disappear
            tl.to(img1Ref.current, {
                opacity: 0,
                scale: 0.9,
                duration: 1.2,
                ease: "power2.inOut",
            });

            // text
            tl.fromTo(
                textRef.current,
                { x: "-40vw", opacity: 0 },
                { x: "0vw", opacity: 1, duration: 1.2, ease: "power2.out" },
                "-=0.6"
            );

            // second image
            tl.fromTo(
                img2Ref.current,
                { x: "40vw", opacity: 0 },
                { x: "0vw", opacity: 1, duration: 1.2, ease: "power2.out" },
                "-=0.8"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const era = about[3];

    return (
        <section
            ref={sectionRef}
            id="1954"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* first image */}
            <Image
                ref={img1Ref}
                src={era.images[0].src}
                alt={era.images[0].alt}
                width={300}
                height={600}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] h-[75vh] w-auto object-contain drop-shadow-2xl"
            />

            {/* second image */}
            <Image
                ref={img2Ref}
                src={era.images[1].src}
                alt={era.images[1].alt}
                width={500}
                height={700}
                className="absolute right-[5%] 2xl:right-[10%] top-1/2 -translate-y-[44.5%] w-auto h-[90%] object-contain drop-shadow-2xl opacity-0"
            />

            {/* text */}
            <div
                ref={textRef}
                className="absolute left-[10%] top-1/2 -translate-y-1/2 text-left max-w-lg 2xl:max-w-xl opacity-0"
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

export default Era1954;
