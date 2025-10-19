import { SearchResponse, SortOption } from "@/types/types";
import { buildWhere } from "./buildWhere";
import { PageInput } from "./searchShoes";
import { embedQuery } from "./embeddings";
import { query } from "./db";

// --- Similarity thresholds ---
const HARD_CUTOFF = 0.50;
const SOFT_MARGIN = 0.05;
const MIN_SIM = HARD_CUTOFF - SOFT_MARGIN;

const sortSqlAi = (sort?: SortOption) => {
    switch (sort) {
        case "price-asc": return "hybrid_score DESC, avg_price ASC NULLS LAST";
        case "price-desc": return "hybrid_score DESC, avg_price DESC NULLS LAST";
        case "rank-asc": return "hybrid_score DESC, rank ASC NULLS LAST";
        case "rank-desc": return "hybrid_score DESC, rank DESC NULLS LAST";
        case "name-asc": return "hybrid_score DESC, title ASC NULLS LAST";
        case "name-desc": return "hybrid_score DESC, title DESC NULLS LAST";
        default: return "hybrid_score DESC NULLS LAST, rank ASC NULLS LAST, avg_price ASC NULLS LAST";
    }
};

const toPgVector = (v: number[]): string => {
    if (!Array.isArray(v) || v.length === 0) return "[]";
    const body = v.map((x) => Number.isFinite(x) ? x.toFixed(6) : "0.000000").join(",");
    return `[${body}]`;
};


// --- AI mode: vector similarity + lexical full-text rank combined ---
export const runAiMode = async (input: PageInput, c: any): Promise<SearchResponse> => {
    const page = Math.max(1, input.page || 1);
    const pageSize = Math.max(1, Math.min(input.pageSize || 15, 100));
    const orderBy = sortSqlAi(input.sort);
    const { where, params: base } = buildWhere(input.filters, c);
    const p: any[] = [...base];

    // 1) Query embedding
    const vec = await embedQuery(c.queryText);
    p.push(toPgVector(vec));
    const vecSim = `(1.0 - (embedding <=> $${p.length}::vector))`;

    // 2) Lexical rank
    p.push(c.queryText);
    const tsRank = `ts_rank_cd(
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(doc,'')),
    plainto_tsquery($${p.length})
  )`;

    // 3) Hybrid score
    const hybrid = `(0.7 * ${vecSim} + 0.3 * ${tsRank})`;

    // 4) Apply similarity threshold + cap
    const whereSql = where.length
        ? `WHERE ${where.join(" AND ")} AND ${vecSim} >= ${MIN_SIM}`
        : `WHERE ${vecSim} >= ${MIN_SIM}`;
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
            doc AS description,
            ${vecSim} AS vec_score,
            ${tsRank} AS lex_score,
            ${hybrid} AS hybrid_score
        FROM embedding
            ${whereSql}
        ORDER BY ${orderBy}
        LIMIT 120
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

    const { rows } = await query(sql, p);
    const total = rows[0]?.total || 0;

    if (!total) {
        return {
            page,
            pageSize,
            total: 0,
            totalPages: 1,
            facets: { minPrice: null, maxPrice: null, countries: [] },
            items: [],
        };
    }

    return {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        facets: {
            minPrice: rows[0].minPrice ?? null,
            maxPrice: rows[0].maxPrice ?? null,
            countries: rows[0].countries?.filter(Boolean) ?? [],
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
            score: r.hybrid_score,
            vec_score: r.vec_score,
            lex_score: r.lex_score,
        })),
    };
};