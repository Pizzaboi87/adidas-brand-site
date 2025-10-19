"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const Era1967 = () => {
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
                    end: "+=3000",
                    scrub: true,
                    pin: true,
                },
            });

            // first image
            tl.fromTo(
                img1Ref.current,
                { opacity: 0, scale: 1.3, x: "-40vw" },
                {
                    opacity: 1,
                    scale: 1,
                    x: "0vw",
                    duration: 1.6,
                    ease: "power3.out",
                }
            );

            // text
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
                "-=0.6"
            );

            // first image fade out
            tl.to(img1Ref.current, {
                opacity: 0,
                scale: 1.05,
                duration: 1.4,
                ease: "power2.inOut",
            });

            // second image
            tl.fromTo(
                img2Ref.current,
                { opacity: 0, x: "40vw", rotate: 10 },
                { opacity: 1, x: 0, rotate: 0, duration: 1.6, ease: "power3.out" },
                "-=0.6"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const era = about[5];

    return (
        <section
            ref={sectionRef}
            id="1967"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* first image */}
            <Image
                ref={img1Ref}
                src={era.images[0].src}
                alt={era.images[0].alt}
                width={500}
                height={700}
                className="absolute left-[10%] top-1/2 -translate-y-[45%] h-[80%] max-w-[700px] w-auto object-contain drop-shadow-2xl opacity-0"
            />

            {/* text */}
            <div
                ref={textRef}
                className="absolute right-[10%] top-1/2 -translate-y-1/2 text-right max-w-xl opacity-0"
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

            {/* second image */}
            <Image
                ref={img2Ref}
                src={era.images[1].src}
                alt={era.images[1].alt}
                width={500}
                height={700}
                className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[50vw] h-auto object-contain drop-shadow-2xl opacity-0"
            />
        </section>
    );
};

export default Era1967;
