import { useMutation } from "@tanstack/react-query";

type ShoeDetails = {
    title: string;
    avg_price: number;
    gender: string;
    country: string;
    rank: number;
    description: string;
};

type CompareResponse = {
    output: string | null;
};

export const useCompareAnalysis = () => {
    return useMutation<CompareResponse, Error, ShoeDetails[]>({
        mutationFn: async (details) => {
            const res = await fetch("/api/compare", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ details }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to fetch comparison");
            }

            return res.json();
        },
    });
};
