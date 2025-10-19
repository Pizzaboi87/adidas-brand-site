import { countries } from "@/data/countries";
import { removeSpan } from "./removeSpan";

// Optional name->code mapping limited to the above 8, for user-friendly queries
const COUNTRY_NAME_TO_CODE: Record<string, string> = {
    china: "CN",
    vietnam: "VN",
    india: "IN",
    germany: "DE",
    indonesia: "ID",
    cambodia: "KH",
    "united states": "US",
    usa: "US",
    us: "US",
    italy: "IT"
};

export const extractCountries = (text: string): { countries?: string[]; next: string } => {
    let next = text;
    const found = new Set<string>();

    // Detect codes directly
    for (const code of countries) {
        const re = new RegExp(`\\b${code}\\b`, "i");
        const m = re.exec(next);
        if (m) {
            found.add(code);
            next = removeSpan(next, m.index, m.index + m[0].length);
        }
    }

    // Detect names from the limited mapping
    for (const [name, code] of Object.entries(COUNTRY_NAME_TO_CODE)) {
        const re = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`, "i");
        const m = re.exec(next);
        if (m) {
            if (countries.includes(code)) {
                found.add(code);
            }
            next = removeSpan(next, m.index, m.index + m[0].length);
        }
    }

    return { countries: found.size ? Array.from(found) : undefined, next };
};