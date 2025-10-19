import fs from "node:fs";
import path from "node:path";
import { Pool } from "pg";

const ssl =
    process.env.PGSSL === "true"
        ? {
            ca:
                process.env.PGSSL_CA ||
                (process.env.PGSSL_CA_PATH
                    ? fs.readFileSync(
                        path.resolve(process.cwd(), process.env.PGSSL_CA_PATH),
                        "utf8"
                    )
                    : undefined),
            rejectUnauthorized: Boolean(
                process.env.PGSSL_CA || process.env.PGSSL_CA_PATH
            ),
        }
        : undefined;

export const pool = new Pool({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl,
});

// Ensure search_path for every new connection so we can use unqualified table names
pool.on("connect", (client) => {
    // Keep 'public' for extensions like pgvector
    client.query("SET search_path TO shoes, public");
});

import type { QueryResultRow } from "pg";

export const query = async <T extends QueryResultRow = any>(sql: string, params: any[] = []) => {
    // Use parameterized queries to avoid SQL injection
    const res = await pool.query<T>(sql, params);
    return res;
};
