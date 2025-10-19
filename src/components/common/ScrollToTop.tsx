"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
    behavior?: ScrollBehavior;
};

const ScrollToTop = ({ behavior = "auto" }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Extract searchParams string once, so it's a stable dependency
    const searchParamsString = searchParams?.toString();

    useEffect(() => {
        const { scrollRestoration } = history as History & { scrollRestoration?: string };
        const prev = scrollRestoration;
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }
        return () => {
            if ("scrollRestoration" in history && prev) {
                history.scrollRestoration = prev as any;
            }
        };
    }, []);

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            const hash = window.location.hash;
            if (hash && hash.length > 1) {
                const targetId = decodeURIComponent(hash.slice(1));
                const el = document.getElementById(targetId);
                if (el) {
                    el.scrollIntoView({ behavior, block: "start" });
                    return;
                }
            }
            window.scrollTo({ top: 0, left: 0, behavior });
        });

        return () => cancelAnimationFrame(id);
    }, [pathname, searchParamsString, behavior]);

    return null;
};

export default ScrollToTop;
