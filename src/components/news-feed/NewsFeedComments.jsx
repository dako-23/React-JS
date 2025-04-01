import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { UserContext } from "../../contexts/UserContext.jsx";
import Loader from "../Loader.jsx";

export default function NewsFeedComments({
    comments,
    postId,
    commentAction,
    expandedComments,
    fadeInUp,
    isCommentPending
}) {

    const { isAuth } = useContext(UserContext);
    return (
        <>
            <div className="space-y-3">
                {isCommentPending 
                    ?
                    <Loader />
                    :
                    <>
                        {comments.slice(0, 3).map((comment) => (
                            <div key={comment._id} className="flex items-start gap-3 mt-3">
                                {comment.imageUrlComment ? (
                                    <img
                                        src={comment.imageUrlComment}
                                        alt={comment.firstName}
                                        className="w-8 h-8 rounded-full object-cover border"
                                    />
                                ) : (
                                    <FaUser className="text-gray-600 w-8 h-8 rounded-full object-cover border" />
                                )}

                                <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm shadow">
                                    <p className="font-medium">
                                        {comment.firstName} {comment.lastName}
                                    </p>
                                    <p>{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </>}
            </div>
            <AnimatePresence>
                {expandedComments[postId] && (
                    <motion.div
                        key={`comments-${postId}`}
                        {...fadeInUp}
                        className="mt-4 space-y-3"
                    >
                        {comments.slice(3).map((comment) => (
                            <div key={comment._id} className="flex items-start gap-3">
                                {comment.imageUrlComment ? (
                                    <img
                                        src={comment.imageUrlComment}
                                        alt={comment.firstName}
                                        className="w-8 h-8 rounded-full object-cover border"
                                    />
                                ) : (
                                    <FaUser className="text-gray-600 w-8 h-8 rounded-full object-cover border" />
                                )}

                                <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm shadow">
                                    <p className="font-medium">
                                        {comment.firstName} {comment.lastName}
                                    </p>
                                    <p>{comment.text}</p>
                                </div>
                            </div>
                        ))}

                    </motion.div>
                )}
                {isAuth &&
                    <form action={commentAction} className="flex gap-2 mt-3">
                        <input
                            type="text"
                            name="text"
                            placeholder="Write a comment..."
                            className="flex-1 border bg-page-pattern p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
                        />
                        <input type="hidden" name="postId" value={postId} />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700"
                        >
                            Post
                        </button>
                    </form>}
            </AnimatePresence>
        </>
    );
}