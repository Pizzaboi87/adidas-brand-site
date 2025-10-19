import { removeSpan } from "./removeSpan";

export const extractSku = (text: string): { sku?: string; next: string } => {
    let next = text;

    // Explicitly labeled SKU or code-like tokens
    {
        const re = /\b(?:sku|style\s*code|product\s*code)\s*[:#]?\s*([A-Z0-9\-_.]{4,})\b/i;
        const m = re.exec(next);
        if (m) {
            next = removeSpan(next, m.index, m.index + m[0].length);
            return { sku: m[1].toUpperCase(), next };
        }
    }

    {
        const re = /\bcode\s+is\s+([A-Z0-9\-_.]{4,})\b/i;
        const m = re.exec(next);
        if (m) {
            next = removeSpan(next, m.index, m.index + m[0].length);
            return { sku: m[1].toUpperCase(), next };
        }
    }

    return { next };
};