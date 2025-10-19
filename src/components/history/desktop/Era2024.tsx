"use client"

import gsap from "gsap"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { about } from "@/data/about"

gsap.registerPlugin(ScrollTrigger)

const Era2024 = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const section1Ref = useRef<HTMLDivElement | null>(null)
    const section2Ref = useRef<HTMLDivElement | null>(null)
    const video1Ref = useRef<HTMLDivElement | null>(null)
    const video2Ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(section1Ref.current, { opacity: 0, x: -70 })
            gsap.set(video1Ref.current, { opacity: 0, scale: 0.7, rotateZ: -5 })
            gsap.set(section2Ref.current, { opacity: 0, x: 70 })
            gsap.set(video2Ref.current, { opacity: 0, scale: 0.7, rotateZ: 5 })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=5000",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
                defaults: { ease: "power3.out" },
            })

            // 1) First section - text slides from left
            tl.to(section1Ref.current, {
                opacity: 1,
                x: 0,
                duration: 1.3,
            })

            // 2) First video appears with rotation
            tl.to(video1Ref.current, {
                opacity: 1,
                scale: 1,
                rotateZ: 0,
                duration: 1.4,
            }, "-=0.6")

            // 3) Hold
            tl.to({}, { duration: 1.0 })

            // 4) Transition - fade out first section
            tl.to([section1Ref.current, video1Ref.current], {
                opacity: 0,
                duration: 0.9,
            }, "+=0.3")

            // 5) Second section slides in from right
            tl.to(section2Ref.current, {
                opacity: 1,
                x: 0,
                duration: 1.3,
            }, "-=0.4")

            // 6) Second video appears from left
            tl.to(video2Ref.current, {
                opacity: 1,
                scale: 1,
                rotateZ: 0,
                duration: 1.4,
            }, "-=0.6")

            // 7) Subtle parallax effect for videos
            gsap.to(video1Ref.current, {
                y: -20,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=5000",
                    scrub: 1.5,
                }
            })

            gsap.to(video2Ref.current, {
                y: 20,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=5000",
                    scrub: 1.5,
                }
            })

            // Hold at the end
            tl.to({}, { duration: 1.5 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const era = about[31]

    // Extract YouTube video ID from URL
    const getYouTubeId = (url: string) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&"'>]+)/)
        return match ? match[1] : ""
    }

    return (
        <section
            ref={sectionRef}
            id="2024"
            className="relative h-screen overflow-hidden text-white font-adineu"
        >
            <div className="max-w-8xl mx-auto h-full flex items-center justify-center px-8">
                {/* First Section - You Got This Campaign */}
                <div className="relative w-full h-full">
                    {/* Text left side with year */}
                    <div ref={section1Ref} className="absolute left-[6%] top-1/2 -translate-y-1/2 max-w-md 2xl:max-w-xl opacity-0 z-10">
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

                    {/* Video 1 - right side */}
                    {era.videos && era.videos[0] && (
                        <div ref={video1Ref} className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[48vw] max-w-[700px] min-w-[400px] opacity-0 z-20">
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYouTubeId(era.videos[0].src)}`}
                                    title={era.videos[0].title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl pointer-events-auto"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Second Section - 75th Anniversary */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Text right side */}
                    <div ref={section2Ref} className="absolute right-[6%] top-1/2 -translate-y-1/2 max-w-md 2xl:max-w-xl opacity-0 z-10 text-right">
                        <h3 className="text-3xl mb-6 italic font-light">
                            {era.secondTitle}
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed mb-4">
                            {era.secondText?.[0]}
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {era.secondText?.[1]}
                        </p>
                    </div>

                    {/* Video 2 - left side */}
                    {era.videos && era.videos[1] && (
                        <div ref={video2Ref} className="absolute left-[6%] top-1/2 -translate-y-1/2 w-[48vw] max-w-[700px] min-w-[400px] opacity-0 z-20">
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYouTubeId(era.videos[1].src)}`}
                                    title={era.videos[1].title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Era2024