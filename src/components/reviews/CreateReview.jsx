import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from 'react-icons/fa'
import { useActionState } from "react";
import { useReviewsCreate } from "../../hooks/useReviews.js";


export default function CreateReview({
    onClose,
    onSubmitCreate,
    ratingOptions
}) {
    const {
        handleRatingClick,
        handleSubmitReview,
        hoverRating,
        inputClass,
        setHoverRating,
        rating,
    } = useReviewsCreate(onSubmitCreate);

    const [values, reviewAction, isPending] = useActionState(handleSubmitReview, { username: '', review: '', rating: '' })


    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                <motion.div
                    className="bg-page-pattern p-6 rounded-xl shadow-xl w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4"> Share Your Experience</h2>
                        <form className="space-y-4" action={reviewAction} >
                            <input className={inputClass} type="text" name="username" placeholder="Enter your name" defaultValue={values.username} />
                            <textarea rows="3" className={inputClass} type="text" name="review" placeholder="Write your review here" defaultValue={values.review} />
                            <div className="flex justify-center space-x-2 ">
                                {ratingOptions.map((star) => (
                                    <FaStar
                                        key={star}
                                        size={30}
                                        name="rating"
                                        className={star <= (hoverRating || rating)
                                            ?
                                            "text-yellow-500 cursor-pointer transition-colors duration-200"
                                            :
                                            "text-gray-400 cursor-pointer transition-colors duration-200"}
                                        onClick={() => handleRatingClick(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <button onClick={onClose} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600">Cancel</button>
                                <button className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700" disabled={isPending}>Create</button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}