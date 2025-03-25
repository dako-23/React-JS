
export default function Pagination({
    currentPage,
    totalPages,
    onChange
}) {

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center mt-6 space-x-2">
            <button
                onClick={() => onChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
            >
                « Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onChange(index + 1)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === index + 1
                            ? "bg-gradient-to-r from-lime-100 to-green-200 text-gray-800 scale-110 shadow-md"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => onChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 transition"
            >
                Next »
            </button>
        </div>
    );
}