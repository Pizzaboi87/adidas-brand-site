"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { about } from "@/data/about";
import { Icon } from "@iconify/react";

const scrollToId = (id: string) => {
    const SCROLL_OFFSET_PX = 0;

    // Find the target element
    const el = document.getElementById(id);
    if (!el) return;

    // Compute absolute Y position with an optional offset
    const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;

    // Smooth scroll to target
    window.scrollTo({ top: y, behavior: "smooth" });
};

const StorySelect = () => {
    // Extract the first 4 digits from "year" like "1900–1949" -> "1900"
    const years = about.map(item => {
        const match = item.year.match(/\d{4}/);
        return match ? match[0] : item.year.trim().slice(0, 4);
    });

    return (
        <nav className="group hidden-bar fixed left-0 top-10 w-14 h-24 hover:h-full rounded-full hover:rounded-md bg-white pt-12 z-50 overflow-hidden hover:overflow-y-scroll ease-in-out transition-all duration-500">
            <div className="relative h-fit w-full">
                <div className="sticky w-14 h-12 pt-2 top-0 bg-white">
                    <Image
                        src="/other/logo-transparent.png"
                        alt="logo"
                        width={50}
                        height={50}
                        className="mx-auto w-[75%]"
                    />
                </div>
                <ul className="flex flex-col items-center gap-2 pt-3 pb-6">
                    {years.map((y, idx) => (
                        <li key={`${y}-${idx}`}>
                            <Link
                                href={`#${y}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToId(y);
                                    toast(() => (
                                        <span className="flex flex-col items-center justify-center font-adineu">
                                            <p className="text-6xl">{y}</p>
                                        </span>
                                    ), {
                                        style: {
                                            padding: "8px",
                                            marginTop: "5rem"
                                        },
                                        position: "top-right"
                                    });

                                    toast(() => (
                                        <Icon
                                            icon="fluent-mdl2:scroll-up-down"
                                            className="text-4xl text-white animate-bounce-slow"
                                        />
                                    ), {
                                        style: {
                                            background: "transparent",
                                            marginTop: "5rem",
                                            boxShadow: "none"
                                        },
                                        position: "bottom-center"
                                    });
                                }}
                                className="text-[0.9rem] cursor-pointer leading-none tracking-tight hover:text-[1.2rem] hover:text-red-700 hover:font-semibold ease-in-out transition-all duration-300"
                                aria-label={`Jump to year ${y}`}
                            >
                                {y}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default StorySelect;
