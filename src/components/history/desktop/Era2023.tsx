"use client"

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era2023 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const section1Ref = useRef<HTMLDivElement | null>(null)
    const section2Ref = useRef<HTMLDivElement | null>(null)
    const image1Ref = useRef<HTMLDivElement | null>(null)
    const image2Ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(section1Ref.current, { opacity: 0, x: -60 })
            gsap.set(section2Ref.current, { opacity: 0, x: 60 })
            gsap.set(image1Ref.current, { opacity: 0, y: 80, rotate: -8 })
            gsap.set(image2Ref.current, { opacity: 0, y: -80, rotate: 8 })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=4000",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
                defaults: { ease: "power3.out" },
            })

            // 1) First section slides in from left with first image
            tl.to(section1Ref.current, {
                opacity: 1,
                x: 0,
                duration: 1.2,
            }, "+=0.3")

            tl.to(image1Ref.current, {
                opacity: 1,
                y: 0,
                rotate: 0,
                duration: 1.3,
            }, "-=0.7")

            // 2) Transition - fade out first section and first image
            tl.to([section1Ref.current, image1Ref.current], {
                opacity: 0,
                duration: 0.8,
            }, "+=0.5")

            // 3) Second section slides in from right with second image
            tl.to(section2Ref.current, {
                opacity: 1,
                x: 0,
                duration: 1.2,
            }, "-=0.4")

            tl.to(image2Ref.current, {
                opacity: 1,
                y: 0,
                rotate: 0,
                duration: 1.3,
            }, "-=0.7")

            // 4) Add subtle floating animations for first image
            gsap.to(image1Ref.current, {
                y: -15,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=6000",
                    toggleActions: "play pause resume pause"
                }
            })

            // Hold at the end
            tl.to({}, { duration: 1 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[30]

    return (
        <section
            ref={sectionRef}
            id="2023"
            className="relative h-screen overflow-hidden text-white font-adineu"
        >
            <div className="max-w-7xl mx-auto h-full flex flex-col justify-center px-8">
                {/* First Section - Racing at its Lightest */}
                <div className="relative w-full h-[70vh]">
                    {/* Text left side */}
                    <div
                        ref={section1Ref}
                        className="absolute left-0 top-1/2 -translate-y-1/2 max-w-xl opacity-0 z-10"
                    >
                        <h2 className="text-6xl mb-3 font-bold">
                            {era.year}
                        </h2>
                        <h3 className="text-3xl mb-6 italic font-light">
                            {era.title}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed mb-4">
                            {era.text[0]}
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {era.text[1]}
                        </p>
                    </div>

                    {/* Image 1 - top right */}
                    <div
                        ref={image1Ref}
                        className="absolute right-[5%] top-[8%] w-[35vw] max-w-[450px] min-w-[300px] opacity-0"
                    >
                        <Image
                            src={era.images[0].src}
                            alt={era.images[0].alt}
                            width={400}
                            height={300}
                            className="w-full h-auto object-contain drop-shadow-2xl"
                            draggable={false}
                        />
                    </div>
                </div>

                {/* Second Section - Samba Shoe of the Year */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Text right side */}
                    <div
                        ref={section2Ref}
                        className="absolute right-[8%] top-1/2 -translate-y-1/2 max-w-lg 2xl:max-w-xl opacity-0 z-10 text-right"
                    >
                        <h3 className="text-3xl mb-6 italic font-light">
                            {era.secondTitle}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed mb-4">
                            {era.secondText?.[0]}
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed italic mb-4">
                            {era.secondText?.[1].split("/")[0]}
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed italic">
                            {`/ ${era.secondText?.[1].split("/")[1]} /`}
                        </p>
                    </div>

                    {/* Image 2 - left side, hero positioning */}
                    <div
                        ref={image2Ref}
                        className="absolute left-[12%] top-1/2 -translate-y-1/2 w-[42vw] max-w-[550px] min-w-[350px] opacity-0"
                    >
                        <Image
                            src={era.images[1].src}
                            alt={era.images[1].alt}
                            width={400}
                            height={300}
                            className="w-full h-auto object-contain drop-shadow-2xl"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Era2023