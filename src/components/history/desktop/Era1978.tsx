"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const Era1978 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: true,
                    pin: true,
                },
            });

            // text fade-in
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
                "-=1.5"
            );

            // image fade-in with slight zoom
            tl.fromTo(
                imgRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
                "-=1.2"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const era = about[10];

    return (
        <section
            ref={sectionRef}
            id="1978"
            className="relative font-adineu h-screen overflow-hidden text-white flex items-center justify-center"
        >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-24 px-10 md:px-24 max-w-7xl mx-auto">
                {/* text */}
                <div
                    ref={textRef}
                    className="max-w-2xl text-left opacity-0"
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

                {/* image smaller, static */}
                <div className="max-w-md w-full flex-shrink-0">
                    <Image
                        ref={imgRef}
                        src={era.images[0].src}
                        alt={era.images[0].alt}
                        width={400}
                        height={300}
                        className="w-full h-auto object-contain rounded-md opacity-0"
                    />
                </div>
            </div>
        </section>
    );
};

export default Era1978;
