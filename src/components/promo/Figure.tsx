import Image from "next/image";

interface Props {
    src: string;
    alt: string;
    extraClass?: string;
}

const Figure = ({ src, alt, extraClass }: Props) => (
    <div className={`${extraClass} relative flex items-center justify-center`}>
        {/* Circular Badge */}
        <div className="absolute inset-0 flex items-center justify-center z-1">
            <div className="bg-[#FFFFF0] rounded-full shrink-0 w-[24rem] xs:w-[32rem] h-[24rem] xs:h-[32rem] flex items-center justify-center shadow-2xl" />
        </div>

        {/* Main Image */}
        <div className="relative z-20 flex items-center justify-center">
            <Image
                src={src}
                alt={alt}
                width={500}
                height={1000}
                className="w-full 2xl:min-h-[80vh] max-w-lg h-auto object-contain"
            />
        </div>
    </div>
)

export default Figure