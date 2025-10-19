"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era1993 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const gridRef = useRef<HTMLDivElement | null>(null)

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

            // --- PART 1: Text intro ---
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.5 }
            )

            tl.to({}, { duration: 1 })

            tl.to(textRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
            })

            // --- PART 2: CEO Grid ---
            tl.fromTo(
                gridRef.current,
                { opacity: 0, y: 80 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
                "+=0.4"
            )

            tl.to({}, { duration: 1.5 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[16] // 1993 entry

    return (
        <section
            ref={sectionRef}
            id="1993"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* --- Text Section --- */}
            <div
                ref={textRef}
                className="absolute left-[8%] top-[18%] max-w-3xl text-left opacity-0 z-10"
            >
                <h2 className="text-6xl mb-3 font-bold">
                    {era.year}
                </h2>
                <h3 className="text-3xl mb-6 italic font-light">
                    {era.title}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    {era.text[0]}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                    {era.text[1]}
                </p>
            </div>

            {/* --- CEO Grid --- */}
            <div
                ref={gridRef}
                className="absolute left-1/2 -translate-x-1/2 top-[12%] w-[90%] max-w-6xl opacity-0"
            >
                <h3 className="text-3xl mb-6 italic font-light text-center">
                    Since 1987, only a handful of people have been trusted to lead adidas.
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
                    {era.images.map((img) => (
                        <figure key={img.alt} className="flex flex-col items-center">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={400}
                                height={400}
                                className="h-[220px] w-auto object-contain rounded-lg drop-shadow-2xl mb-3"
                            />
                            <figcaption className="text-sm text-gray-300 max-w-sm leading-relaxed">
                                {img.alt}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Era1993
