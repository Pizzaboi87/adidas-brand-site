import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.random() * 20;
    const lightness = 50 + Math.random() * 10;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const getRandomInterval = () => 200 + Math.random() * 800;

const FloatingLetter = ({ char }: { char: string }) => {
    const [mounted, setMounted] = useState(false);
    const [amp, setAmp] = useState(0);
    const [dur, setDur] = useState(0);
    const [delay, setDelay] = useState(0);
    const [color, setColor] = useState("transparent");

    useEffect(() => {
        setAmp(10 + Math.random() * 10);
        setDur(2 + Math.random() * 2);
        setDelay(Math.random() * 2);
        setColor(getRandomColor());
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        let timeoutId: NodeJS.Timeout;

        const changeColor = () => {
            setColor(getRandomColor());
            timeoutId = setTimeout(changeColor, getRandomInterval());
        };

        timeoutId = setTimeout(changeColor, getRandomInterval());
        return () => clearTimeout(timeoutId);
    }, [mounted]);

    if (!mounted) return <span className="inline-block font-glitch text-yellow-300">{char}</span>;

    return (
        <motion.span
            animate={{ y: [0, -amp, amp, 0] }}
            transition={{
                duration: dur,
                ease: "easeInOut",
                repeat: Infinity,
                delay,
            }}
            style={{
                color,
                WebkitTextStroke: "1px rgba(0,0,0,0.3)"
            }}
            className="inline-block font-glitch opacity-80"
        >
            {char}
        </motion.span>
    );
};

const FloatingWord = ({ word }: { word: string }) => (
    <span className="inline-block md:mr-[1ch] whitespace-nowrap mt-8">
        {word.split("").map((char, i) => (
            <FloatingLetter key={i} char={char} />
        ))}
    </span>
);

const FloatingText = ({ text }: { text: string }) => {
    const controls = useAnimation();

    useEffect(() => {
        // Infinite, smooth hue rotation
        controls.start({
            filter: [
                "hue-rotate(0deg)",
                "hue-rotate(360deg)"
            ],
            transition: {
                duration: 15, // speed of full rotation (seconds)
                ease: "linear",
                repeat: Infinity,
            },
        });
    }, [controls]);

    return (
        <motion.div
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-[100]"
        >
            <div className="text-center xs:max-w-[90%] block mx-auto leading-[1.1] break-words whitespace-pre-wrap text-[9rem] sm:text-[11rem] md:text-[8rem] xl:text-[11rem] drop-shadow-[0_0_2px_rgba(25,25,25)]">
                {text.split(" ").map((word, i) => (
                    <FloatingWord key={i} word={word} />
                ))}
            </div>

            <motion.div animate={controls}>
                <Image
                    src="/other/logo-yellow.webp"
                    alt="logo"
                    width={400}
                    height={400}
                    className="w-[8rem] md:w-[12rem] pb-5 h-auto brightness-90 opacity-80 drop-shadow-[0_0_2px_rgba(25,25,25)]"
                />
            </motion.div>
        </motion.div>
    );
};

export default FloatingText;
