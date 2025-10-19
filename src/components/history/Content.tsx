import HistoryTimeline from "@/components/history/desktop/HistoryTimeline";
import HistoryTimelineSmall from "@/components/history/small-screen/HistoryTimelineSmall";

const Content = () => {
    return (
        <main>
            <HistoryTimeline />
            <HistoryTimelineSmall />
        </main>
    )
}

export default Content