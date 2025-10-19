"use client"

import { useQuery } from "@tanstack/react-query"

export const useStoreSearch = (query: string, enabled: boolean) => {
    return useQuery({
        queryKey: ["store-search", query],
        queryFn: async () => {
            const res = await fetch(`/api/stores?query=${encodeURIComponent(query)}`)
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Failed to fetch store data")
            return data
        },
        enabled,
        retry: false,
    })
}
