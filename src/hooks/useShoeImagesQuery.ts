"use client";

import { useQuery } from "@tanstack/react-query";

export const useShoeImagesQuery = (slug: string) => {
    return useQuery<string[]>({
        queryKey: ["shoe-images", slug],
        queryFn: async () => {
            const res = await fetch(`/api/shoes/${slug}/images`);
            if (!res.ok) throw new Error("Failed to fetch images");
            return res.json();
        },
        enabled: !!slug,
        staleTime: 1000 * 60 * 10,
    });
};
