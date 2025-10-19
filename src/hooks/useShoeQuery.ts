"use client";

import { useMemo } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import type {
    FilterState,
    SearchRequest,
    SearchResponse,
    SortOption,
} from "@/types/types";

const postShoes = async (
    payload: SearchRequest,
    signal?: AbortSignal
): Promise<SearchResponse> => {
    const res = await fetch("/api/shoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal,
    });
    if (!res.ok) {
        // Keep error text to help debug server issues
        const text = await res.text().catch(() => "");
        throw new Error(`Search failed: ${res.status} ${text}`);
    }
    return (await res.json()) as SearchResponse;
};

//Legacy helper returning a manual `search()` function.
// Kept for backward compatibility with existing call sites.
export const useShoeQuery = () => {
    return {
        search: (payload: SearchRequest) => postShoes(payload),
    };
};

// TanStack Query based hook with caching and request dedupe.
export const useShoesQuery = (
    page: number,
    pageSize: number,
    filters: FilterState,
    sort: SortOption,
    aiQuery?: string
): UseQueryResult<SearchResponse, Error> => {
    const key = useMemo(
        () => [
            "shoes",
            {
                page,
                pageSize,
                sort,
                filters,
                aiQuery: aiQuery && aiQuery.trim().length ? aiQuery.trim() : undefined,
            },
        ] as const,
        [page, pageSize, sort, filters, aiQuery]
    );

    return useQuery({
        queryKey: key,
        queryFn: ({ signal }) =>
            postShoes(
                {
                    page,
                    pageSize,
                    sort,
                    filters,
                    aiQuery: aiQuery && aiQuery.trim().length ? aiQuery.trim() : undefined,
                },
                signal
            ),
        // Keep previous data while new request is in flight for smooth pagination.
        placeholderData: (prev) => prev,
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};
