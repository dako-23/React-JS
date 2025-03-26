import { motion, AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";


export default function NewsFeedBody({
    filteredPosts,
    fadeInUp,
    commentAction,
    expandedComments,
    toggleComments
}) {


    return (
        <AnimatePresence>
            {filteredPosts.map((post) => (
                <motion.div
                    key={post._id}
                    {...fadeInUp}
                    className="bg-white rounded-xl shadow border border-gray-300 p-4"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <img
                            src={post.imageUrlAuthor}
                            alt={post.username}
                            className="w-10 h-10 rounded-full object-cover border"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">
                                {post.firstName} {post.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(post.createdAt).toLocaleString("bg-BG")}
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-700 mb-2">{post.content}</p>

                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt="Post"
                            className="w-full h-64 object-cover rounded-lg mb-2 border"
                        />
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                        <button
                            onClick={() => toggleComments(post._id)}
                            className="flex items-center gap-1 hover:underline"
                        >
                            {expandedComments[post._id] ? <FiChevronUp />  : <FiChevronDown />}
                            {post.comments.length} comments
                        </button>
                    </div>
                    {post.comments.slice(0, 3).map((comment) => (
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
                    
                    <AnimatePresence>
                        {expandedComments[post._id] && (
                            <motion.div
                                key={`comments-${post._id}`}
                                {...fadeInUp}
                                className="mt-4 space-y-3"
                            >
                                {post.comments.slice(3).map((comment) => (
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
                        <form action={commentAction} className="flex gap-2 mt-3">
                            <input
                                type="text"
                                name="text"
                                placeholder="Write a comment..."
                                className="flex-1 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
                            />
                            <input type="hidden" name="postId" value={post._id} />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700"
                            >
                                Post
                            </button>
                        </form>
                    </AnimatePresence>
                </motion.div>
            ))}
        </AnimatePresence>
    );
}