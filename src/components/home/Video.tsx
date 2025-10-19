"use client";

import { useEffect, useRef, useState } from "react";

const Video = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoEl.preload = "auto";
                        videoEl.load();
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: "800px" }
        );

        observer.observe(videoEl);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="w-full overflow-hidden bg-black flex justify-center items-center">
            <video
                ref={videoRef}
                className={`w-full object-cover aspect-video h-[100dvh] transition-opacity duration-700 
                ${isReady ? "opacity-100" : "opacity-0"}`}
                src="/video/tv_spot.mp4"
                poster="/video/tv_spot_poster.webp"
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                onCanPlayThrough={() => setIsReady(true)}
            />
        </section>
    );
};

export default Video;
