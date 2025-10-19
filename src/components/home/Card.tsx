import Image from "next/image"
import Link from "next/link"
import { Shoe } from "@/types/types";

interface Props {
    index: number;
    card: Shoe;
}

const Card = ({ index, card }: Props) => {
    const baseUrl = "https://res.cloudinary.com/ds75izhfs/image/upload";

    // Border animation base classes
    const borderClasses =
        "absolute transition-all duration-500 ease-in-out h-0 w-0 border-l-red-500 border-t-red-500 border-b-green-500 border-r-green-500";

    const borderPositions = [
        "left-0 top-0 border-t-4 group-hover:w-full", // top border
        "right-0 top-0 border-r-4 group-hover:h-full", // right border
        "bottom-0 right-0 border-b-4 group-hover:w-full", // bottom border
        "bottom-0 left-0 border-l-4 group-hover:h-full", // left border
    ];

    return (
        <Link
            key={index}
            href={`/shoes/${card.slug}`}
            className={`${index === 4 ? "xl:hidden" : "block 2xl:block"} ${index === 5 ? "xl:hidden" : "block"} relative bg-white border-transparent shadow-md shadow-gray-700 bg-bottom-right bg-cover bg-no-repeat group text-3xl font-bold xl:aspect-[2/3] cursor-pointer overflow-hidden pb-10 xl:pb-0`}

        >
            <div className="w-full h-full absolute inset-0 overflow-hidden">
                <Image
                    src={`/splash/splash_${index}.webp`}
                    alt={`splash-${index}`}
                    width={400}
                    height={600}
                    className="translate-x-1/3 scale-180 opacity-35 z-0"
                />

                <Image
                    src={`/splash/splash_${5 - index}.webp`}
                    alt={`splash-mirror-${index}`}
                    width={400}
                    height={600}
                    className="-translate-x-1/2 -translate-y-1/2 scale-125 opacity-35 z-[-1]"
                />
            </div>

            {borderPositions.map((position, i) => (
                <span key={i} className={`${borderClasses} ${position}`} />
            ))}

            {/* Main image */}
            <Image
                src={`${baseUrl}/${card.slug}_00.webp`}
                alt={card.slug}
                width={400}
                height={400}
                className="w-full h-auto scale-90 xl:scale-125 group-hover:scale-90 -translate-x-3 xl:translate-x-4 group-hover:-translate-x-3 -translate-y-0 xl:translate-y-60 group-hover:-translate-y-0 rotate-0 xl:rotate-45 group-hover:rotate-0 origin-right transition-all duration-500 ease-in-out relative z-10"
            />

            {/* Title */}
            <p className="xl:absolute xl:top-[12rem] translate-y-0 xl:translate-y-[20rem] group-hover:-translate-y-0 z-10 font-adineu font-semibold text-[1.7rem] md:text-[1.5rem] transition-all ease-in-out duration-700 px-5">
                {card.title}
            </p>
            <p className="xl:absolute xl:bottom-20 px-5 font-adineu text-[1.2rem] translate-x-0 xl:translate-x-[20rem] group-hover:translate-x-0 transition-all ease-in-out duration-300">
                Gender: {card.gender}
            </p>
            <p className="xl:absolute xl:bottom-15 px-5 font-adineu text-[1.2rem] translate-x-0 xl:translate-x-[20rem] group-hover:translate-x-0 transition-all ease-in-out duration-300 delay-200">
                Code: {card.sku}
            </p>
            <p className="xl:absolute xl:bottom-10 px-5 font-adineu text-[1.2rem] translate-x-0 xl:translate-x-[20rem] group-hover:translate-x-0 transition-all ease-in-out duration-300 delay-400">
                avg. price: €{Number(card.avg_price).toFixed(2)}
            </p>
        </Link>
    )
}

export default Card;