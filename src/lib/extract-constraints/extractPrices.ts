import { removeSpan } from "./removeSpan";

export const extractPrices = (text: string): { min?: number; max?: number; next: string } => {
    let next = text;
    const moneyNumber = String.raw`(\d+(?:[.,]\d+)?)`;
    const currency = String.raw`(?:\s?(?:€|eur|euro|euros|usd|\$))?`;

    // Range like 100-200 or 100 to 200 (no Unicode dashes)
    {
        const re = new RegExp(`\\b${moneyNumber}\\s?(?:-|to)\\s?${moneyNumber}${currency}\\b`, "i");
        const m = re.exec(next);
        if (m) {
            const a = parseFloat(m[1].replace(",", "."));
            const b = parseFloat(m[2].replace(",", "."));
            const min = Math.min(a, b);
            const max = Math.max(a, b);
            next = removeSpan(next, m.index, m.index + m[0].length);
            return { min, max, next };
        }
    }

    // "between 100 and 200"
    {
        const re = new RegExp(`\\bbetween\\s+${moneyNumber}\\s+and\\s+${moneyNumber}${currency}\\b`, "i");
        const m = re.exec(next);
        if (m) {
            const a = parseFloat(m[1].replace(",", "."));
            const b = parseFloat(m[2].replace(",", "."));
            const min = Math.min(a, b);
            const max = Math.max(a, b);
            next = removeSpan(next, m.index, m.index + m[0].length);
            return { min, max, next };
        }
    }

    // "under 120", "below €120", "max 120", "< 120"
    {
        const re = new RegExp(`\\b(?:under|below|max|at\\s+most|<=|<)\\s*${moneyNumber}${currency}\\b`, "i");
        const m = re.exec(next);
        if (m) {
            const max = parseFloat(m[1].replace(",", "."));
            next = removeSpan(next, m.index, m.index + m[0].length);
            return { max, next };
        }
    }

    // "over 100", "above 100", "min 100", "> 100"
    {
        const re = new RegExp(`\\b(?:over|above|min|at\\s+least|>=|>)\\s*${moneyNumber}${currency}\\b`, "i");
        const m = re.exec(next);
        if (m) {
            const min = parseFloat(m[1].replace(",", "."));
            next = removeSpan(next, m.index, m.index + m[0].length);
            return { min, next };
        }
    }

    // Lone price with currency -> treat as budget ceiling
    {
        const re = new RegExp(`\\b${moneyNumber}\\s*(?:€|eur|euro|euros|usd|\\$)\\b`, "i");
        const m = re.exec(next);
        if (m) {
            const val = parseFloat(m[1].replace(",", "."));
            next = removeSpan(next, m.index, m.index + m[0].length);
            return { max: val, next };
        }
    }

    return { next };
};