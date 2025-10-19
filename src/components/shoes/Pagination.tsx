interface Props {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

const Pagination = ({ currentPage, totalPages, onPrev, onNext }: Props) => (
    <div className="flex justify-center items-center gap-4 mt-10">
        <button
            disabled={currentPage === 1}
            onClick={onPrev}
            className="px-3 py-2 rounded disabled:cursor-not-allowed cursor-pointer disabled:opacity-50 bg-gray-300 hover:bg-gray-300/50 transition-colors ease-in-out duration-300"
        >
            Previous
        </button>
        <span>
            Page {currentPage} of {totalPages}
        </span>
        <button
            disabled={currentPage === totalPages}
            onClick={onNext}
            className="px-3 py-2 rounded disabled:cursor-not-allowed cursor-pointer disabled:opacity-50 bg-gray-300 hover:bg-gray-300/50 transition-colors ease-in-out duration-300"
        >
            Next
        </button>
    </div>
);

export default Pagination;
