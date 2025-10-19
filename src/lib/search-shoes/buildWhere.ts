import { FilterState } from "@/types/types";

// Keep it conservative: only conditions we are certain about should go here.
export const buildWhere = (filters: FilterState, c: any) => {
    const where: string[] = [];
    const params: any[] = [];

    // Helper to add a condition with positional params ($1, $2, ...)
    const add = (condTemplate: string, val: any) => {
        const index = params.push(val); // returns new length
        where.push(condTemplate.replace("$?", `$${index}`));
    };

    // Title (ILIKE) - for brand phrases or explicit title searches
    if (c?.title) add("title ILIKE $?", `%${c.title}%`);

    // Slug - keep exact match as in the original codebase
    if (c?.slug) add("slug = $?", c.slug);

    // SKU (exact or prefix match)
    const sku =
        c?.sku ??
        (filters as any)?.sku ??
        (filters as any)?.skuSearch ??
        null;

    if (sku) {
        const i1 = params.push(sku);
        const i2 = params.push(`${sku}%`);
        where.push(`(sku = $${i1} OR sku ILIKE $${i2})`);
    }

    if (sku) add("sku ILIKE $?", `%${sku}%`);

    // Rank (exact or upper-bound - original used exact; keep exact to avoid behavior change)
    if (c?.rank != null) add("rank = $?", c.rank);

    // Gender - hard filter
    const genders: string[] | undefined = (c?.gender && c.gender.length ? c.gender : (filters as any)?.gender);
    if (genders?.length) {
        params.push(genders);
        where.push(`gender = ANY($${params.length})`);
    }

    // Country - hard filter (expects extractor to whitelist to allowed codes)
    const countries: string[] | undefined =
        (c?.country && c.country.length
            ? c.country
            : (filters as any)?.country || (filters as any)?.countries);
    if (countries?.length) {
        params.push(countries);
        where.push(`country = ANY($${params.length})`);
    }

    // Price range
    const priceMin = c?.priceMin ?? (filters as any)?.priceMin ?? null;
    const priceMax = c?.priceMax ?? (filters as any)?.priceMax ?? null;
    if (priceMin != null) add("avg_price >= $?", priceMin);
    if (priceMax != null) add("avg_price <= $?", priceMax);

    // UI plain-name search (kept from original)
    if ((filters as any)?.nameSearch) add("title ILIKE $?", `%${(filters as any).nameSearch}%`);

    return { where, params };
};