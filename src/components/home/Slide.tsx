import Link from "next/link";
import Marquee from "react-fast-marquee";

const Slide = () => {
    const salesTranslations = ["SALE", "AKTION", "PROMOTION", "OFFERTA", "AKCIÓ", "OFERTA", "PROMOÇÃO"];

    return (
        <section className="md:py-24 py-12 bg-center bg-cover" style={{ backgroundImage: 'url("/brand/banner.webp")' }}>
            <Marquee speed={300}>
                {salesTranslations.map((sales, index) => (
                    <p key={index} className="font-glitch text-[#FFFF33] uppercase text-[5rem] md:text-[10rem] px-10 drop-shadow-[0_0_1px_rgba(255,255,255)]">{sales}</p>
                ))}
            </Marquee>
            <div className="container mx-auto text-white">
                <p className="font-adineu text-2xl ml-5">Up to 40% Off</p>
                <p className="font-adineu text-lg md:text-xl ml-5">Step into the Year End Super Sale. Step out in style</p>
                <Link href="/promo" className="ml-5 py-3 px-5 md:px-7 bg-red-400 mt-3 block w-fit font-adineu font-semibold text-[1.3rem] md:text-[1.5rem] lowercase cursor-pointer hover:shadow-md shadow-yellow-300 ease-in-out duration-300 transition-all">
                    Learn More
                </Link>
            </div>
        </section>
    )
}

export default Slide;