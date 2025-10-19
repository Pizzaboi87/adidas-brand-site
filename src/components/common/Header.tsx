"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { links } from "@/data/links";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/context/CompareContext";
import { usePathname } from "next/navigation";
import { useDisableScroll } from "@/hooks/useDisableScroll";

const CustomLink = ({ link }: { link: { title: string; href: string } }) => (
    <Link
        href={link.href}
        className="hover:scale-125 hover:text-red-600 ease-in-out duration-300 transition-all"
    >
        {link.title}
    </Link>
);

const CustomLinkCompare = ({ link, count }: { link: { title: string; href: string }, count: number }) => (
    <Link
        href={link.href}
        className="animate__animated animate__fadeInRight hover:scale-125 hover:text-red-600 ease-in-out duration-300 transition-all flex gap-x-2"
    >
        {link.title}
        <p className="font-adineu animate__animated animate__swing rounded-full w-8 h-8 flex items-center justify-center bg-amber-200 border">
            {count}
        </p>
    </Link>
);

const Header = () => {
    const pathname = usePathname();
    const isHistory = pathname.includes("history");

    const { compareElements } = useCompare();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useDisableScroll(isOpen);

    const toggleView = () => {
        setIsOpen((prev) => !prev);
    };

    // Close menu on Escape key press
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <>
            <nav className={`${isHistory ? "fixed bg-white" : "sticky glass-card"} py-6 top-0 z-[1000] w-full h-[5.5rem]`}>
                <div className="px-8 md:px-14 lg:px-24 w-full">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/">
                            <Image
                                src="/other/logo-transparent.png"
                                alt="logo"
                                width={100}
                                height={100}
                                className="h-10 w-auto cursor-pointer hover:scale-125 ease-in-out duration-300 transition-all"
                            />
                        </Link>

                        {/* Desktop links */}
                        <div className="font-adineu text-2xl items-center hidden md:flex space-x-12">
                            {links.map((link) => (
                                link.title === "compare"
                                    ? compareElements.length ? <CustomLinkCompare key={link.title} link={link} count={compareElements.length} /> : null
                                    : <CustomLink key={link.title} link={link} />
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Icon
                                icon={
                                    isOpen
                                        ? "line-md:close"
                                        : "streamline-ultimate:navigation-menu-bold"
                                }
                                width="32"
                                height="32"
                                color="black"
                                className="cursor-pointer"
                                onClick={toggleView}
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Animated mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Background overlay */}
                        <motion.div
                            key="overlay"
                            className="fixed inset-0 bg-black/40 z-[900]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Side panel menu */}
                        <motion.div
                            key="menu"
                            className="fixed top-0 right-0 h-full w-[70%] glass-card z-[1000] flex flex-col items-center justify-center space-y-10 text-2xl font-adineu"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="absolute top-10 right-5"
                            >
                                <Icon
                                    icon="line-md:close-small"
                                    width="60"
                                    height="60"
                                    color="black"
                                    className="cursor-pointer"
                                    onClick={toggleView}
                                />
                            </motion.div>
                            {links.map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    className="hover:scale-125 text-[2rem] hover:text-red-600 ease-in-out duration-300 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.title}
                                </Link>
                            ))}

                            <Link href="/">
                                <Image
                                    src="/other/logo-transparent.png"
                                    alt="logo"
                                    width={100}
                                    height={100}
                                    className="h-16 mt-24 w-auto cursor-pointer hover:scale-125 ease-in-out duration-300 transition-all"
                                />
                            </Link>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
