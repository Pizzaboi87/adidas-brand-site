import { z } from "zod";

const EmbeddingSchema = z.array(z.number());

export const generateEmbedding = async (text: string): Promise<number[]> => {
    if (!text || !text.trim()) throw new Error("Empty text input for embedding.");

    const token = process.env.HF_TOKEN;
    const baseURL = process.env.EMBED_URL;
    const model = process.env.EMBED_MODEL;

    const url = `${baseURL}/${model}/pipeline/feature-extraction`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputs: text,
            options: { wait_for_model: true },
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Embedding request failed: ${response.status} ${err}`);
    }

    const data = await response.json();

    // Normalize: [[vector]] -> [vector]
    const vector = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : data;
    const parsed = EmbeddingSchema.safeParse(vector);
    if (!parsed.success) {
        throw new Error("Invalid embedding vector format from HF router API.");
    }

    return parsed.data;
};

export const embedQuery = async (queryText: string) => {
    const t = queryText.trim();
    if (!t) throw new Error("Empty query text.");
    return generateEmbedding(t);
};
