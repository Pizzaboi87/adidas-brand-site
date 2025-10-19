import ShoeCard from "@/components/shoes/ShoeCard";
import type { Shoe } from "@/types/types";

const ShoeGrid = ({ items }: { items: Shoe[] }) => {
    if (!items.length)
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-6xl mb-4">👟</div>
                <h3 className="text-xl font-semibold mb-2">No shoes found</h3>
                <p>Try adjusting your filters</p>
            </div>
        );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((shoe, i) => (
                <ShoeCard key={shoe.id} shoe={shoe} index={i} />
            ))}
        </div>
    );
};

export default ShoeGrid;
