"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era2019 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)

    // 6 image refs
    const imgRefs = useRef<HTMLDivElement[]>([])
    const setImgRef = (el: HTMLDivElement | null, i: number) => {
        if (el) imgRefs.current[i] = el
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(textRef.current, { opacity: 0, y: 30 })
            imgRefs.current.forEach((img) => {
                gsap.set(img, { opacity: 0, y: 40 })
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=4500",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
                defaults: { ease: "power3.out" },
            })

            // 1) Text reveal
            tl.to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.0,
            })

            // 2) Images fade in sequentially from top to bottom
            imgRefs.current.forEach((img, index) => {
                tl.to(
                    img,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                    },
                    index === 0 ? "+=0.3" : "-=0.35"
                )
            })

            // Hold at the end
            tl.to({}, { duration: 1.0 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[27]

    return (
        <section
            ref={sectionRef}
            id="2019"
            className="relative h-screen overflow-hidden text-white font-adineu"
        >
            {/* Text - left side (same position as Era2013) */}
            <div
                ref={textRef}
                className="absolute left-[8%] top-[14%] max-w-lg 2xl:max-w-2xl opacity-0"
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

            {/* Images - right side in 2x3 grid */}
            <div className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[44vw] max-w-[760px] min-w-[520px]">
                <div className="grid grid-cols-2 gap-4 h-[70vh] min-h-[500px]">
                    {era.images.map((img, i) => (
                        <div
                            key={img.alt}
                            ref={(el) => setImgRef(el, i)}
                            className="opacity-0 rounded-lg overflow-hidden"
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={300}
                                height={200}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Era2019