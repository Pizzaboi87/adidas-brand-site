"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era2000 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const itemsRef = useRef<HTMLImageElement[]>([])

    const setItemRef = (el: HTMLImageElement | null, i: number) => {
        if (el) itemsRef.current[i] = el
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=6000",
                    scrub: 1.5,
                    pin: true,
                },
                defaults: { ease: "power2.inOut" },
            })

            // --- TEXT FADE IN ---
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5 }
            )

            // --- IMAGE #1: Yohji Yamamoto dress ---
            const yohji = itemsRef.current[0]
            gsap.set(yohji, { opacity: 0, x: "-100vw", y: "5vh", rotate: 0 })
            tl.to(yohji, {
                opacity: 1,
                x: "30vw",
                duration: 2,
                ease: "power3.out",
            })

            // --- IMAGE #2: Stella McCartney gold sneaker ---
            const stella = itemsRef.current[1]
            gsap.set(stella, { opacity: 0, x: "15vw", y: "30vh", rotate: 0 })
            tl.to(
                stella,
                {
                    opacity: 1,
                    x: "5vw",
                    duration: 2,
                    ease: "power3.out",
                },
                "+=1"
            )

            // --- IMAGE #3: Pharrell blue shoe  ---
            const pharrell = itemsRef.current[2]
            gsap.set(pharrell, {
                opacity: 0,
                x: "-25vw",
                y: "25vh",
                scale: 0.8,
                rotate: 0,
            })
            tl.to(
                pharrell,
                {
                    opacity: 1,
                    y: "30vh",
                    scale: 1,
                    duration: 1.8,
                    ease: "bounce.out",
                },
                "+=1.2"
            )

            tl.to({}, { duration: 1.5 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[20] // 2000 entry

    return (
        <section
            ref={sectionRef}
            id="2000"
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

            {/* IMAGES */}
            <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                {era.images.map((img, i) => (
                    <Image
                        key={img.alt}
                        ref={(el) => setItemRef(el, i)}
                        src={img.src}
                        alt={img.alt}
                        width={500}
                        height={500}
                        className={`absolute object-contain opacity-0 drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)] ${i === 0
                            ? "w-[1000px]" // dress
                            : "w-[500px]"
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}

export default Era2000
