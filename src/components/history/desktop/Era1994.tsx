"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era1994 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const shoeRefs = useRef<HTMLImageElement[]>([])

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
                defaults: { ease: "power2.inOut" },
            })

            // --- TEXT IN ---
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.2 }
            )

            tl.to({}, { duration: 0.8 })

            // --- SHOES EVOLUTION ---
            shoeRefs.current.forEach((shoe, i) => {
                const next = shoeRefs.current[i + 1]
                if (!next) return

                gsap.set(shoe, { opacity: 0, x: 200, scale: 0.9 })

                // Animate transition from one shoe to the next
                tl.to(shoe, {
                    x: 300,
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.8,
                    ease: "power2.in",
                })

                tl.fromTo(
                    next,
                    { x: -300, opacity: 0, scale: 0.9 },
                    { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.3)" },
                    "<0.2"
                )
            })

            // Hold last shoe
            tl.to({}, { duration: 1.5 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[17] // 1994 entry

    return (
        <section
            ref={sectionRef}
            id="1994"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            {/* --- TEXT --- */}
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

            {/* --- SHOES --- */}
            <div
                className="absolute right-[25%] top-[50%] -translate-y-1/2 flex justify-center items-center"
                style={{ perspective: "1200px" }}
            >
                {era.images.map((shoe, i) => (
                    <div key={shoe.alt} className="absolute flex flex-col items-center">
                        <Image
                            ref={(el) => setShoeRef(el, i)}
                            src={shoe.src}
                            alt={shoe.alt}
                            width={400}
                            height={300}
                            className="w-[38vw] max-w-[700px] h-auto object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.8)] opacity-0"
                            style={{ transformStyle: "preserve-3d" }}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Era1994
