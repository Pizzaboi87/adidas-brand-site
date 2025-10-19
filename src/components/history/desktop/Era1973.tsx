"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useMemo, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era1973 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)
    const shoeRefs = useRef<HTMLImageElement[]>([])

    const setShoeRef = (el: HTMLImageElement | null, i: number) => {
        if (el) shoeRefs.current[i] = el
    }

    const entranceAnimations = useMemo(
        () => [
            { x: 0, y: 0, rotation: 0, scale: 1 }, // first shoe (already visible)
            { x: -800, y: 0, rotation: -45, scale: 0.5 }, // from left
            { x: 800, y: 0, rotation: 45, scale: 0.5 }, // from right
            { x: 0, y: -600, rotation: 180, scale: 0.3 }, // from top
            { x: 0, y: 600, rotation: -180, scale: 0.3 }, // from bottom
            { x: 0, y: 0, rotation: 720, scale: 0.1 }, // zoom in with spin
        ],
        []
    );

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3500",
                    scrub: 1.5,
                    pin: true,
                },
            })

            tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" })

            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 60, x: -30 },
                { opacity: 1, y: 0, x: 0, duration: 1.5, ease: "power3.out" },
                "-=0.5",
            )

            shoeRefs.current.forEach((shoe, i) => {
                if (i === 0) {
                    gsap.set(shoe, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1 })
                } else {
                    const anim = entranceAnimations[i]
                    gsap.set(shoe, {
                        opacity: 0,
                        x: anim.x,
                        y: anim.y,
                        rotation: anim.rotation,
                        scale: anim.scale,
                    })
                }
            })

            shoeRefs.current.forEach((shoe, i) => {
                if (i < shoeRefs.current.length - 1) {
                    // Exit current shoe
                    tl.to(
                        shoe,
                        {
                            x: i % 2 === 0 ? 600 : -600,
                            y: i % 3 === 0 ? -400 : 400,
                            rotation: i % 2 === 0 ? 180 : -180,
                            scale: 0.3,
                            opacity: 0,
                            duration: 1,
                            ease: "power2.in",
                        },
                        "<",
                    )

                    // Enter next shoe
                    const nextAnim = entranceAnimations[i + 1]
                    tl.fromTo(
                        shoeRefs.current[i + 1],
                        {
                            x: nextAnim.x,
                            y: nextAnim.y,
                            rotation: nextAnim.rotation,
                            scale: nextAnim.scale,
                            opacity: 0,
                        },
                        {
                            x: 0,
                            y: 0,
                            rotation: 0,
                            scale: 1,
                            opacity: 1,
                            duration: 1.2,
                            ease: "power3.out",
                        },
                        "<0.3",
                    )

                    tl.to(
                        shoeRefs.current[i + 1],
                        {
                            y: -20,
                            rotation: 5,
                            duration: 0.8,
                            ease: "sine.inOut",
                            yoyo: true,
                            repeat: 1,
                        },
                        ">",
                    )
                }
            })

            tl.to({}, { duration: 1.5 })
        }, sectionRef)

        return () => ctx.revert()
    }, [entranceAnimations])

    const era = about[9];

    return (
        <section
            ref={sectionRef}
            id="1973"
            className="relative font-adineu h-screen overflow-hidden text-white"
        >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />

            {/* text */}
            <div
                ref={textRef}
                className="absolute left-[8%] top-[15%] max-w-xl text-left opacity-0 z-10"
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
                <p className="text-lg text-gray-300 leading-relaxed">
                    {era.text[1]}
                </p>
            </div>

            <div
                className="absolute inset-0 flex justify-end items-center mr-40"
                style={{ perspective: "1200px" }}
            >
                {era.images.map((shoe, i) => (
                    <Image
                        key={shoe.alt}
                        ref={(el) => setShoeRef(el, i)}
                        src={shoe.src}
                        alt={shoe.alt}
                        width={400}
                        height={300}
                        className="absolute w-[35vw] max-w-[550px] h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)] filter brightness-110 contrast-110"
                        style={{ transformStyle: "preserve-3d" }}
                    />
                ))}
            </div>
        </section>
    )
}

export default Era1973
