export const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
        <video
            className="w-48 h-auto"
            src="/video/loading.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
        />
        <div className="flex items-center gap-1">
            <h1 className="font-adineu tracking-wider text-2xl text-blue-900 font-semibold">loading</h1>
            <span className="dot translate-y-2 w-2 h-2 bg-blue-900 rounded-full animate-bounce [animation-delay:0s]" />
            <span className="dot translate-y-2 w-2 h-2 bg-blue-900 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="dot translate-y-2 w-2 h-2 bg-blue-900 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
    </div>
)

const Loading = () => (
    <div className="w-full overflow-hidden h-screen pb-24 flex flex-col items-center justify-center">
        <LoadingSpinner />
    </div>
)

export default Loading;