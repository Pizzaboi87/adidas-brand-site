"use client";

import Image from "next/image";
import Loading, { LoadingSpinner } from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";
import FilterPanel from "@/components/shoes/FilterPanel";
import { useShoesQuery } from "@/hooks/useShoeQuery";
import { useCallback, useMemo, useState, KeyboardEvent } from "react";

import type { FilterState, SortOption, Shoe } from "@/types/types";
import Controls from "@/components/shoes/Controls";
import ShoeGrid from "@/components/shoes/ShoeGrid";
import Pagination from "@/components/shoes/Pagination";

const DEFAULT_FILTERS: FilterState = {
    gender: [],
    countries: [],
    priceMin: null,
    priceMax: null,
    nameSearch: "",
    skuSearch: "",
};

const PAGE_SIZE = 15;

const Content = () => {
    // States
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
    const [sortOption, setSortOption] = useState<SortOption>("");
    const [page, setPage] = useState(1);
    const [aiDraft, setAiDraft] = useState("");
    const [aiQuery, setAiQuery] = useState<string | undefined>();

    // Data fetching
    const { data, isLoading, isFetching, error } = useShoesQuery(
        page,
        PAGE_SIZE,
        filters,
        sortOption,
        aiQuery
    );

    const facets = useMemo(
        () =>
            data?.facets ?? { minPrice: null, maxPrice: null, countries: [] as string[] },
        [data]
    );

    // Event handlers
    const commitAiQuery = useCallback(() => {
        const q = aiDraft.trim();
        if (!q) return;
        setFilters(DEFAULT_FILTERS);
        setPage(1);
        setAiQuery(q);
    }, [aiDraft]);

    const clearAiQuery = useCallback(() => {
        setAiDraft("");
        setAiQuery(undefined);
        setPage(1);
    }, []);

    const handleFilterChange = (next: FilterState) => {
        setFilters(next);
        setPage(1);
    };

    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS);
        setPage(1);
    };

    const onAiKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            commitAiQuery();
        }
    };

    // Derived values
    const total = data?.total ?? 0;
    const totalPages = data?.totalPages ?? 1;
    const showingStart = total ? (data!.page - 1) * (data!.pageSize || PAGE_SIZE) + 1 : 0;
    const showingEnd = total ? Math.min(data!.page * (data!.pageSize || PAGE_SIZE), total) : 0;

    // Local sorting for AI results
    const sortedItems: Shoe[] = useMemo(() => {
        if (!data?.items) return [];
        if (aiQuery) {
            const items = [...data.items];
            const compareMap = {
                "price-asc": (a: Shoe, b: Shoe) => (a.avg_price ?? 0) - (b.avg_price ?? 0),
                "price-desc": (a: Shoe, b: Shoe) => (b.avg_price ?? 0) - (a.avg_price ?? 0),
                "rank-asc": (a: Shoe, b: Shoe) => (a.rank ?? 0) - (b.rank ?? 0),
                "rank-desc": (a: Shoe, b: Shoe) => (b.rank ?? 0) - (a.rank ?? 0),
                "name-asc": (a: Shoe, b: Shoe) => a.title.localeCompare(b.title),
                "name-desc": (a: Shoe, b: Shoe) => b.title.localeCompare(a.title),
            };
            const compare = compareMap[sortOption as keyof typeof compareMap];
            return compare ? items.sort(compare) : items;
        }
        return data.items;
    }, [data?.items, aiQuery, sortOption]);

    if (isLoading) return <Loading />;
    if (error) return <NotFound errorMsg={error.message ?? "Unknown error"} />;

    return (
        <main className="relative flex lg:flex-row flex-col min-h-[100dvh] w-full pb-[5rem] 2xl:pb-[10rem]">
            <Image
                src="/splash/corner.webp"
                alt="splash"
                width={1600}
                height={1200}
                className="fixed 2xl:w-1/2 h-auto top-0 left-0 opacity-50 z-[-1]"
            />

            <aside className="sm:w-3/4 lg:w-80 lg:flex-shrink-0 h-fit lg:sticky top-[5.5rem]">
                <FilterPanel
                    filters={filters}
                    onChange={handleFilterChange}
                    onReset={handleResetFilters}
                    facets={facets}
                />
            </aside>

            <div className="lg:flex-1 font-adineu p-6">
                <Controls
                    aiDraft={aiDraft}
                    onAiChange={setAiDraft}
                    onAiKeyDown={onAiKeyDown}
                    commitAiQuery={commitAiQuery}
                    clearAiQuery={clearAiQuery}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    total={total}
                    showingStart={showingStart}
                    showingEnd={showingEnd}
                    setPage={setPage}
                />

                {isFetching ? (
                    <div className="h-[60dvh] flex justify-center">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <ShoeGrid items={sortedItems} />
                )}

                {totalPages > 1 && !isFetching && (
                    <Pagination
                        currentPage={data?.page ?? 1}
                        totalPages={totalPages}
                        onPrev={() => setPage((p) => Math.max(1, p - 1))}
                        onNext={() => setPage((p) => p + 1)}
                    />
                )}
            </div>
        </main>
    );
};

export default Content