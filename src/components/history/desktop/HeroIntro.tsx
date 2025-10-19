"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

const HeroIntro = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=1500",
                    scrub: true,
                    pin: true,
                },
            });

            // scroll icon
            tl.to(iconRef.current, { opacity: 0, duration: 0.6, ease: "power1.in" });

            // main title
            tl.to(titleRef.current, {
                scale: 12,
                opacity: 0,
                duration: 1.2,
                ease: "power1.in",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* scroll down icon */}
            <div
                ref={iconRef}
                className="absolute inset-0 flex justify-center items-end pb-10 z-40 scroll-icon"
            >
                <Icon
                    icon="fluent-mdl2:scroll-up-down"
                    className="text-white text-4xl opacity-80 animate-bounce-slow"
                />
            </div>

            {/* main title */}
            <div className="absolute inset-0 flex justify-center items-center z-30">
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl font-bold tracking-wider font-adineu"
                >
                    The adidas legacy
                </h1>
            </div>
        </section>
    );
};

export default HeroIntro;
