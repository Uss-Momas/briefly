import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange, className }) {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const getPageNumbers = () => {
        const pageNumbers = [];

        if (currentPage >= 1 && totalPages > 1)
            pageNumbers.push(1); // Always display the first page

        // If currentPage is greater than 3, we show '...'
        if (currentPage > 3) {
            pageNumbers.push('...');
        }

        // Add the previous page if applicable
        if (currentPage > 2) {
            pageNumbers.push(currentPage - 1);
        }

        // Add the current page
        if (currentPage !== 1 && currentPage !== totalPages) {
            pageNumbers.push(currentPage);
        }

        // Add the next page if applicable
        if (currentPage < totalPages - 1) {
            pageNumbers.push(currentPage + 1);
        }

        // If currentPage is less than totalPages - 2, we show '...'
        if (currentPage < totalPages - 2) {
            pageNumbers.push('...');
        }

        // Always display the last page
        if (totalPages > 0)
            pageNumbers.push(totalPages);

        return pageNumbers;
    };

    return (
        totalPages > 0 ? (
            <div className={className}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft />
                </button>

                {/* Generate page buttons */}
                {getPageNumbers().map((page, index) =>
                    page === '...' ? (
                        <span key={index} className="px-3 py-2 text-gray-500">...</span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white'
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight />
                </button>
            </div>
        ) : null
    );
}
