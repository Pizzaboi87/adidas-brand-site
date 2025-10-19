"use client";

import { useCompare } from "@/context/CompareContext";
import { Shoe } from "@/types/types";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

type Props = { shoe: Shoe };

const CompareButton = ({ shoe }: Props) => {
    const { addToCompare, removeFromCompare, compareElements } = useCompare();

    // Track hover only for desktop
    const [isHovered, setIsHovered] = useState(false);

    // Track viewport to decide if hover logic should apply
    const [isDesktop, setIsDesktop] = useState(false);

    // Tailwind's lg breakpoint is 1024px. Mirror it here for runtime checks.
    useEffect(() => {
        const onResize = () => setIsDesktop(window.innerWidth >= 1024);
        onResize(); // initial
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // True if the current shoe is already in the comparison list
    const isInCompare = compareElements.some((el: Shoe) => el.slug === shoe.slug);

    // Click toggles between add and remove
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (isInCompare) removeFromCompare(shoe.slug);
        else addToCompare(shoe);
    };

    // Enable hover state changes only on desktop
    const handleMouseEnter = () => {
        if (isDesktop) setIsHovered(true);
    };
    const handleMouseLeave = () => {
        if (isDesktop) setIsHovered(false);
    };

    const showHover = isDesktop && isHovered;

    const showBalanceIcon = isDesktop && !showHover;
    const showPlusIcon = !isDesktop ? !isInCompare : showHover && !isInCompare;
    const showMinusIcon = !isDesktop ? isInCompare : showHover && isInCompare;

    const bgClass = !isDesktop
        ? isInCompare
            ? "bg-red-200"
            : "bg-green-200"
        : !showHover
            ? "bg-amber-100"
            : isInCompare
                ? "bg-red-200"
                : "bg-green-200";

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={`${bgClass} border w-12 lg:w-10 h-12 lg:h-10 rounded-full flex shrink-0 items-center justify-center cursor-pointer relative z-[10] overflow-hidden`}
        >
            {/* balance icon - visible on desktop when not hovered */}
            <Icon
                icon="fluent-mdl2:compare-uneven"
                className={`absolute w-8 lg:h-6 h-8 lg:w-6 transition-all duration-300 ${showBalanceIcon ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
            />

            {/* plus icon - mobile: if not in compare; desktop: when hovered and not in compare */}
            <Icon
                icon="line-md:plus-circle"
                className={`absolute w-8 h-8 transition-all duration-300 ${showPlusIcon ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
            />

            {/* minus icon - mobile: if in compare; desktop: when hovered and in compare */}
            <Icon
                icon="line-md:minus-circle"
                className={`absolute w-8 h-8 transition-all duration-300 ${showMinusIcon ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
            />
        </div>
    );
};

export default CompareButton;
