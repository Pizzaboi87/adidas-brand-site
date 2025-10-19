"use client";

import { useEffect, useMemo, useState } from "react";
import { countries } from "@/data/countries";
import type { FilterState, Gender } from "@/types/types";
import "@/styles/checkbox.css";

type Props = {
    filters: FilterState;
    onChange: (next: FilterState) => void;
    onReset: () => void;
    facets: { minPrice: number | null; maxPrice: number | null; };
};

const isEqualFilters = (a: FilterState, b: FilterState) => {
    if (a === b) return true;
    const samePrimitives =
        a.priceMin === b.priceMin &&
        a.priceMax === b.priceMax &&
        a.nameSearch === b.nameSearch &&
        a.skuSearch === b.skuSearch;
    if (!samePrimitives) return false;

    const sameGender =
        a.gender.length === b.gender.length &&
        a.gender.every((g, i) => b.gender[i] === g);

    const sameCountries =
        a.countries.length === b.countries.length &&
        a.countries.every((c, i) => b.countries[i] === c);

    return sameGender && sameCountries;
};

const FilterPanel = ({ filters, onChange, onReset, facets }: Props) => {
    const [draft, setDraft] = useState<FilterState>(filters);

    // Keep draft in sync if parent resets or external changes arrive.
    useEffect(() => {
        setDraft(filters);
    }, [filters]);

    // Boundaries from facets with safe fallbacks.
    const facetMin = Number.isFinite(facets.minPrice as number)
        ? Math.floor(facets.minPrice as number)
        : 0;
    const facetMax = Number.isFinite(facets.maxPrice as number)
        ? Math.ceil(facets.maxPrice as number)
        : 1000;

    // Current values with facet fallbacks for rendering convenience.
    const currentMin = draft.priceMin ?? facetMin;
    const currentMax = draft.priceMax ?? facetMax;
    const [priceMinInput, setPriceMinInput] = useState<string>(String(draft.priceMin ?? facetMin));
    const [priceMaxInput, setPriceMaxInput] = useState<string>(String(draft.priceMax ?? facetMax));

    // Dirty flag to enable or disable the Apply button.
    const isDirty = useMemo(() => !isEqualFilters(draft, filters), [draft, filters]);

    // --- Helpers: all handlers update only the local draft ---
    const toggleGender = (g: Gender) => {
        const set = new Set(draft.gender);
        if (set.has(g)) {
            set.delete(g);
        } else {
            set.add(g);
        }
        setDraft({ ...draft, gender: Array.from(set) as Gender[] });
    };

    const toggleCountry = (code: string) => {
        const set = new Set(draft.countries);
        if (set.has(code)) {
            set.delete(code);
        } else {
            set.add(code);
        }
        setDraft({ ...draft, countries: Array.from(set) });
    };

    const updatePriceMax = (valRaw: string | number) => {
        const num = typeof valRaw === "number" ? valRaw : valRaw === "" ? null : Number(valRaw);
        if (num === null) {
            setDraft({ ...draft, priceMax: null });
            return;
        }
        const clamped = Math.min(facetMax, Math.max(num, draft.priceMin ?? facetMin));
        setDraft({ ...draft, priceMax: clamped });
    };

    // Keeping in sync when changes come from outside
    useEffect(() => {
        setPriceMinInput(String(draft.priceMin ?? facetMin));
        setPriceMaxInput(String(draft.priceMax ?? facetMax));
    }, [draft.priceMin, draft.priceMax, facetMin, facetMax]);

    // Validation for blur (not for every keystroke)
    const handlePriceMinBlur = () => {
        const val = Number(priceMinInput);
        if (isNaN(val)) {
            setDraft({ ...draft, priceMin: null });
        } else {
            const clamped = Math.max(facetMin, Math.min(val, draft.priceMax ?? facetMax));
            setDraft({ ...draft, priceMin: clamped });
        }
        setPriceMinInput(String(draft.priceMin ?? facetMin));
    };

    const handlePriceMaxBlur = () => {
        const val = Number(priceMaxInput);
        if (isNaN(val)) {
            setDraft({ ...draft, priceMax: null });
        } else {
            const clamped = Math.min(facetMax, Math.max(val, draft.priceMin ?? facetMin));
            setDraft({ ...draft, priceMax: clamped });
        }
        setPriceMaxInput(String(draft.priceMax ?? facetMax));
    };

    // Commit changes to parent. This is the only place that triggers a fetch.
    const applyFilters = () => {
        if (!isDirty) return;
        onChange(draft);
    };

    return (
        <div className="p-6 2xl:pb-[10rem]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onReset}
                        className="text-sm cursor-pointer bg-gray-300 hover:bg-gray-300/50 transition-colors ease-in-out duration-300 px-3 py-[0.35rem] rounded-lg"
                    >
                        Reset
                    </button>
                    <button
                        onClick={applyFilters}
                        disabled={!isDirty}
                        className="text-sm cursor-pointer disabled:opacity-50 bg-black text-white hover:bg-black/80 transition-colors ease-in-out duration-300 px-3 py-[0.35rem] rounded-lg"
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* Name Search */}
            <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Search by name</h3>
                <input
                    type="text"
                    value={draft.nameSearch}
                    onChange={(e) => setDraft({ ...draft, nameSearch: e.target.value })}
                    placeholder="Enter name..."
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
            </div>

            {/* SKU Search */}
            <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Search by SKU</h3>
                <input
                    type="text"
                    value={draft.skuSearch}
                    onChange={(e) => setDraft({ ...draft, skuSearch: e.target.value })}
                    placeholder="Enter SKU..."
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
            </div>

            {/* Gender Filter */}
            <div className="mb-4">
                <h3 className="text-sm font-medium">Gender</h3>
                <div className="grid grid-cols-3 py-2 gap-x-8 gap-y-3 overflow-y-auto">
                    {(["men", "women", "kids", "unisex"] as Gender[]).map((gender) => (
                        <div key={gender} className="checkbox-tick flex gap-x-1 items-center cursor-pointer">
                            <div className="flex items-center gap-2 shrink-0 bg-white">
                                {/* Keep native checkbox for a11y; styled via .check-box */}
                                <input
                                    type="checkbox"
                                    id={`gender-${gender}`}
                                    checked={draft.gender.includes(gender)}
                                    onChange={() => toggleGender(gender)}
                                    className="shrink-0"
                                />
                                <label className="check-box shrink-0" htmlFor={`gender-${gender}`} />
                            </div>
                            <p className="font-normal text-gray-900 text-sm lowercase break-words">{gender}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price (EUR) */}
            <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Price (EUR)</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={priceMinInput}
                            placeholder={String(facetMin)}
                            min={facetMin}
                            max={currentMax}
                            onChange={(e) => setPriceMinInput(e.target.value)}
                            onBlur={handlePriceMinBlur}
                            className="w-full px-3 py-2 border border-gray-300 bg-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            value={priceMaxInput}
                            placeholder={String(facetMax)}
                            min={currentMin}
                            max={facetMax}
                            onChange={(e) => setPriceMaxInput(e.target.value)}
                            onBlur={handlePriceMaxBlur}
                            className="w-full px-3 py-2 border border-gray-300 bg-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {/* Single slider */}
                    <input
                        type="range"
                        min={facetMin}
                        max={facetMax}
                        step={1}
                        value={currentMax}
                        onChange={(e) => updatePriceMax(Number(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black bg-gray-300"
                    />
                </div>
            </div>

            {/* Country */}
            <div className="mb-6">
                <h3 className="text-sm font-medium">Country</h3>
                <div className="grid grid-cols-4 py-2 gap-x-8 gap-y-3 overflow-y-auto">
                    {countries.map((country) => (
                        <div key={country} className="checkbox-tick flex gap-x-1 items-center cursor-pointer">
                            <div className="flex items-center gap-2 shrink-0 bg-white">
                                <input
                                    type="checkbox"
                                    id={`country-${country}`}
                                    checked={draft.countries.includes(country)}
                                    onChange={() => toggleCountry(country)}
                                    className="shrink-0"
                                />
                                <label className="check-box shrink-0" htmlFor={`country-${country}`} />
                            </div>
                            <p className="font-normal text-gray-900 text-sm break-words">{country}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
