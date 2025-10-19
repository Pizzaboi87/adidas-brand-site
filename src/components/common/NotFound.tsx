import Image from "next/image";

const NotFound = ({ errorMsg }: { errorMsg: string }) => (
    <div className="w-full overflow-hidden h-[calc(100dvh-5.5rem)] bg-black relative">
        <Image
            src="/other/logo-transparent.png"
            alt="logo"
            height={800}
            width={800}
            className="max-h-1/2 xs:max-h-1/3 lg:max-h-1/2 xl:max-h-full 2xl:h-full w-auto absolute right-0 bottom-0 z-0 invert"
        />
        <div className="container mx-auto pt-[calc(100dvh/5)] text-white flex flex-col gap-y-5">
            <Image
                src="/other/logo-text.webp"
                alt="logo"
                height={100}
                width={100}
            />
            <h1 className="font-doodle text-4xl sm:text-5xl mt-5">Something went wrong</h1>
            <p className="font-adineu text-xl sm:text-3xl max-w-md">{errorMsg}</p>
        </div>
    </div>
)

export default NotFound;