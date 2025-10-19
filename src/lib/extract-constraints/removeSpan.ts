export const removeSpan = (txt: string, start: number, end: number): string =>
    (txt.slice(0, start) + " " + txt.slice(end)).replace(/\s+/g, " ").trim();
