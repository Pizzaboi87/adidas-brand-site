import { Constraints } from "@/types/types";
import { removeSpan } from "./removeSpan";

// English-only gender synonyms, because we translate to EN upstream
const GENDER_SYNONYMS: Record<"men" | "women" | "kids" | "unisex", string[]> = {
    men: ["men", "man", "male", "men's", "mens", "for men", "him", "guys"],
    women: ["women", "woman", "female", "women's", "womens", "ladies", "for women", "her", "girls'"],
    kids: ["kids", "kid", "children", "child", "boys", "girls", "youth", "junior", "toddler", "baby"],
    unisex: ["unisex", "all genders", "for everyone"]
};

export const extractGenders = (text: string): { genders: Constraints["gender"]; next: string } => {
    const found = new Set<"men" | "women" | "kids" | "unisex">();
    let next = text;

    const candidates = [
        ...GENDER_SYNONYMS.men.map(s => ({ tag: "men" as const, s })),
        ...GENDER_SYNONYMS.women.map(s => ({ tag: "women" as const, s })),
        ...GENDER_SYNONYMS.kids.map(s => ({ tag: "kids" as const, s })),
        ...GENDER_SYNONYMS.unisex.map(s => ({ tag: "unisex" as const, s }))
    ];

    for (const { tag, s } of candidates) {
        const re = new RegExp(`\\b${s.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`, "i");
        const m = re.exec(next);
        if (m) {
            found.add(tag);
            next = removeSpan(next, m.index, m.index + m[0].length);
        }
    }
    return { genders: found.size ? Array.from(found) : undefined, next };
};