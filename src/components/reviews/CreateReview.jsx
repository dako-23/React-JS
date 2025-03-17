import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactStars from "react-rating"


export default function CreateReview({
    onClose,
    onSubmitCreate
}) {


    const inputClass = 'w-full p-3 border rounded-lg focus:ring-2 focus:ring-lime-600'

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
                        <form className="space-y-4" onSubmit={onSubmitCreate} >
                            <input className={inputClass} type="text" name="username" placeholder="Enter your name" />
                            <textarea rows="3" className={inputClass} type="text" name="review" placeholder="Write your review here" />
                            <input className={inputClass} type="number" name="rating" placeholder="Rating (1-5)" />
                            <div className="flex justify-between">
                                <button onClick={onClose} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600">Cancel</button>
                                <button className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700">Create</button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}