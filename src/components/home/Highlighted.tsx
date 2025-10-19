import Card from "./Card";
import { highlighted } from "@/data/highlight";

const Highlighted = () => (
    <section className="container mx-auto">
        <h1 className="pl-2 xl:pl-0 font-doodle text-5xl lg:text-6xl mb-5 text-blue-800">new arrivals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-24">
            {highlighted.map((card, index) => (
                <Card key={card.slug} {...{ card, index }} />
            ))}
        </div>
    </section>
);

export default Highlighted;
