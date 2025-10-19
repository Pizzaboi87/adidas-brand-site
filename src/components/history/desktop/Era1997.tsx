"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era1997 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2500",
                    scrub: 1.5,
                    pin: true,
                },
                defaults: { ease: "power2.out" },
            })

            // --- TEXT ENTRANCE ---
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.5 }
            )

            // --- IMAGE FLOAT IN ---
            tl.fromTo(
                imgRef.current,
                { opacity: 0, scale: 0.85, y: 60 },
                { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: "back.out(1.4)" },
                "-=0.8"
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[18] // 1997 entry

    return (
        <section
            ref={sectionRef}
            id="1997"
            className="relative font-adineu h-screen overflow-hidden text-white flex flex-col items-center justify-center text-center"
        >
            <div
                ref={textRef}
                className="opacity-0 max-w-2xl px-10 mb-10"
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
                ref={imgRef}
                src={era.images[0].src}
                alt={era.images[0].alt}
                width={300}
                height={200}
                className="w-[500px] h-auto mt-10 object-contain opacity-0 bg-white rounded-tl-full rounded-br-full"
            />
        </section>
    )
}

export default Era1997
