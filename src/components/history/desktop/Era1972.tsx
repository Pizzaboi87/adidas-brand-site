"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const Era1972 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLImageElement | null>(null);
    const text1Ref = useRef<HTMLDivElement | null>(null);

    const text2Ref = useRef<HTMLDivElement | null>(null);
    const imgRefs = useRef<HTMLImageElement[]>([]);

    const setImgRef = (el: HTMLImageElement | null, i: number) => {
        if (el) imgRefs.current[i] = el;
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=4000",
                    scrub: true,
                    pin: true,
                },
            });

            // --- PART 1: The Trefoil is Born ---
            // logo fade in + scale
            tl.fromTo(
                logoRef.current,
                { opacity: 0, scale: 0.6, rotate: -20 },
                { opacity: 1, scale: 1, rotate: 0, duration: 1.4, ease: "power3.out" }
            );

            // text fade in
            tl.fromTo(
                text1Ref.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
                "-=0.6"
            );

            // fade out before next part
            tl.to([logoRef.current, text1Ref.current], {
                opacity: 0,
                duration: 1.2,
                ease: "power2.inOut",
            });

            // --- PART 2: Becoming a True Multi-Sports Specialist ---
            // text fade in (right-aligned)
            tl.fromTo(
                text2Ref.current,
                { opacity: 0, x: 60 },
                { opacity: 1, x: 0, duration: 1.4, ease: "power2.out" }
            );

            // slideshow-like sequence: all slide in from left, out to left — last one stays
            imgRefs.current.forEach((img, i) => {
                tl.fromTo(
                    img,
                    { opacity: 0, x: "-40vw", scale: 1.05 },
                    { opacity: 1, x: "0vw", scale: 1, duration: 1.2, ease: "power2.out" },
                    i === 0 ? "+=0.3" : "-=0.3"
                );

                // only the first two slide out — last one stays visible
                if (i < imgRefs.current.length - 1) {
                    tl.to(
                        img,
                        { opacity: 0, x: "-40vw", duration: 1.2, ease: "power2.inOut" },
                        "+=0.8"
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const era = about[8];

    return (
        <section
            ref={sectionRef}
            id="1972"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* --- Part 1: Trefoil --- */}
            <div
                ref={text1Ref}
                className="absolute top-[25%] left-1/2 -translate-x-1/2 text-center max-w-3xl opacity-0"
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

            <Image
                ref={logoRef}
                src={era.images[0].src}
                alt={era.images[0].alt}
                width={300}
                height={300}
                className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 w-[20vw] max-w-[400px] h-auto object-contain drop-shadow-2xl opacity-0"
            />

            {/* --- Part 2: Multi-Sports --- */}
            <div
                ref={text2Ref}
                className="absolute right-[10%] top-[20%] text-right max-w-lg 2xl:max-w-2xl opacity-0"
            >
                <h3 className="text-3xl mb-4 italic">
                    {era.secondTitle}
                </h3>
                <p className="text-lg text-gray-200 leading-relaxed">
                    {era.secondText?.[0]}
                </p>
            </div>

            {era.images.slice(1).map((image, i) => (
                <Image
                    ref={(el) => setImgRef(el, i)}
                    key={image.alt}
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={300}
                    className="absolute left-1/12 -translate-x-1/2 top-1/5 w-[35vw] max-w-[600px] h-auto object-contain drop-shadow-2xl opacity-0"
                />
            ))}
        </section>
    );
};

export default Era1972;
