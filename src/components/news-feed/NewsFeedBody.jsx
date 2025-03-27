import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import NewsFeedComments from "./NewsFeedComments.jsx";


export default function NewsFeedBody({
    filteredPosts,
    fadeInUp,
    commentAction,
    expandedComments,
    toggleComments,
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
                            onClick={() => post.comments.length > 3 ? toggleComments(post._id) : ''}
                            className="flex items-center gap-1 hover:underline"
                        >
                            {expandedComments[post._id] ? <FiChevronUp /> : <FiChevronDown />}
                            {post.comments.length} comments
                        </button>
                    </div>
                    <NewsFeedComments
                        comments={post.comments}
                        postId={post._id}
                        commentAction={commentAction}
                        expandedComments={expandedComments}
                        fadeInUp={fadeInUp}
                    />
                </motion.div>
            ))}
        </AnimatePresence>
    );
}