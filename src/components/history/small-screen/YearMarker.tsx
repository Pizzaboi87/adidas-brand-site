"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface YearMarkerProps {
    year: string
    index: number
}

const YearMarker = ({ year }: YearMarkerProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="sticky top-24 z-10 mb-8 md:mb-12 w-full bg-amber-300 text-black flex justify-between items-center"
        >
            <div className="inline-block px-6 py-2 text-2xl md:text-4xl font-bold">
                {year}
            </div>

            <Image
                src="/other/logo-transparent.png"
                alt="logo"
                width={50}
                height={50}
                className="h-12 w-auto p-2"
            />
        </motion.div>
    )
}

export default YearMarker