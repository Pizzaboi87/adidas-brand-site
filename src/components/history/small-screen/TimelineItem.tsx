import YearMarker from "./YearMarker"
import SectionTitle from "./SectionTitle"
import SectionText from "./SectionText"
import ImageGrid from "./ImageGrid"
import Video from "./Video"
import type { AboutItem } from "@/data/about"

interface TimelineItemProps {
    item: AboutItem
    index: number
}

const TimelineItem = ({ item, index }: TimelineItemProps) => {
    return (
        <article className="mb-16 md:mb-24">
            <YearMarker year={item.year} index={index} />

            <div className="space-y-12">
                {/* Primary section */}
                <section>
                    <SectionTitle title={item.title} index={0} />
                    <SectionText paragraphs={item.text} index={0} />
                </section>

                {/* Secondary section */}
                {item.secondTitle && item.secondText && (
                    <section>
                        <SectionTitle title={item.secondTitle} index={1} />
                        <SectionText paragraphs={item.secondText} index={1} />
                    </section>
                )}

                {/* Tertiary section */}
                {item.thirdTitle && item.thirdText && (
                    <section>
                        <SectionTitle title={item.thirdTitle} index={2} />
                        <SectionText paragraphs={item.thirdText} index={2} />
                    </section>
                )}

                {/* Images */}
                {item.images.length > 0 && <ImageGrid images={item.images} />}

                {/* Videos */}
                {item.videos && item.videos.length > 0 && <Video videos={item.videos} index={index} />}
            </div>
        </article>
    )
}

export default TimelineItem