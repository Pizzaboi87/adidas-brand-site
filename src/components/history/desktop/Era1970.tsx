"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const Era1970 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // timeline for scroll-based animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2500",
                    scrub: true,
                    pin: true,
                },
            });

            // text fade in
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
            );

            // ball rolls in (rotation + horizontal movement)
            tl.fromTo(
                imgRef.current,
                {
                    x: "-20vw",
                    y: "0vh",
                    rotate: 0,
                    opacity: 1,
                    scale: 1,
                },
                {
                    x: "60vw",
                    y: "0vh",
                    rotate: 1440,
                    opacity: 1,
                    scale: 1,
                    duration: 3,
                    ease: "power2.inOut"
                },
                "+=0.4"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const era = about[7];

    return (
        <section
            ref={sectionRef}
            id="1970"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* text (top-left) */}
            <div
                ref={textRef}
                className="absolute left-[8%] top-[15%] max-w-lg text-left opacity-0"
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

            {/* rolling ball image */}
            <Image
                ref={imgRef}
                src={era.images[0].src}
                alt={era.images[0].alt}
                width={300}
                height={300}
                className="absolute left-0 bottom-[15%] w-[18vw] max-w-[350px] h-auto object-contain drop-shadow-2xl opacity-0"
            />
        </section>
    );
};

export default Era1970;
