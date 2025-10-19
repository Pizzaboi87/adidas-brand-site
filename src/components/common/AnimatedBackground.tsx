"use client";

import "@/styles/circles.css";

interface Props {
    children: React.ReactNode;
    from: string;
    to: string;
}

const AnimatedBackground = ({ children, from, to }: Props) => {
    return (
        <div
            className="relative z-0 w-full overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(to bottom left, ${from}, ${to})`,
            }}
        >
            <ul className="circles">
                {Array.from({ length: 10 }).map((_, i) => (
                    <li key={i}></li>
                ))}
            </ul>
            {children}
        </div>
    );
};

export default AnimatedBackground;
