import Image from "next/image";

const EmptyComparison = () => (
    <div className="flex relative items-center justify-center xs:mt-24 min-h-[calc(100vh-10.5rem)] xs:min-h-auto">
        <Image
            src="/other/banner.webp"
            alt="shoe-banner"
            width={1600}
            height={800}
            className="w-full hidden xs:block rounded-l-full"
        />
        <div className="inset-0 absolute flex flex-col text-center xs:text-left items-center xs:items-start justify-center gap-y-3 md:gap-y-5 xs:pl-10 sm:pl-16 md:pl-32 lg:pl-40 xl:pl-52">
            <div className="text-6xl mb-4 block xs:hidden">👟</div>
            <h1 className="font-glitch xs:text-white text-[1.5rem] xs:text-[1.25rem] sm:text-3xl lg:text-4xl xl:text-5xl">
                Comparison is empty.
            </h1>
            <p className="font-adineu xs:text-white text-[1.25rem] xs:text-[1rem] sm:text-xl lg:text-2xl xl:text-3xl max-w-[15rem] lg:max-w-md">
                Please select at least two shoes for comparison.
            </p>
        </div>
    </div>
)

export default EmptyComparison;