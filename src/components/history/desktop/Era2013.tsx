"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era2013 = () => {
    // Root and refs
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)

    // 4 shoe wrappers and images
    const shoeWrapRefs = useRef<HTMLDivElement[]>([])
    const shoeImgRefs = useRef<HTMLImageElement[]>([])
    const setShoeWrap = (el: HTMLDivElement | null, i: number) => { if (el) shoeWrapRefs.current[i] = el }
    const setShoeImg = (el: HTMLImageElement | null, i: number) => { if (el) shoeImgRefs.current[i] = el }

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(textRef.current, { opacity: 0, y: 30 })
            // all shoes start offscreen to the right, invisible
            shoeWrapRefs.current.forEach((wrap) => {
                gsap.set(wrap, { opacity: 0, x: "40vw", y: 0, scale: 1 })
            })

            // Helper - compute docking transform for index n (0 is the first shoe)
            const dockTransform = (n: number) => {
                const xLeft = -22 * n
                const yDown = 30
                const scale = 0.36
                return { x: `${xLeft}vw`, y: `${yDown}vh`, scale }
            }

            // Main pinned timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=6500",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
                defaults: { ease: "power3.out" },
            })

            // 1) Text reveal
            tl.to(textRef.current, { opacity: 1, y: 0, duration: 1.1 })

            // 2) Shoe 1 - show hero, then dock to bottom-right
            tl.to(shoeWrapRefs.current[0], {
                opacity: 1,
                x: 0,
                duration: 1.0,
            })
            tl.fromTo(
                shoeImgRefs.current[0],
                { y: -10, rotate: -0.5, scale: 0.995 },
                { y: -200, rotate: 0, scale: 1, duration: 0.6, ease: "power2.out" },
                "<"
            )
            tl.to(shoeWrapRefs.current[0], {
                ...dockTransform(0),
                duration: 1.0,
            }, "+=0.4")

            // 3) Shoe 2 - enter hero, then dock left of shoe 1
            tl.to(shoeWrapRefs.current[1], { opacity: 1, x: 0, duration: 1.0 }, "+=0.2")
            tl.fromTo(
                shoeImgRefs.current[1],
                { y: -10, rotate: 0.5, scale: 0.995 },
                { y: -200, rotate: 0, scale: 1, duration: 0.6, ease: "power2.out" },
                "<"
            )
            tl.to(shoeWrapRefs.current[1], {
                ...dockTransform(1),
                duration: 1.0,
            }, "+=0.4")

            // 4) Shoe 3 - enter hero, then dock left of shoe 2
            tl.to(shoeWrapRefs.current[2], { opacity: 1, x: 0, duration: 1.0 }, "+=0.2")
            tl.fromTo(
                shoeImgRefs.current[2],
                { y: -10, rotate: -0.4, scale: 0.995 },
                { y: -200, rotate: 0, scale: 1, duration: 0.6, ease: "power2.out" },
                "<"
            )
            tl.to(shoeWrapRefs.current[2], {
                ...dockTransform(2),
                duration: 1.0,
            }, "+=0.4")

            // 5) Shoe 4 - enter hero and stay large
            tl.to(shoeWrapRefs.current[3], { opacity: 1, x: 0, duration: 1.0 }, "+=0.2")
            tl.fromTo(
                shoeImgRefs.current[3],
                { y: -200, rotate: 0.3, scale: 0.995 },
                { y: -200, rotate: 0, scale: 1, duration: 0.6, ease: "power2.out" },
                "<"
            )

            tl.to({}, { duration: 1.5 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[24]

    return (
        <section
            ref={sectionRef}
            id="2013"
            className="relative h-screen overflow-hidden text-white font-adineu"
        >
            {/* Text - left side */}
            <div
                ref={textRef}
                className="absolute left-[8%] top-[14%] max-w-xl 2xl:max-w-2xl opacity-0"
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

            {/* Shoes - hero anchor on the right middle.*/}
            <div className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[44vw] max-w-[760px] min-w-[520px]">
                {era.images.map((img, i) => (
                    <div
                        key={img.alt}
                        ref={(el) => setShoeWrap(el, i)}
                        className="absolute inset-0"
                    >
                        <Image
                            ref={(el) => setShoeImg(el, i)}
                            src={img.src}
                            alt={img.alt}
                            width={500}
                            height={300}
                            className="w-full h-auto object-contain drop-shadow-[0_18px_42px_rgba(0,0,0,0.6)] pointer-events-none select-none"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Era2013
