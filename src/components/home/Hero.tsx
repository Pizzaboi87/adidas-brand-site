"use client";

import Image from "next/image";
import FloatingText from "./FloatingText";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TOTAL_IMAGES = 9;
const INTERVAL_MS = 2000;

const getUniqueRandomIndex = (exclude: number[], max: number) => {
    let idx = Math.floor(Math.random() * max) + 1;
    while (exclude.includes(idx)) idx = Math.floor(Math.random() * max) + 1;
    return idx;
};

const getRandomSlot = (exclude: number, max: number) => {
    let idx = Math.floor(Math.random() * max);
    while (idx === exclude) idx = Math.floor(Math.random() * max);
    return idx;
};

const formatName = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const directions = [
    { x: -100, y: 0 },
    { x: 0, y: -100 },
    { x: 0, y: 100 },
    { x: 100, y: 0 },
];

const Hero = () => {
    const [visibleImages, setVisibleImages] = useState([1, 3, 6, 9]);
    const [incoming, setIncoming] = useState<number | null>(null);
    const [incomingSlot, setIncomingSlot] = useState<number | null>(null);
    const [lastSlot, setLastSlot] = useState<number | null>(null);
    const [textSlot, setTextSlot] = useState<number | null>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const slotToChange = getRandomSlot(lastSlot ?? -1, visibleImages.length);
            const newImage = getUniqueRandomIndex(visibleImages, TOTAL_IMAGES);

            setIncoming(newImage);
            setIncomingSlot(slotToChange);
            setLastSlot(slotToChange);

            const allowText = textSlot === null;

            setTimeout(() => {
                const updated = [...visibleImages];
                updated[slotToChange] = newImage;
                setVisibleImages(updated);
                setIncoming(null);
                setIncomingSlot(null);

                if (slotToChange === textSlot) {
                    setTextSlot(null);
                } else if (allowText) {
                    setTextSlot(slotToChange);
                }
            }, 900);
        }, INTERVAL_MS);

        return () => clearInterval(interval);
    }, [visibleImages, lastSlot, textSlot]);

    const imageVariants = {
        initial: (slot: number) => ({
            opacity: 0,
            x: directions[slot].x,
            y: directions[slot].y,
            scale: 1.05,
        }),
        animate: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const Cell = ({ slotIndex }: { slotIndex: number }) => (
        <div className="relative h-[calc((100vh-5.5rem)/3)] md:h-auto overflow-hidden">
            <Image
                src={`/brand/brand_${formatName(visibleImages[slotIndex])}.webp`}
                alt={`brand-${visibleImages[slotIndex]}`}
                fill
                className="object-cover absolute inset-0 object-bottom"
                priority
            />
            {incomingSlot === slotIndex && incoming && (
                <motion.div
                    key={`incoming-${slotIndex}-${incoming}`}
                    custom={slotIndex}
                    initial="initial"
                    animate="animate"
                    variants={imageVariants as any}
                    className="absolute inset-0 z-10"
                >
                    <Image
                        src={`/brand/brand_${formatName(incoming)}.webp`}
                        alt={`brand-${incoming}`}
                        fill
                        className="object-cover object-bottom"
                    />
                </motion.div>
            )}
        </div>
    );

    return (
        <section className="bg-neutral-900 h-[calc(100vh-5.5rem)] max-w-screen overflow-hidden grid grid-cols-1 md:grid-cols-3 relative">
            <Cell slotIndex={0} />
            <div className="grid grid-rows-2 h-[calc((100vh-5.5rem)/3*2)] md:h-full">
                <Cell slotIndex={1} />
                <Cell slotIndex={2} />
            </div>
            <Cell slotIndex={3} />
            <FloatingText text="YoU gOt ThiS" />
        </section>
    );
};

export default Hero;
