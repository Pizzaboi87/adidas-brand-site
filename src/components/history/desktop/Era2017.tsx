"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era2017 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const shoeWrapRef = useRef<HTMLDivElement | null>(null)
    const shoeImgRef = useRef<HTMLImageElement | null>(null)
    const particlesRef = useRef<HTMLDivElement[]>([])

    const setParticleRef = (el: HTMLDivElement | null, i: number) => {
        if (el) particlesRef.current[i] = el
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(textRef.current, { opacity: 0, y: 40, skewY: 2 })
            gsap.set(shoeWrapRef.current, { opacity: 0, scale: 0.7, rotate: -15 })

            // Set initial particle states
            particlesRef.current.forEach((particle) => {
                gsap.set(particle, {
                    opacity: 0,
                    scale: 0.5,
                    x: gsap.utils.random(-100, 100),
                    y: gsap.utils.random(-100, 100)
                })
            })

            // Main pinned timeline
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

            // 1) Text reveal with skew correction
            tl.to(textRef.current, {
                opacity: 1,
                y: 0,
                skewY: 0,
                duration: 1.2,
            })

            // 2) Shoe dramatic entrance - scale and rotate into view
            tl.to(shoeWrapRef.current, {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 1.5,
                ease: "power4.out"
            }, "+=0.3")

            // 3) Shoe subtle float animation
            tl.fromTo(
                shoeImgRef.current,
                { y: 0, rotate: 0 },
                {
                    y: -30,
                    rotate: -3,
                    duration: 0.8,
                    ease: "sine.inOut"
                },
                "<0.5"
            )

            // 4) Particles appear around the shoe (representing "light and oxygen")
            tl.to(particlesRef.current, {
                opacity: 0.7,
                scale: 1,
                x: 0,
                y: 0,
                duration: 1.2,
                stagger: 0.08,
                ease: "back.out(1.2)"
            }, "-=0.5")

            // 5) Final shoe position with gentle rotation
            tl.to(shoeWrapRef.current, {
                x: "5vw",
                y: "-5vh",
                rotate: 5,
                scale: 1.1,
                duration: 1.5,
                ease: "power2.inOut"
            }, "+=0.4")

            // 6) Subtle continuous parallax
            gsap.to(textRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=4500",
                    scrub: 1.2,
                },
                x: -25,
                y: -15
            })

            gsap.to(shoeImgRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=4500",
                    scrub: 1.2,
                },
                y: -50,
                rotate: 8
            })

            // Particles gentle drift
            particlesRef.current.forEach((particle) => {
                gsap.to(particle, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=4500",
                        scrub: 1.2,
                    },
                    x: gsap.utils.random(-30, 30),
                    y: gsap.utils.random(-40, 40),
                    rotate: gsap.utils.random(-20, 20)
                })
            })

            tl.to({}, { duration: 1.5 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[26]

    return (
        <section
            ref={sectionRef}
            id="2017"
            className="relative h-screen overflow-hidden text-white font-adineu"
        >
            {/* Text - left side */}
            <div
                ref={textRef}
                className="absolute left-[8%] top-[14%] max-w-lg 2xl:max-w-2xl opacity-0 z-10"
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

            {/* Shoe - right side with hero positioning */}
            <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[50vw] max-w-[800px] min-w-[500px]">
                <div ref={shoeWrapRef} className="relative opacity-0">
                    <Image
                        ref={shoeImgRef}
                        src={era.images[0].src}
                        alt={era.images[0].alt}
                        width={500}
                        height={300}
                        className="w-full h-auto object-contain pointer-events-none select-none"
                        draggable={false}
                    />

                    {/* Decorative particles representing "light and oxygen" */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            ref={(el) => setParticleRef(el, i)}
                            className="absolute w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full opacity-0 blur-[1px]"
                            style={{
                                top: `${20 + i * 12}%`,
                                left: `${15 + (i % 2) * 70}%`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Era2017