import { Shoe } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useShoeBySlugQuery = (slug: string) =>
    useQuery<Shoe>({
        queryKey: ["shoe", slug],
        queryFn: async () => {
            const res = await fetch(`/api/shoes/${slug}`);
            if (!res.ok) throw new Error("Failed to fetch shoe");
            return res.json();
        },
        enabled: !!slug
    });
