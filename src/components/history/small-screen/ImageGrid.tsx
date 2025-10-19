"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface ImageGridProps {
    images: Array<{ src: string; alt: string }>
}

const ImageGrid = ({ images }: ImageGridProps) => {
    const getGridClass = () => {
        const count = images.length
        if (count === 1) return "md:grid-cols-1 lg:grid-cols-2"
        if (count === 2) return "md:grid-cols-2"
        if (count === 3) return "md:grid-cols-3"
        if (count === 4) return "md:grid-cols-4"
        return "md:grid-cols-3 lg:grid-cols-4"
    }

    return (
        <div className={`flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none gap-4 ${getGridClass()}`}>
            {images.map((image, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className={`${image.src.includes("2004_01") || image.src.includes("2004_03") ? "hidden sm:block" : ""} relative rounded-lg overflow-y-hidden min-w-full md:min-w-0 snap-center md:snap-align-none flex-shrink-0 md:flex-shrink`}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={300}
                        height={200}
                        className={`${image.src.includes("1972_01")
                            ? "mx-auto top-1/2 -translate-y-1/2 relative"
                            : image.src.includes("1967_02")
                                ? "scale-200 relative top-32 mx-auto"
                                : image.src.includes("1999_02") || image.src.includes("1999_03") || image.src.includes("1999_04") || image.src.includes("1999_05") || image.src.includes("1999_06") || image.src.includes("1999_07")
                                    ? "scale-250 sm:scale-180 mx-auto relative top-1/3 sm:top-8 min-h-60"
                                    : image.src.includes("2011_01")
                                        ? "invert mx-auto"
                                        : image.src.includes("1970_01")
                                            ? "mx-auto"
                                            : "w-full"} h-auto object-contain transition-transform duration-500 pb-3`}
                    />
                </motion.div>
            ))}
        </div>
    )
}

export default ImageGrid;