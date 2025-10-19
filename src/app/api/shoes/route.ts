import { searchShoes } from "@/lib/search-shoes/searchShoes";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { page, pageSize, sort, filters, aiQuery } = body ?? {};
        const data = await searchShoes({ page, pageSize, sort, filters, aiQuery });
        return NextResponse.json(data, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? "Internal error" }, { status: 500 });
    }
};
