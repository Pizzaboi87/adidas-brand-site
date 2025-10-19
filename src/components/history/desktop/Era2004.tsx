"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era2004 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const yearRef = useRef<HTMLHeadingElement | null>(null)
    const titleRef = useRef<HTMLHeadingElement | null>(null)
    const textRef = useRef<HTMLParagraphElement | null>(null)
    const postersRef = useRef<HTMLImageElement[]>([])

    const setPosterRef = (el: HTMLImageElement | null, i: number) => {
        if (el) postersRef.current[i] = el
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                },
            })

            tl.fromTo(yearRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 0)
            tl.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0.3)
            tl.fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0.6)

            const [beckham, ali, laila] = postersRef.current

            // Beckham from left
            tl.fromTo(beckham, { opacity: 0, x: -400 }, { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }, 1.2)

            // Ali from right
            tl.fromTo(ali, { opacity: 0, x: 200, y: -50 }, { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }, 1.5)

            // Laila from bottom
            tl.fromTo(laila, { opacity: 0, x: -250, y: 350 }, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, 1.8)
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[21] // 2004 entry

    return (
        <section
            ref={sectionRef}
            id="2004"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* TEXT CONTENT */}
            <div className="absolute left-[8%] top-[12%] max-w-2xl z-20">
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

            {/* POSTERS - positioned to not overlap text */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Beckham - right side, top */}
                <Image
                    ref={(el) => setPosterRef(el, 0)}
                    src={era.images[0].src}
                    alt={era.images[0].alt}
                    width={300}
                    height={200}
                    className="absolute top-[8%] right-[5%] w-[320px] md:w-[380px] lg:w-[420px] object-contain opacity-0 z-1"
                />

                {/* Ali - right side, middle */}
                <Image
                    ref={(el) => setPosterRef(el, 1)}
                    src={era.images[1].src}
                    alt={era.images[1].alt}
                    width={300}
                    height={500}
                    className="absolute top-[40%] right-[15%] w-[340px] md:w-[400px] lg:w-[450px] object-contain opacity-0 z-2"
                />

                {/* Laila - bottom center-right */}
                <Image
                    ref={(el) => setPosterRef(el, 2)}
                    src={era.images[2].src}
                    alt={era.images[2].alt}
                    width={300}
                    height={200}
                    className="absolute bottom-0 right-[26%] w-[450px] md:w-[420px] lg:w-[600px] object-contain opacity-0 z-0"
                />
            </div>
        </section>
    )
}

export default Era2004
