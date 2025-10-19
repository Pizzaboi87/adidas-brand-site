import Image from "next/image"
import { useMemo } from "react";

const ScatterLogo = () => {
    const generatePositions = (count: number, minDistance: number) => {
        const positions: { top: number; left: number; size: number }[] = [];

        const isTooClose = (a: { top: number; left: number }, b: { top: number; left: number }) => {
            const dx = a.left - b.left;
            const dy = a.top - b.top;
            return Math.sqrt(dx * dx + dy * dy) < minDistance;
        };

        for (let i = 0; i < count; i++) {
            let top = Math.random() * 100;
            let left = Math.random() * 100;
            let attempts = 0;

            while (positions.some((p) => isTooClose({ top, left }, p)) && attempts < 100) {
                top = Math.random() * 100;
                left = Math.random() * 100;
                attempts++;
            }

            const size = 8 + Math.random() * 10;
            positions.push({ top, left, size });
        }

        return positions;
    };

    const scatteredLogos = useMemo(() => generatePositions(10, 18), []);

    return (
        <div className="absolute inset-0 z-1 pointer-events-none">
            {scatteredLogos.map((logo, index) => (
                <div
                    key={index}
                    className="absolute"
                    style={{
                        top: `${logo.top}%`,
                        left: `${logo.left}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Image
                        src="/other/logo-transparent.png"
                        alt="Adidas logo background"
                        width={400}
                        height={400}
                        className="object-contain select-none"
                        style={{
                            width: `${logo.size}rem`,
                            height: "auto",
                            opacity: 0.03,
                            filter: "blur(0.5px)",
                        }}
                    />
                </div>
            ))}
        </div>
    )
}

export default ScatterLogo