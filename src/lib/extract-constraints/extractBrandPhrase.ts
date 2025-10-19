const KNOWN_BRANDS: string[] = [
    "adidas", "nike", "puma", "reebok", "new balance", "asics",
    "jordan", "yeezy", "converse", "vans", "salomon", "balenciaga",
    "gucci", "prada", "diadora", "hoka", "mizuno", "saucony"
];

export const extractBrandPhrase = (text: string): { phrase?: string; next: string } => {
    for (const brand of KNOWN_BRANDS) {
        const re = new RegExp(`\\b${brand.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`, "i");
        const m = re.exec(text);
        if (m) {
            // Keep the phrase in queryText for semantics, but also return it to narrow SQL (ILIKE)
            const left = Math.max(0, m.index - 40);
            const right = Math.min(text.length, m.index + m[0].length + 40);
            const phrase = text.slice(left, right).trim();
            return { phrase, next: text };
        }
    }
    return { next: text };
};