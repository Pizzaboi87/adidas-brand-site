import { NextResponse } from "next/server";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/ds75izhfs/image/upload";

type RouteCtx = {
    params: Promise<{ slug: string }>;
};

// Utility: check if a Cloudinary URL exists via HEAD
const urlExists = async (url: string): Promise<boolean> => {
    try {
        const res = await fetch(url, { method: "HEAD", cache: "no-store", next: { revalidate: 0 } });
        return res.ok;
    } catch {
        return false;
    }
};

export const GET = async (request: Request, ctx: RouteCtx) => {
    const { slug } = await ctx.params;

    const baseUrl = CLOUDINARY_BASE_URL;
    const maxPossibleFrames = 36;
    const found: string[] = [];

    try {
        // 1) Optional hero frame: <slug>_00.webp
        const hero = `${baseUrl}/${slug}_00.webp`;
        if (await urlExists(hero)) {
            found.push(hero);
        }

        // 2) Numbered frames: <slug>_01.jpg ... <slug>_NN.jpg
        const batchSize = 4;
        let nextIndex = 1;
        let stop = false;

        while (!stop && nextIndex <= maxPossibleFrames) {
            const batch = Array.from(
                { length: Math.min(batchSize, maxPossibleFrames - nextIndex + 1) },
                (_, k) => {
                    const idx = nextIndex + k;
                    const s = String(idx).padStart(2, "0");
                    const url = `${baseUrl}/${slug}_${s}.jpg`;
                    // Return both the index and existence for ordered processing
                    return urlExists(url).then((exists) => ({ idx, url, exists }));
                }
            );

            const results = await Promise.all(batch);
            for (const { exists, url } of results) {
                if (!exists) {
                    // First gap found, terminate scanning
                    stop = true;
                    break;
                }
                found.push(url);
            }

            nextIndex += results.length;
        }

        return NextResponse.json(found, {
            headers: {
                "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error("Error detecting frames:", error);
        return NextResponse.json({ message: "Failed to fetch images" }, { status: 500 });
    }
};
