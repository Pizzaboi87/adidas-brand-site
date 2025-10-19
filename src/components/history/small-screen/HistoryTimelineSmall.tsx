import TimelineItem from "./TimelineItem";
import { about } from "@/data/about";

const HistoryTimelineSmall = () => (
    <div className="xl:hidden block px-4 sm:px-6 lg:px-8 pt-[5.5rem] font-adineu text-white aboutbg pb-24">
        <div className="container mx-auto relative">
            {about.map((item, index) => (
                <TimelineItem key={item.year} item={item} index={index} />
            ))}
        </div>
    </div>
)

export default HistoryTimelineSmall