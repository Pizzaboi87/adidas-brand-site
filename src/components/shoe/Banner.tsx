import Image from "next/image";

interface Props {
    heroImage: string;
    title: string;
}

const Banner = ({ heroImage, title }: Props) => (
    <div className="bannerbg h-[55vh] md:h-[50vh pb-4 w-full flex md:flex-row flex-col justify-end items-center relative">
        {/* LOGO BLOCK  */}
        <div className="overflow-hidden absolute bottom-0 right-0 h-full z-0 justify-self-end pointer-events-none w-[clamp(360px,45vw,1100px)]">
            <Image
                src="/other/logo-transparent.png"
                alt="logo"
                width={600}
                height={600}
                className="opacity-10 h-full w-auto object-contain translate-x-10 object-right-bottom"
            />
        </div>

        {/* Title and image */}
        <h1 className="font-glitch text-4xl sm:text-5xl lg:text-7xl text-white md:max-w-1/2 md:pr-24 relative z-1  md:pb-0 pl-3 md:pl-0 line-clamp-3 md:line-clamp-none">
            {title.replaceAll("adidas ", "")}
        </h1>
        {heroImage && (
            <Image
                src={heroImage}
                alt={title}
                width={600}
                height={600}
                className="absolute bottom-0 md:left-1/4 md:-translate-x-1/2 -translate-y-42 sm:-translate-y-28 md:translate-y-0 object-contain z-10 md:rotate-30 lg:scale-125"
            />
        )}
    </div>
)

export default Banner;
