import { translate } from "@vitalets/google-translate-api";
import { extractConstraints } from "../extract-constraints/extractConstraints";
import { runAiMode } from "./runAiMode";
import { runStructuredMode } from "./runStructuredMode";
import type { SortOption, FilterState, SearchResponse } from "@/types/types";

export type PageInput = {
    page: number;
    pageSize: number;
    sort?: SortOption;
    filters: FilterState;
    aiQuery?: string;
};

export const searchShoes = async (input: PageInput): Promise<SearchResponse> => {
    // auto-translate before parsing constraints
    let aiQuery = input.aiQuery?.trim() || "";

    if (aiQuery) {
        try {
            const result = await translate(aiQuery, { to: "en" });
            aiQuery = result.text;
        } catch (err) {
            // Keep original text if translation fails
            console.warn("Translation failed, using original text:", err);
        }
    }

    // Parse constraints; if no ai text, rely on structured filters only
    const constraints = aiQuery
        ? extractConstraints(aiQuery)
        : { queryText: "", ...input.filters };

    const hasAiText = !!constraints?.queryText?.trim();
    if (hasAiText) return runAiMode(input, constraints);
    return runStructuredMode(input, constraints);
};
