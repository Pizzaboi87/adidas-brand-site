"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const Era1968 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const imgRefs = useRef<HTMLImageElement[]>([]);
    const textRef = useRef<HTMLDivElement | null>(null);

    // Store image refs in order
    const setImgRef = (el: HTMLImageElement | null, index: number) => {
        if (el) imgRefs.current[index] = el;
    };

    useEffect(() => {
        // Scope GSAP to this section, and clean up on unmount
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=4500",
                    scrub: true,
                    pin: true,
                },
            });

            // Text fade-in
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }
            );

            // Prepare a compact array of valid image elements
            const imgs = imgRefs.current.filter(Boolean);
            const lastIndex = imgs.length - 1;

            // Animate images - only the first N-1 will fade out
            imgs.forEach((img, i) => {
                const enterX = i % 2 === 0 ? "-35vw" : "35vw";

                // Enter animation for each image
                tl.fromTo(
                    img,
                    { opacity: 0, x: enterX, scale: 1.05 },
                    { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power2.out" },
                    "+=0.5"
                );

                // For every image except the last, fade it out before the next one enters
                if (i !== lastIndex) {
                    tl.to(img, {
                        opacity: 0,
                        scale: 1.02,
                        duration: 1.2,
                        ease: "power2.inOut",
                    });
                }
            });

            // Optional - a tiny hold at the end so the last image settles
            tl.to({}, { duration: 0.4 });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const era = about[6];

    return (
        <section
            ref={sectionRef}
            id="1968"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* Main text */}
            <div
                ref={textRef}
                className="absolute left-1/2 -translate-x-1/2 top-[12%] text-center max-w-4xl opacity-0"
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

            {/* Images */}
            {era.images.map((image, index) => (
                <Image
                    ref={(el) => setImgRef(el, index)}
                    key={image.alt}
                    src={image.src}
                    alt={image.alt}
                    width={700}
                    height={500}
                    className="absolute left-1/2 -translate-x-1/2 top-1/2 w-[32vw] max-w-[600px] h-auto object-contain drop-shadow-2xl opacity-0"
                />
            ))}
        </section>
    );
};

export default Era1968;
