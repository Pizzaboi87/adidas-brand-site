import { Constraints } from "@/types/types";
import { extractGenders } from "./extractGenders";
import { extractPrices } from "./extractPrices";
import { extractCountries } from "./extractCountries";
import { countries } from "@/data/countries";
import { extractSku } from "./extractSku";
import { extractBrandPhrase } from "./extractBrandPhrase";

export const extractConstraints = (raw: string): Constraints => {
    let txt = (raw || "").replace(/\s+/g, " ").trim();

    const out: Constraints = { queryText: txt };

    // Gender
    {
        const { genders, next } = extractGenders(txt);
        if (genders && genders.length) out.gender = genders;
        txt = next;
    }

    // Prices
    {
        const { min, max, next } = extractPrices(txt);
        if (min != null) out.priceMin = min;
        if (max != null) out.priceMax = max;
        txt = next;
    }

    // Countries (whitelisted)
    {
        const { countries: cs, next } = extractCountries(txt);
        if (cs && cs.length) out.country = cs.filter(c => countries.includes(c));
        txt = next;
    }

    // SKU
    {
        const { sku, next } = extractSku(txt);
        if (sku) out.sku = sku;
        txt = next;
    }

    // Brand phrase for title/slug narrowing
    {
        const { phrase, next } = extractBrandPhrase(txt);
        if (phrase) {
            out.title = phrase;
            out.slug = phrase;
        }
        txt = next;
    }

    // Remainder used for vector search (still in EN)
    out.queryText = txt.replace(/\s+/g, " ").trim();

    // Light reinforcement to embeddings
    if (out.gender && out.gender.length) {
        out.queryText = `${out.queryText} ${out.gender.join(" ")}`.trim();
    }

    return out;
};
