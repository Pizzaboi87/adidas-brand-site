"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era1986 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const text1Ref = useRef<HTMLDivElement | null>(null)
    const text2Ref = useRef<HTMLDivElement | null>(null)
    const text3Ref = useRef<HTMLDivElement | null>(null)
    const concertImgRef = useRef<HTMLImageElement | null>(null)
    const signedShoeRef = useRef<HTMLImageElement | null>(null)
    const shoeRefs = useRef<HTMLImageElement[]>([])

    // Store refs for the shoe grid
    const setShoeRef = (el: HTMLImageElement | null, i: number) => {
        if (el) shoeRefs.current[i] = el
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
                defaults: { ease: "power2.out" },
            })

            // --- PART 1: The Story & Concert Photo ---
            // First text block fades in
            tl.fromTo(
                text1Ref.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5 }
            )

            // Concert photo zooms in from distance
            tl.fromTo(
                concertImgRef.current,
                { opacity: 0, scale: 0.7, y: 100 },
                { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: "power3.out" },
                "-=0.8"
            )

            // Hold
            tl.to({}, { duration: 0.8 })

            // Fade out first part
            tl.to([text1Ref.current, concertImgRef.current], {
                opacity: 0,
                duration: 1.2,
                ease: "power2.inOut",
            })

            // --- PART 2: The Superstar Story ---
            // Second text appears (centered)
            tl.fromTo(
                text2Ref.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1.4 }
            )

            // Signed shoe drops in with bounce
            tl.fromTo(
                signedShoeRef.current,
                { opacity: 0, y: -200, rotate: -15 },
                { opacity: 1, y: 0, rotate: 0, duration: 1.5, ease: "bounce.out" },
                "-=0.6"
            )

            // Hold
            tl.to({}, { duration: 0.8 })

            // Move second part to the left and park it there
            tl.to([text2Ref.current, signedShoeRef.current], {
                x: -500,
                duration: 1.2,
                ease: "power2.inOut",
                overwrite: "auto",
            })

            // --- PART 3: Superstar Evolution ---
            // Third text (left side)
            tl.fromTo(
                text3Ref.current,
                { opacity: 0, x: -60 },
                { opacity: 1, x: 650, duration: 1.4 }
            )

            // Shoes appear in a grid formation, cascading in
            shoeRefs.current.forEach((shoe, i) => {
                const delay = i * 0.15
                tl.fromTo(
                    shoe,
                    {
                        opacity: 0,
                        scale: 0.6,
                        rotate: i % 2 === 0 ? -20 : 20,
                        y: 100,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        y: 200,
                        duration: 0.2,
                        ease: "back.out(1.2)",
                    },
                    `-=${0.9 - delay}`
                )
            })

            // Hold final view
            tl.to({}, { duration: 1.5 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[13] // 1986 data

    return (
        <section
            ref={sectionRef}
            id="1986"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* --- PART 1: Concert Story --- */}
            <div
                ref={text1Ref}
                className="absolute left-[8%] top-[15%] max-w-xl 2xl:max-w-2xl text-left opacity-0 z-10"
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
                ref={concertImgRef}
                src={era.images[0].src}
                alt={era.images[0].alt}
                width={400}
                height={300}
                className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[38vw] max-w-[650px] h-auto object-contain rounded-lg drop-shadow-2xl opacity-0"
            />

            {/* --- PART 2: Superstar Story --- */}
            <div
                ref={text2Ref}
                className="absolute left-1/2 -translate-x-1/2 top-[18%] text-center max-w-md 2xl:max-w-2xl opacity-0 z-10"
            >
                <h3 className="text-3xl mb-5 italic drop-shadow-md">
                    {era.secondTitle}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-4 drop-shadow-md">
                    {era.secondText?.[0]}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed drop-shadow-md">
                    {era.secondText?.[1]}
                </p>
            </div>

            <Image
                ref={signedShoeRef}
                src={era.images[1].src}
                alt={era.images[1].alt}
                width={300}
                height={400}
                className="absolute left-1/2 -translate-x-1/2 top-[58%] w-[30vw] max-w-[500px] h-auto object-contain drop-shadow-2xl opacity-0"
            />

            {/* --- PART 3: Superstar Evolution Grid --- */}
            <div
                ref={text3Ref}
                className="absolute left-[8%] top-[18%] max-w-md text-left opacity-0 z-10"
            >
                <h3 className="text-3xl mb-4 italic font-light drop-shadow-md">
                    {era.thirdTitle}
                </h3>
                <p className="text-lg text-gray-200 leading-relaxed drop-shadow-md">
                    {era.thirdText?.[0]}
                </p>
            </div>

            {/* Grid of Superstar variations */}
            <div className="absolute right-[6%] top-[20%] w-[55vw] max-w-[800px]">
                <div className="grid grid-cols-2 gap-8">
                    {era.images.slice(2, 7).map((shoe, i) => (
                        <div key={shoe.alt} className="relative">
                            <Image
                                ref={(el) => setShoeRef(el, i)}
                                src={shoe.src}
                                alt={shoe.alt}
                                width={300}
                                height={200}
                                className="w-full h-auto object-contain drop-shadow-xl opacity-0 hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Era1986
