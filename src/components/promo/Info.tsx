import Image from "next/image";
import Link from "next/link";

const Info = ({
    titleTop,
    titleBottom,
    text,
    icons,
    button,
}: {
    titleTop: string;
    titleBottom: string;
    text: string;
    icons: { src: string; link: string; name: string }[];
    button?: {
        text: string;
        link: string;
        note?: string;
    };
}) => (
    <div className="relative z-10 justify-self-start max-w-xl">
        <h1 className="text-4xl lg:text-5xl 2xl:text-6xl mb-6">
            <span className="text-pink-600 font-adineu">{titleTop}</span>
            <br />
            <span className="text-white font-glitch">{titleBottom}</span>
        </h1>

        <p className="text-black text-xl font-adineu mb-8 max-w-lg leading-relaxed">{text}</p>

        {/* Partner / Payment icons */}
        <div className="flex items-center gap-5 xl:gap-10 mt-12">
            {icons.map((icon, index) => (
                <Link
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={icon.link}
                    className="hover:scale-110 transition-all ease-in-out duration-300"
                >
                    <Image
                        src={icon.src}
                        alt={icon.name}
                        width={300}
                        height={300}
                        className={`w-full h-auto ${button ? "max-h-18" : "max-h-10"}`}
                    />
                </Link>
            ))}
        </div>

        {/* Button (optional) */}
        {button && (
            <div className="flex flex-col">
                <Link
                    href={button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600 text-white font-adineu xl:w-md cursor-pointer text-center inline-block mt-12 px-10 py-4 rounded-full text-xl font-bold hover:bg-pink-700 transition-all transform hover:scale-105 shadow-lg"
                >
                    {button.text}
                </Link>
                {button.note && (
                    <p className="font-adineu italic text-sm max-w-sm inline-block mt-2 ml-[5%]">{button.note}</p>
                )}
            </div>
        )}
    </div>
);

export default Info