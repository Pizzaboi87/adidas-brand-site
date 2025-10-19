"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const Era1959 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const img1Ref = useRef<HTMLImageElement | null>(null);
    const img2Ref = useRef<HTMLImageElement | null>(null);
    const text1Ref = useRef<HTMLDivElement | null>(null);
    const text2Ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3500",
                    scrub: true,
                    pin: true,
                },
            });

            // first part
            tl.fromTo(
                [text1Ref.current, img1Ref.current],
                { opacity: 0, x: (i) => (i === 0 ? -60 : 60) },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    ease: "power2.out",
                }
            );

            // fade out
            tl.to([text1Ref.current, img1Ref.current], {
                opacity: 0,
                x: (i) => (i === 0 ? -40 : 40),
                duration: 1.2,
                ease: "power2.inOut",
            });

            // second part
            tl.fromTo(
                [img2Ref.current, text2Ref.current],
                { opacity: 0, x: (i) => (i === 0 ? -60 : 60) },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.4,
                    ease: "power2.out",
                },
                "-=0.5"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const era = about[4];

    return (
        <section
            ref={sectionRef}
            id="1959"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* first part */}
            <div
                ref={text1Ref}
                className="absolute left-[10%] top-1/2 -translate-y-1/2 max-w-xl text-left opacity-0"
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
                ref={img1Ref}
                src={era.images[0].src}
                alt={era.images[0].alt}
                width={400}
                height={200}
                className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[35vw] max-w-[600px] h-auto object-contain drop-shadow-2xl opacity-0"
            />

            {/* second part */}
            <div
                ref={text2Ref}
                className="absolute right-[10%] top-1/2 -translate-y-1/2 max-w-xl text-right opacity-0"
            >
                <h3 className="text-3xl mb-6 italic font-light">
                    {era.secondTitle}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                    {era.secondText?.[0]}
                </p>
            </div>

            <Image
                ref={img2Ref}
                src={era.images[1].src}
                alt={era.images[1].alt}
                width={400}
                height={200}
                className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[35vw] max-w-[600px] h-auto object-contain drop-shadow-2xl opacity-0"
            />
        </section>
    );
};

export default Era1959;
