import Image from "next/image";

const NotFound = () => (
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
            <h1 className="font-doodle text-5xl xs:text-7xl sm:text-8xl mt-5">Error 404</h1>
            <p className="font-adineu text-xl sm:text-3xl max-w-md">This page could not be found.</p>
        </div>
    </div>
)

export default NotFound;