"use client"

import { motion } from "framer-motion"

interface SectionTextProps {
    paragraphs: string[]
    index: number
}

const SectionText = ({ paragraphs, index }: SectionTextProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
            className="space-y-4 mb-8 text-muted-foreground leading-relaxed"
        >
            {paragraphs.map((paragraph, i) => (
                <p key={i} className="text-base md:text-lg text-pretty">
                    {paragraph}
                </p>
            ))}
        </motion.div>
    )
}

export default SectionText