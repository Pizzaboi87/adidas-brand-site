"use client"

import { motion } from "framer-motion"

interface SectionTitleProps {
    title: string
    index: number
}

const SectionTitle = ({ title, index }: SectionTitleProps) => {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-balance"
        >
            {title}
        </motion.h2>
    )
}

export default SectionTitle