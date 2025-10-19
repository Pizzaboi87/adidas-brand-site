"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era1982 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const timelineRefs = useRef<HTMLDivElement[]>([])

    const setTimelineRef = (el: HTMLDivElement | null, i: number) => {
        if (el) timelineRefs.current[i] = el
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            timelineRefs.current.forEach((item) => {
                const content = item.querySelector(".content-block")
                const image = item.querySelector(".product-image")
                const line = item.querySelector(".timeline-line")

                // Add initial state via GSAP to ensure invisibility before scroll
                gsap.set([content, image], { opacity: 0, y: 40 })
                gsap.set(line, { scaleY: 0, transformOrigin: "top" })

                // Animate line growth
                gsap.to(line, {
                    scaleY: 1,
                    duration: 1,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 60%",
                        scrub: 1,
                    },
                })

                // Animate content fade-in
                gsap.to(content, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                })

                // Animate image with parallax scale
                gsap.to(image, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.4,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const items = [about[11], about[12]] // 1982 Copa Mundial, 1984 Micropacer

    return (
        <section
            ref={sectionRef}
            id="1982"
            className="relative font-adineu min-h-screen text-white py-32 overflow-hidden"
        >
            <div className="relative max-w-7xl mx-auto px-6">
                {items.map((item, index) => (
                    <div
                        key={item.year}
                        ref={(el) => setTimelineRef(el, index)}
                        className="relative mb-48 last:mb-0"
                    >
                        {/* Timeline line */}
                        <div className="timeline-line absolute left-0 md:left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-white/20 via-white/40 to-white/20 origin-top" />

                        {/* Content layout */}
                        <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 === 0 ? "" : "md:grid-flow-dense"}`}>
                            {/* Text content */}
                            <div
                                className={`content-block space-y-6 ${index % 2 === 0
                                    ? "md:pr-20 md:text-right"
                                    : "md:pl-20 md:col-start-2"
                                    }`}
                            >
                                <h2 className="text-6xl mb-3 font-bold">
                                    {item.year}
                                </h2>
                                <h3 className="text-3xl mb-6 italic font-light">
                                    {item.title}
                                </h3>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {item.text[0]}
                                </p>
                            </div>

                            {/* Product image */}
                            <div
                                className={`product-image relative ${index % 2 === 0
                                    ? "md:col-start-2"
                                    : "md:col-start-1"
                                    }`}
                            >
                                <div className="relative group">
                                    <Image
                                        src={item.images[0].src}
                                        alt={item.images[0].alt}
                                        width={400}
                                        height={300}
                                        className="relative w-full max-w-[500px] mx-auto h-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20" />
                                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Era1982
