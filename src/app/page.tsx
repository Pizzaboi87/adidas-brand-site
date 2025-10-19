import Hero from "@/components/home/Hero";
import Highlighted from "@/components/home/Highlighted";
import Model from "@/components/home/Model";
import Slide from "@/components/home/Slide";
import Video from "@/components/home/Video";
import { mergeOpenGraph } from "@/lib/mergeMetaData";

const Home = () => {
  return (
    <main className="flex flex-col gap-y-12 md:gap-y-16">
      <Hero />
      <Model />
      <Slide />
      <Video />
      <Highlighted />
    </main>
  );
};

export const metadata = {
  title: "adidas - Innovation. Comfort. Style.",
  description:
    "Explore the Adidas Brand Site — an AI-powered showcase combining technology, style, and heritage. Discover iconic shoes, interactive models, videos, and smart product recommendations powered by modern AI.",
  alternates: {
    canonical: "https://weiser-adidas.vercel.app",
  },
  openGraph: mergeOpenGraph({
    title: "adidas - Innovation. Comfort. Style.",
    description:
      "Experience Adidas like never before. Browse iconic collections, explore 3D models, and discover AI-driven comparisons and recommendations that blend design and innovation.",
    url: "https://weiser-adidas.vercel.app",
  }),
};

export default Home;
