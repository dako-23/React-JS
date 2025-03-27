import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { FaUser } from "react-icons/fa";
import Loader from "../Loader.jsx";


export default function PostForm({
    postAction,
    showPostForm,
    setShowPostForm,
    fadeInUp,
    isPostPending
}) {

    const { imageUrl: profileImage, isAuth } = useContext(UserContext);

    return (
        <>
            {isAuth &&
                <motion.div
                    {...fadeInUp}
                    className="bg-white p-4 rounded-xl border border-gray-300 shadow mb-6 flex items-start gap-3"
                >
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="You"
                            className="w-10 h-10 rounded-full object-cover border"
                        />
                    ) : (
                        <FaUser className="text-gray-600 text-2xl" />
                    )}

                    <div className="flex-1">
                        {!showPostForm ? (
                            <button
                                onClick={() => setShowPostForm(true)}
                                className="w-full text-left text-gray-500 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50"
                            >
                                What's on your mind?
                            </button>
                        ) : (
                            <AnimatePresence>
                                <motion.form
                                    key="postForm"
                                    {...fadeInUp}
                                    action={postAction}
                                    className="space-y-3"
                                >
                                    {isPostPending
                                        ?
                                        <Loader />
                                        :
                                        <>
                                            <textarea
                                                rows="3"
                                                placeholder="Share something with your community..."
                                                className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-lime-600"
                                                name="content"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Optional image URL..."
                                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
                                                name="imageUrl"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPostForm(false)}
                                                    className="px-4 py-2 rounded-md border hover:bg-gray-100"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700"
                                                >
                                                    Post
                                                </button>
                                            </div>
                                        </>}

                                </motion.form>
                            </AnimatePresence>
                        )}
                    </div>
                </motion.div>}
        </>
    );
}