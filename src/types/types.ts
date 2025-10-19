// Sorting options supported by the UI and API
export type SortOption =
    | ""
    | "price-asc"
    | "price-desc"
    | "rank-asc"
    | "rank-desc"
    | "name-asc"
    | "name-desc";

export type Gender = "men" | "women" | "kids" | "unisex";
export type Description = string | null | TrustedHTML;

export type Shoe = {
    id: string;
    title: string;
    slug: string;
    gender: Gender;
    description?: Description;
    sku: string;
    rank: number | null;
    country: string | null;
    avg_price: number | null;
    score?: number;
};

export type Constraints = {
    id?: string;
    title?: string;
    slug?: string;
    gender?: Gender[];
    sku?: string;
    rank?: number;
    country?: string[];
    priceMin?: number | null;
    priceMax?: number | null;
    queryText: string;
}

export type ShoeFacets = {
    minPrice: number | null;
    maxPrice: number | null;
    countries: string[];
};

export type FilterState = {
    gender: Gender[];
    countries: string[];
    priceMin: number | null;
    priceMax: number | null;
    nameSearch: string;
    skuSearch: string;
};

export type SearchRequest = {
    page: number;
    pageSize: number;
    sort: SortOption;
    filters: FilterState;
    aiQuery?: string;
};

export type SearchResponse = {
    items: Shoe[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    facets: ShoeFacets;
    aiQuery?: string;
};
