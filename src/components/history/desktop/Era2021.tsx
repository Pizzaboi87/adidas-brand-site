"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era2021 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const yearRef = useRef<HTMLHeadingElement | null>(null)
    const section1Ref = useRef<HTMLDivElement | null>(null)
    const section2Ref = useRef<HTMLDivElement | null>(null)
    const section3Ref = useRef<HTMLDivElement | null>(null)
    const imageRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(yearRef.current, { opacity: 0, x: -50 })
            gsap.set(section1Ref.current, { opacity: 0, y: 50 })
            gsap.set(section2Ref.current, { opacity: 0, y: 50 })
            gsap.set(section3Ref.current, { opacity: 0, y: 50 })
            gsap.set(imageRef.current, { opacity: 0, scale: 0.8, rotateY: -15 })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=5500",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
                defaults: { ease: "power3.out" },
            })

            // 1) Year reveal
            tl.to(yearRef.current, {
                opacity: 1,
                x: 0,
                duration: 1.0,
            })

            // 2) First section - title & text
            tl.to(section1Ref.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
            }, "+=0.3")

            // 3) Fade out first section
            tl.to(section1Ref.current, {
                opacity: 0,
                y: -30,
                duration: 0.8,
            }, "+=1.0")

            // 4) Second section - title & text
            tl.to(section2Ref.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
            }, "-=0.3")

            // 5) Fade out second section
            tl.to(section2Ref.current, {
                opacity: 0,
                y: -30,
                duration: 0.8,
            }, "+=1.0")

            // 6) Third section - title & text
            tl.to(section3Ref.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
            }, "-=0.3")

            // 7) Image reveal with 3D rotation
            tl.to(imageRef.current, {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 1.5,
            }, "+=0.5")

            // Hold at the end
            tl.to({}, { duration: 1.5 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[28]

    return (
        <section
            ref={sectionRef}
            id="2021"
            className="relative h-screen overflow-hidden text-white font-adineu"
        >
            <div className="max-w-7xl mx-auto h-full flex items-center justify-center px-8">
                <div className="relative w-full max-w-4xl">
                    {/* Year - stays visible */}
                    <h2 ref={yearRef} className="text-6xl mb-12 font-bold opacity-0">
                        {era.year}
                    </h2>

                    {/* Section 1 */}
                    <div ref={section1Ref} className="absolute top-20 left-0 right-0 opacity-0">
                        <h3 className="text-3xl mb-6 italic font-light">
                            {era.title}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {era.text[0]}
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div ref={section2Ref} className="absolute top-20 left-0 right-0 opacity-0">
                        <h3 className="text-3xl mb-6 italic font-light">
                            {era.secondTitle}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {era.secondText?.[0]}
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div ref={section3Ref} className="absolute top-20 left-0 right-0 opacity-0">
                        <h3 className="text-3xl mb-6 italic font-light">
                            {era.thirdTitle}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {era.thirdText?.[0]}
                        </p>
                    </div>

                    {/* Image - appears last */}
                    <div ref={imageRef} className="absolute bottom-8 right-0 w-[50%] opacity-0" style={{ perspective: "1000px" }}>
                        <Image
                            src={era.images[0].src}
                            alt={era.images[0].alt}
                            width={400}
                            height={300}
                            className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Era2021