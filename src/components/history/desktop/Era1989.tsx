"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era1989 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const text1Ref = useRef<HTMLDivElement | null>(null)
    const text2Ref = useRef<HTMLDivElement | null>(null)
    const img1Ref = useRef<HTMLImageElement | null>(null)
    const img2Ref = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1.5,
                    pin: true,
                },
                defaults: { ease: "power2.out" },
            })

            // --- PART 1: Stock Corporation ---
            tl.fromTo(
                text1Ref.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5 }
            )

            tl.to({}, { duration: 1.2 }) // pause

            // Fade out the first text
            tl.to(text1Ref.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
            })

            // --- PART 2: Torsion System ---
            tl.fromTo(
                text2Ref.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.4 },
                "+=0.3"
            )

            // First image fades in
            tl.fromTo(
                img1Ref.current,
                { opacity: 0, y: 100, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 1.6 },
                "+=0.4"
            )

            // Second image fades in after the first
            tl.fromTo(
                img2Ref.current,
                { opacity: 0, y: 100, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 1.6 },
                "-=0.6"
            )

            // Hold final scene
            tl.to({}, { duration: 1.5 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[14] // 1989 entry

    return (
        <section
            ref={sectionRef}
            id="1989"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* --- PART 1: Stock Corporation --- */}
            <div
                ref={text1Ref}
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

            {/* --- PART 2: Torsion System --- */}
            <div
                ref={text2Ref}
                className="absolute right-[8%] top-[20%] max-w-2xl text-right opacity-0 z-10"
            >
                <h3 className="text-3xl mb-6 italic font-light">
                    {era.secondTitle}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                    {era.secondText?.[0]}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                    {era.secondText?.[1]}
                </p>
            </div>

            {/* --- IMAGES (appear with part 2) --- */}
            <Image
                ref={img1Ref}
                src={era.images[0].src}
                alt={era.images[0].alt}
                width={400}
                height={300}
                className="absolute left-[12%] bottom-[12%] w-[32vw] max-w-[550px] h-auto object-contain opacity-0 drop-shadow-2xl"
            />

            <Image
                ref={img2Ref}
                src={era.images[1].src}
                alt={era.images[1].alt}
                width={400}
                height={300}
                className="absolute right-[12%] bottom-[12%] w-[32vw] max-w-[550px] h-auto object-contain opacity-0 drop-shadow-2xl"
            />
        </section>
    )
}

export default Era1989
