"use client"

import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const EndOfStory = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const textRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1.2,
                    pin: true,
                },
                defaults: { ease: "power2.out" },
            })

            // 1 - text fade
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.2 }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative h-screen overflow-hidden text-white font-adineu"
        >
            <div
                ref={textRef}
                className="absolute text-white inset-0 flex items-center justify-center"
            >
                <p className="text-6xl tracking-wider">to be continued . . .</p>
            </div>
        </section>
    )
}

export default EndOfStory
