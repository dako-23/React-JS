import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useReviewGetAll } from "../../api/reviewApi.js";
import useFetch from "../../hooks/useFetch.js";
import Loader from "../Loader.jsx";


export default function Reviews() {
    const { getAll } = useReviewGetAll();
    const { loading, state: reviews } = useFetch(getAll);

    const ratingOptions = [1, 2, 3, 4, 5];

    return (
        <div className="bg-page-pattern min-h-screen flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white w-full max-w-4xl p-6 shadow-lg rounded-2xl border-2 border-gray-800 mt-20"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">All Reviews</h2>

                {loading ? (
                    <Loader />
                ) : reviews.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg mt-4 font-bold">
                        No reviews yet. Be the first to leave your feedback!
                    </p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <motion.div
                                key={review._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="p-4 bg-gradient-to-r from-green-200 to-lime-100 border border-gray-800 shadow-md rounded-xl"
                            >
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-semibold">{review.username}</p>
                                    <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                                <p className="text-gray-700 mt-2">{review.review}</p>
                                <div className="flex mt-2">
                                    {ratingOptions.map((star) => (
                                        <FaStar
                                            key={star}
                                            size={20}
                                            className={star <= review.rating ? "text-yellow-500" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

