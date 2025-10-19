"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era2011 = () => {
    // Root section pin + element refs
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textBlockRef = useRef<HTMLDivElement | null>(null)
    const img1WrapRef = useRef<HTMLDivElement | null>(null)
    const img2WrapRef = useRef<HTMLDivElement | null>(null)
    const img1Ref = useRef<HTMLImageElement | null>(null)
    const img2Ref = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(textBlockRef.current, { opacity: 0, y: 30, skewX: -4 })
            gsap.set(img1WrapRef.current, { opacity: 0, x: 40, clipPath: "inset(0 100% 0 0)" })
            gsap.set(img2WrapRef.current, { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" })

            // Main pinned timeline - one authoritative ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3500",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
                defaults: { ease: "power3.out" },
            })

            // 1) Text reveal - slight skew to straight, cinematic
            tl.to(textBlockRef.current, {
                opacity: 1,
                y: 0,
                skewX: 0,
                duration: 1.2,
            })

            // 2) Image 1 - left-to-right masked wipe + slight settle
            tl.to(
                img1WrapRef.current,
                {
                    opacity: 1,
                    x: 0,
                    clipPath: "inset(0 0% 0 0)",
                    duration: 1.2,
                },
                "-=0.4"
            ).to(img1Ref.current, { y: -8, duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" }, "<")

            // 3) Image 2 - bottom-to-top masked wipe + gentle pop
            tl.to(
                img2WrapRef.current,
                {
                    opacity: 1,
                    y: 0,
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.2,
                },
                "+=0.4"
            ).fromTo(
                img2Ref.current,
                { scale: 0.98, rotate: -1 },
                { scale: 1, rotate: 0, duration: 0.8, ease: "power2.out" },
                "<"
            )

            // 4) Subtle parallax drift while user keeps scrolling - adds life, stays classy
            gsap.to(textBlockRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3500",
                    scrub: 1.2,
                },
                x: -20,
            })
            gsap.to(img1Ref.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3500",
                    scrub: 1.2,
                },
                y: -10,
            })
            gsap.to(img2Ref.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3500",
                    scrub: 1.2,
                },
                y: 10,
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[23];

    return (
        <section
            ref={sectionRef}
            id="2011"
            className="relative h-screen overflow-hidden text-white font-adineu"
        >
            <div className="max-w-7xl mx-auto h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center px-6 md:px-12">
                    {/* Left - Text */}
                    <div ref={textBlockRef} className="opacity-0">
                        <h2 className="text-6xl mb-3 font-bold">
                            {era.year}
                        </h2>
                        <h3 className="text-3xl mb-6 italic font-light">
                            {era.title}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {era.text[0]}
                        </p>

                        <h4 className="text-3xl mt-8 mb-6 italic font-light">
                            {era.secondTitle}
                        </h4>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {era.secondText?.[0]}
                        </p>
                    </div>

                    {/* Right - Images stack */}
                    <div className="relative h-[60vh] min-h-[520px] w-full">
                        {/* Image 1 wrapper - masked wipe from left */}
                        <div
                            ref={img1WrapRef}
                            className="absolute top-0 left-0 w-[72%] h-[50%] opacity-0"
                            style={{ clipPath: "inset(0 100% 0 0)" }}
                        >
                            <div className="relative w-full h-full rounded-md overflow-hidden">
                                <Image
                                    ref={img1Ref}
                                    src={era.images?.[0].src}
                                    alt={era.images?.[0].alt}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Image 2 wrapper - masked wipe from bottom */}
                        <div
                            ref={img2WrapRef}
                            className="absolute bottom-0 right-0 w-[72%] h-[55%] opacity-0"
                            style={{ clipPath: "inset(100% 0 0 0)" }}
                        >
                            <div className="relative w-full h-full rounded-md overflow-hidden">
                                <Image
                                    ref={img2Ref}
                                    src={era.images?.[1].src}
                                    alt={era.images?.[1].alt}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Era2011
