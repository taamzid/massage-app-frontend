import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const Pagination = ({currentPage, setCurrentPage, totalPages}) => {

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return(
        <div className="flex items-center justify-center mt-6 gap-2">
                <button
                    className={`text-sm px-3 py-1 rounded-full ${
                        currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#1BC738]"
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FaChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`border rounded text-sm px-3 py-1 rounded ${
                            currentPage === index + 1
                                ? "bg-[#1BC738] text-white"
                                : " bg-white"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`text-sm px-3 py-1 rounded-full ${
                        currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#1BC738]"
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <FaChevronRight />
                </button>
            </div>
    )
}

export default Pagination;