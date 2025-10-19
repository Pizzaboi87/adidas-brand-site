"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era1991 = () => {
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

            // Text fades in from below
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.5 }
            )

            // Image fades in slightly later with subtle zoom
            tl.fromTo(
                imgRef.current,
                { opacity: 0, scale: 0.9, y: 60 },
                { opacity: 1, scale: 1, y: 0, duration: 1.8 },
                "-=0.8"
            )

            // Hold final state briefly
            tl.to({}, { duration: 1 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[15] // 1991 entry

    return (
        <section
            ref={sectionRef}
            id="1991"
            className="relative font-adineu h-screen overflow-hidden text-white flex items-center justify-center"
        >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-24 px-10 md:px-24 max-w-7xl mx-auto">
                {/* Text content */}
                <div
                    ref={textRef}
                    className="max-w-xl text-left opacity-0"
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

                {/* Image */}
                <div className="max-w-md w-full flex-shrink-0">
                    <Image
                        ref={imgRef}
                        src={era.images[0].src}
                        alt={era.images[0].alt}
                        width={400}
                        height={300}
                        className="w-full h-auto object-contain rounded-md opacity-0 drop-shadow-2xl"
                    />
                </div>
            </div>
        </section>
    )
}

export default Era1991
