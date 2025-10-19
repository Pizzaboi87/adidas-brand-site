"use client";

import { useEffect, useState } from "react";
import { LoadingSpinner } from "./Loading";

const AppLoader = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            const start = Date.now();
            const waitFor = Math.max(0, 1000 - (Date.now() - start));
            setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => setLoading(false), 500);
            }, waitFor);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    return (
        <>
            {loading && (
                <div className={`fixed inset-0 z-[9999] bg-white flex flex-col gap-y-5 items-center justify-center transition-opacity duration-500 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    <LoadingSpinner />
                </div>
            )}
            {children}
        </>
    );
};

export default AppLoader;
