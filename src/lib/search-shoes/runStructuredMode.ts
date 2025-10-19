import { SearchResponse, SortOption } from "@/types/types";
import { buildWhere } from "./buildWhere";
import { PageInput } from "./searchShoes";
import { query } from "./db";

const sortSqlStructured = (sort?: SortOption) => {
    switch (sort) {
        case "price-asc": return "avg_price ASC, rank ASC NULLS LAST, title ASC";
        case "price-desc": return "avg_price DESC, rank ASC NULLS LAST, title ASC";
        case "rank-asc": return "rank ASC NULLS LAST, avg_price ASC, title ASC";
        case "rank-desc": return "rank DESC NULLS LAST, avg_price ASC, title ASC";
        case "name-asc": return "title ASC, rank ASC NULLS LAST, avg_price ASC";
        case "name-desc": return "title DESC, rank ASC NULLS LAST, avg_price ASC";
        default: return "rank ASC NULLS LAST, avg_price ASC, title ASC";
    }
};

// --- Structured mode: only exact filters, no AI ---
export const runStructuredMode = async (input: PageInput, c: any): Promise<SearchResponse> => {
    const page = Math.max(1, input.page || 1);
    const pageSize = Math.max(1, Math.min(input.pageSize || 15, 100));
    const orderBy = sortSqlStructured(input.sort);
    const { where, params } = buildWhere(input.filters, c);
    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const offset = (page - 1) * pageSize;

    const sql = `
    WITH filtered AS (
        SELECT
            shoe_id,
            slug,
            title,
            sku,
            gender,
            country,
            avg_price::float AS avg_price,
            rank,
            doc AS description
        FROM embedding
            ${whereSql}
    ),
    counted AS (
        SELECT 
        COUNT(*)::int AS total,
        MIN(avg_price)::float AS min_price,
        MAX(avg_price)::float AS max_price,
        ARRAY_AGG(DISTINCT country) FILTER (WHERE country IS NOT NULL) AS countries
        FROM filtered
    )
    SELECT
        f.*, c.total,
        c.min_price AS "minPrice",
        c.max_price AS "maxPrice",
        c.countries
    FROM filtered f
    CROSS JOIN counted c
    ORDER BY ${orderBy}
    LIMIT ${pageSize} OFFSET ${offset};
  `;

    const { rows } = await query(sql, params);
    const total = rows[0]?.total || 0;

    return {
        page,
        pageSize,
        total,
        totalPages: total ? Math.ceil(total / pageSize) : 1,
        facets: {
            minPrice: rows[0]?.minPrice ?? null,
            maxPrice: rows[0]?.maxPrice ?? null,
            countries: rows[0]?.countries?.filter(Boolean) ?? [],
        },
        items: rows.map((r: any) => ({
            id: r.shoe_id,
            slug: r.slug,
            title: r.title,
            sku: r.sku,
            gender: r.gender,
            country: r.country,
            avg_price: r.avg_price,
            rank: r.rank,
            description: r.description,
        })),
    };
};