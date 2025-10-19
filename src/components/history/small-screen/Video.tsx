"use client"

import { motion } from "framer-motion"

interface VideoProps {
    videos: Array<{ src: string; title: string }>
    index: number
}

const Video = ({ videos, index }: VideoProps) => {
    const getYouTubeEmbedUrl = (url: string) => {
        const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1]
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {videos.map((video, i) => {
                const embedUrl = getYouTubeEmbedUrl(video.src)
                if (!embedUrl) return null

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.05 + i * 0.1 }}
                        className="relative aspect-video overflow-hidden rounded-lg"
                    >
                        <iframe
                            src={embedUrl}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    </motion.div>
                )
            })}
        </div>
    )
}

export default Video