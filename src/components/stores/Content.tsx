"use client"

import Image from "next/image"
import { useState } from "react"
import { useStoreSearch } from "@/hooks/useStoreSearch"
import { LoadingSpinner } from "@/components/common/Loading"

const Content = () => {
    const [query, setQuery] = useState("Budapest, Belváros")
    const [searchQuery, setSearchQuery] = useState<string | null>("Budapest, Belváros")

    const { data, isLoading, isError, error } = useStoreSearch(searchQuery ?? "", !!searchQuery)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSearchQuery(query)
    }

    return (
        <main className="min-h-[calc(100vh-5.5rem)] bg-white">
            <section className="relative overflow-hidden border-b-2 border-black bg-gradient-to-br from-[#00D4FF] to-[#0099FF] pt-10 pb-6 px-4 text-center">
                <Image
                    src="/splash/splash_2.webp"
                    alt="logo"
                    width={400}
                    height={300}
                    className="absolute -top-[10%] left-[15%] invert h-full scale-400 w-auto"
                />

                <h1 className="relative z-1 text-4xl md:text-5xl font-glitch mb-4 text-white uppercase tracking-tight leading-none drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
                    FIND YOUR STORE
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="relative z-1 mt-6 flex flex-row gap-2 justify-center max-w-2xl mx-auto flex-wrap"
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Try to search by city, ZIP code or country"
                        className="flex-1 min-w-[250px] px-4 py-3 border-2 border-black rounded-lg text-sm bg-white text-black font-medium outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/50 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"} px-6 py-3 font-bold rounded-lg transition-all bg-black text-white border-2 border-black disabled:bg-gray-400 disabled:cursor-not-allowed text-sm uppercase tracking-wide hover:bg-[#FFD700] hover:text-black hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0`}
                    >
                        {isLoading ? "Searching..." : "Search"}
                    </button>
                </form>

                <Image
                    src="/other/logo-transparent.png"
                    alt="logo"
                    width={400}
                    height={300}
                    className="absolute lg:block hidden bottom-0 right-10 invert h-1/2 w-auto"
                />

                <Image
                    src="/splash/splash_3.webp"
                    alt="logo"
                    width={400}
                    height={300}
                    className="absolute lg:block hidden top-0 left-[35%] z-0 invert h-full scale-250 w-auto"
                />

                <p
                    className={`inline-block relative font-bold font-adineu mt-2 text-md px-4 py-2 rounded-lg transition-all
                        ${isError
                            ? "visible bg-white/90 text-[#FF1744] border-2 border-black"
                            : "invisible bg-transparent text-transparent border-2 border-transparent min-h-[2.35rem]"
                        }`}
                >
                    {(error as Error)?.message || "placeholder"}
                </p>
            </section>

            {isLoading && (
                <section className="h-[50vh] w-full flex items-center justify-center">
                    <LoadingSpinner />
                </section>
            )}

            {data && (
                <section className="max-w-6xl mx-auto py-8 px-4 flex flex-col gap-6 font-adineu">
                    <div className="relative max-w-4xl mx-auto p-6 bg-white border-3 border-black rounded-xl text-center shadow-[6px_6px_0_#FFD700]">
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#FF1744] rounded-full border-2 border-black" />
                        <h2 className="text-lg mb-1 text-black tracking-wide max-w-2xl mx-auto">
                            {data.name}
                        </h2>
                        <p className="text-gray-600 text-xs font-semibold">
                            {data.lat.toFixed(6)}, {data.lon.toFixed(6)}
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-3 border-black rounded-xl overflow-hidden shadow-[5px_5px_0_#00D4FF]">
                            <iframe title="map" width="100%" height="350" src={data.mapUrl} loading="lazy" className="block border-none" />
                        </div>
                        <div className="border-3 border-black rounded-xl overflow-hidden shadow-[5px_5px_0_#FF1744]">
                            <iframe title="street-view" width="100%" height="350" src={data.streetUrl} loading="lazy" className="block border-none" />
                        </div>
                    </div>
                </section>
            )}

            {!isLoading && isError && (
                <div className="mt-12 flex flex-col items-center justify-center">
                    <Image
                        src="/other/empty.webp"
                        alt="no-result"
                        width={400}
                        height={400}

                    />
                </div>
            )}
        </main>
    )
}

export default Content
