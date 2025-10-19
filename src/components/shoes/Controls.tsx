import { KeyboardEvent } from "react";
import type { SortOption } from "@/types/types";

interface Props {
    aiDraft: string;
    onAiChange: (v: string) => void;
    onAiKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    commitAiQuery: () => void;
    clearAiQuery: () => void;
    sortOption: SortOption;
    setSortOption: (v: SortOption) => void;
    total: number;
    showingStart: number;
    showingEnd: number;
    setPage: (page: number) => void;
}

const Controls = ({
    aiDraft,
    onAiChange,
    onAiKeyDown,
    commitAiQuery,
    clearAiQuery,
    sortOption,
    setSortOption,
    total,
    showingStart,
    showingEnd,
    setPage,
}: Props) => (
    <div className="mb-6 flex flex-col 2xl:flex-row 2xl:items-center 2xl:justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-5 justify-between w-full 2xl:w-3/4">
            <div className="min-w-[12rem]">
                <h1 className="text-2xl 2xl:text-3xl font-bold mb-2">Shoe Collection</h1>
                <p>
                    Showing {showingStart}-{showingEnd} of {total} shoes
                </p>
            </div>

            <div className="flex flex-wrap justify-end xl:justify-start items-center gap-2">
                <input
                    value={aiDraft}
                    onChange={(e) => onAiChange(e.target.value)}
                    onKeyDown={onAiKeyDown}
                    placeholder='AI search e.g. "show me pink shoes for women"'
                    className="border border-gray-300 bg-white rounded-md py-[0.6rem] px-2 text-sm focus:outline-none focus:ring-2 focus:ring-black w-full md:w-[22rem]"
                    aria-label="AI search text"
                />
                <div className="flex gap-x-2">
                    <button
                        onClick={commitAiQuery}
                        className="px-3 py-2 cursor-pointer rounded bg-black text-white hover:bg-black/80 transition-colors ease-in-out duration-200"
                    >
                        Search
                    </button>
                    <button
                        onClick={clearAiQuery}
                        className="px-3 py-2 cursor-pointer rounded border border-gray-300 bg-white hover:bg-gray-100 transition-colors ease-in-out duration-200"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-end mt-10 sm:mt-0 gap-2">
            <label htmlFor="sort" className="font-medium text-gray-700">
                Sort by:
            </label>
            <select
                id="sort"
                value={sortOption}
                onChange={(e) => {
                    setSortOption(e.target.value as SortOption);
                    setPage(1);
                }}
                className="border cursor-pointer border-gray-300 bg-white rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
                <option value="">Default</option>
                <option value="price-asc">Price (ascending)</option>
                <option value="price-desc">Price (descending)</option>
                <option value="rank-asc">Rank (ascending)</option>
                <option value="rank-desc">Rank (descending)</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
            </select>
        </div>
    </div>
);

export default Controls;
