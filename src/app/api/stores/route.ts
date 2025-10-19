import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("query")

    if (!query) {
        return NextResponse.json({ error: "Missing query parameter" }, { status: 400 })
    }

    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=adidas+${encodeURIComponent(query)}&format=json`,
            { headers: { "User-Agent": "AdidasFinder/1.0" } }
        )

        if (!res.ok) throw new Error("Failed to fetch data from OpenStreetMap")

        const data = await res.json()
        if (!data || data.length === 0) {
            return NextResponse.json({ error: "No Adidas store found nearby" }, { status: 404 })
        }

        const { lat, lon, display_name } = data[0]

        // secure backend-built Google URLs
        const googleKey = process.env.GOOGLE_EMBED_KEY
        if (!googleKey) {
            console.error("GOOGLE_EMBED_KEY not set in environment variables")
            return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 })
        }

        const encodedName = encodeURIComponent(display_name)
        const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${googleKey}&q=${encodedName}`
        const streetUrl = `https://www.google.com/maps/embed/v1/streetview?key=${googleKey}&location=${lat},${lon}&heading=80&pitch=10&fov=80`
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`

        return NextResponse.json({
            name: display_name,
            lat: Number(lat),
            lon: Number(lon),
            mapUrl,
            streetUrl,
            directionsUrl,
        })
    } catch (err) {
        console.error("Geocode error:", err)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
