import { NextResponse } from "next/server";
import { searchShoe } from "@/lib/search-shoes/searchShoe";

export const dynamic = "force-dynamic";

export const GET = async (
    _request: Request,
    context: { params: Promise<{ slug: string }> }
) => {
    try {
        const { slug } = await context.params;
        const shoe = await searchShoe(slug);

        if (!shoe) {
            return NextResponse.json({ message: "Shoe not found." }, { status: 404 });
        }

        return NextResponse.json(shoe, { status: 200 });
    } catch (error) {
        console.error("Error loading shoe:", error);
        return NextResponse.json(
            { message: "Error loading shoe." },
            { status: 500 }
        );
    }
};
