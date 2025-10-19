"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era2006 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1.2,
                    pin: true,
                },
                defaults: { ease: "power2.out" },
            })

            // 1 - Intro text fade and slide in from the left
            tl.fromTo(
                textRef.current,
                { opacity: 0, x: -40, y: 20 },
                { opacity: 1, x: 0, y: 0, duration: 1.2 }
            )

            // 2 - Logo/image comes in from the right with a small scale-in
            tl.fromTo(
                imgRef.current,
                { opacity: 0, x: 80, scale: 0.9 },
                { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out" },
                "-=0.6"
            )

            // 3 - Subtle parallax while scrolling - keeps things alive without being flashy
            gsap.to(textRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1.2,
                },
                x: -30,
            })

            gsap.to(imgRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1.2,
                },
                x: 20,
                scale: 1.02,
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[22];

    return (
        <section
            ref={sectionRef}
            id="2006"
            className="relative h-screen overflow-hidden text-white font-adineu"
        >
            {/* Text block - left side */}
            <div
                ref={textRef}
                className="absolute left-[8%] top-[18%] max-w-2xl text-left opacity-0 z-10"
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

            {/* Image - right side */}
            <div className="absolute inset-0 flex items-center justify-end pr-[8%]">
                <Image
                    ref={imgRef}
                    src={era.images[0].src}
                    alt={era.images[0].alt}
                    width={300}
                    height={200}
                    className="w-[320px] md:w-[420px] lg:w-[520px] h-auto object-contain opacity-0"
                />
            </div>
        </section>
    )
}

export default Era2006
