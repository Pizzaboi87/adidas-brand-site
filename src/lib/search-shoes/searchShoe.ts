import { query } from "./db";
import { Shoe } from "@/types/types";

export const searchShoe = async (slug: string): Promise<Shoe | null> => {
    // SQL query to fetch a single shoe by slug
    const sql = `
        SELECT
            shoe_id AS id,
            slug,
            title,
            sku,
            gender,
            country,
            avg_price::float AS avg_price,
            rank,
            doc AS description
        FROM embedding
        WHERE slug = $1
        LIMIT 1;
    `;

    const { rows } = await query(sql, [slug]);
    return rows[0] ?? null;
};
