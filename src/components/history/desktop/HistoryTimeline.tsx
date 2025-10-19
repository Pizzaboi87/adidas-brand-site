"use client";

import HeroIntro from "./HeroIntro";
import NextImage from "next/image";
import Era1900 from "./Era1900";
import Era1949 from "./Era1949";
import Era1950 from "./Era1950";
import Era1954 from "./Era1954";
import Era1959 from "./Era1959";
import Era1967 from "./Era1967";
import Era1968 from "./Era1968";
import Era1970 from "./Era1970";
import Era1972 from "./Era1972";
import Era1973 from "./Era1973";
import Era1978 from "./Era1978";
import Era1982 from "./Era1982";
import Era1986 from "./Era1986";
import Era1989 from "./Era1989";
import Era1991 from "./Era1991";
import Era1993 from "./Era1993";
import Era1994 from "./Era1994";
import Era1997 from "./Era1997";
import Era1999 from "./Era1999";
import Era2000 from "./Era2000";
import Era2004 from "./Era2004";
import Era2006 from "./Era2006";
import Era2011 from "./Era2011";
import Era2013 from "./Era2013";
import Era2015 from "./Era2015";
import Era2017 from "./Era2017";
import Era2019 from "./Era2019";
import Era2021 from "./Era2021";
import Era2022 from "./Era2022";
import Era2023 from "./Era2023";
import Era2024 from "./Era2024";
import EndOfStory from "./EndOfStory";
import StorySelect from "./StorySelect";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";

const HistoryTimeline = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const firstImages = [
            "/history/1900_01.webp",
            "/history/1900_02.webp",
            "/history/1900_03.webp",
            "/history/1900_04.webp",
            "/history/1949_01.webp",
            "/history/1949_02.webp",
        ];

        Promise.all(
            firstImages.map(
                (src) =>
                    new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => resolve(true);
                        img.src = src;
                    })
            )
        ).then(() => setIsLoaded(true));
    }, []);

    if (!isLoaded) return <Loading />;

    return (
        <div className="xl:block hidden overflow-x-hidden relative w-full h-full scroll-smooth">
            <div className="fixed inset-0 aboutbg z-0 flex justify-end">
                <NextImage
                    src="/other/logo-transparent.png"
                    alt="logo"
                    width={400}
                    height={400}
                    className="h-screen w-auto right-0 invert opacity-1"
                />
            </div>
            <StorySelect />
            <HeroIntro />
            <Era1900 />
            <Era1949 />
            <Era1950 />
            <Era1954 />
            <Era1959 />
            <Era1967 />
            <Era1968 />
            <Era1970 />
            <Era1972 />
            <Era1973 />
            <Era1978 />
            <Era1982 />
            <Era1986 />
            <Era1989 />
            <Era1991 />
            <Era1993 />
            <Era1994 />
            <Era1997 />
            <Era1999 />
            <Era2000 />
            <Era2004 />
            <Era2006 />
            <Era2011 />
            <Era2013 />
            <Era2015 />
            <Era2017 />
            <Era2019 />
            <Era2021 />
            <Era2022 />
            <Era2023 />
            <Era2024 />
            <EndOfStory />
        </div>
    );
};

export default HistoryTimeline;
