"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era2015 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const stageRef = useRef<HTMLDivElement | null>(null)

    // Image wrappers + imgs
    const wrapRefs = useRef<HTMLDivElement[]>([])
    const imgRefs = useRef<HTMLImageElement[]>([])
    const setWrap = (el: HTMLDivElement | null, i: number) => { if (el) wrapRefs.current[i] = el }
    const setImg = (el: HTMLImageElement | null, i: number) => { if (el) imgRefs.current[i] = el }

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(stageRef.current, { minWidth: 520, minHeight: 460 })

            // Text initial
            gsap.set(textRef.current, { opacity: 0, x: 40, filter: "blur(6px)" })

            // Final positions
            const finals = [
                { xPercent: -15, yPercent: -10, rotate: -6, scale: 1.2 },
                { xPercent: 35, yPercent: -5, rotate: 4, scale: 1 },
                { xPercent: -5, yPercent: 55, rotate: -2, scale: 1.2 },
            ]

            // Place them at final layout first
            wrapRefs.current.forEach((w, i) => {
                const f = finals[i]
                gsap.set(w, {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "65%",
                    height: "65%",
                    xPercent: f.xPercent - 50,
                    yPercent: f.yPercent - 50,
                    rotate: f.rotate,
                    scale: f.scale,
                    opacity: 1,
                    zIndex: 10 + i,
                })
            })

            // Start states - fade + scale in
            gsap.set(wrapRefs.current[0], {
                xPercent: finals[0].xPercent - 50,
                yPercent: finals[0].yPercent - 50,
                opacity: 0,
                scale: finals[0].scale * 0.5
            })
            gsap.set(wrapRefs.current[1], {
                xPercent: finals[1].xPercent - 50,
                yPercent: finals[1].yPercent - 50,
                opacity: 0,
                scale: finals[1].scale * 0.5
            })
            gsap.set(wrapRefs.current[2], {
                xPercent: finals[2].xPercent - 50,
                yPercent: finals[2].yPercent - 50,
                opacity: 0,
                scale: finals[2].scale * 0.5
            })

            // Main pinned TL
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=5200",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
                defaults: { ease: "power3.out" },
            })

            // 1) Text
            tl.to(textRef.current, { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.0 })

            // 2) Image 1 - fade + scale + rotate in
            tl.to(wrapRefs.current[0], {
                opacity: 1,
                scale: finals[0].scale,
                duration: 1.0,
            }, "-=0.3")

            // 3) Image 2 - fade + scale in
            tl.to(wrapRefs.current[1], {
                opacity: 1,
                scale: finals[1].scale,
                duration: 1.0,
            }, "-=0.4")

            // 4) Image 3 - fade + scale in
            tl.to(wrapRefs.current[2], {
                opacity: 1,
                scale: finals[2].scale,
                duration: 1.0,
            }, "-=0.4")

            // 5) Subtle float animation for all images
            wrapRefs.current.forEach((wrap, i) => {
                gsap.to(wrap, {
                    y: i % 2 === 0 ? -10 : 10,
                    duration: 2 + i * 0.3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=5200",
                        toggleActions: "play pause resume pause"
                    }
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[25];

    return (
        <section
            ref={sectionRef}
            id="2015"
            className="relative h-screen overflow-hidden text-white font-adineu"
        >
            {/* RIGHT: text */}
            <div
                ref={textRef}
                className="absolute right-[8%] top-[14%] max-w-lg 2xl:max-w-2xl text-right opacity-0"
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

            {/* LEFT: stage */}
            <div
                ref={stageRef}
                className="absolute left-0 top-1/2 -translate-y-[50%] w-[50vw] h-[58vh] overflow-visible"
            >
                {era.images.map((img, i) => (
                    <div key={img.alt} ref={(el) => setWrap(el, i)} className="absolute inset-0">
                        <Image
                            ref={(el) => setImg(el, i)}
                            src={img.src}
                            alt={img.alt}
                            width={400}
                            height={300}
                            className="w-full h-full object-contain pointer-events-none select-none"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Era2015