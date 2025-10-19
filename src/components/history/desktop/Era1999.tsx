"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era1999 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const ballsRef = useRef<HTMLImageElement[]>([])

    const setBallRef = (el: HTMLImageElement | null, i: number) => {
        if (el) ballsRef.current[i] = el
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=7000",
                    scrub: 1.5,
                    pin: true,
                },
                defaults: { ease: "power2.inOut" },
            })

            // --- TEXT ---
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5 }
            )

            // --- BALL #1 (Icon) ---
            const first = ballsRef.current[0]
            gsap.set(first, {
                opacity: 0,
                x: "100vw",
                y: "10vh",
                rotate: 0,
            })

            tl.to(first, {
                opacity: 1,
                x: "25vw",
                rotate: -720,
                duration: 2,
                ease: "power3.out",
            })

            // --- BALLS 2–7 ---
            const spacing = 15 // vw
            const baseY = "30vh"

            ballsRef.current.slice(1).forEach((ball, i) => {
                const offsetX = 80 - i * spacing
                gsap.set(ball, {
                    opacity: 0,
                    x: "-100vw",
                    y: baseY,
                    rotate: 0,
                })

                tl.to(
                    ball,
                    {
                        opacity: 1,
                        x: `${offsetX}vw`,
                        rotate: gsap.utils.random(1080, 1440),
                        duration: 1.8,
                        ease: "power3.out",
                    },
                    "+=0.6"
                )
            })

            tl.to({}, { duration: 1.5 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[19] // 1999 entry

    return (
        <section
            ref={sectionRef}
            id="1999"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* TEXT */}
            <div
                ref={textRef}
                className="absolute left-[8%] top-[15%] max-w-2xl text-left opacity-0 z-10"
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

            {/* BALLS */}
            <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                {era.images.map((img, i) => (
                    <Image
                        key={img.alt}
                        ref={(el) => setBallRef(el, i)}
                        src={img.src}
                        alt={img.alt}
                        width={300}
                        height={300}
                        className={`absolute object-contain opacity-0 ${i === 0
                            ? "w-[280px] md:w-[340px] lg:w-[400px] top-1/8"
                            : "w-[180px] md:w-[220px] lg:w-[500px] right-[78%]"
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}

export default Era1999
