import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import NewsFeedComments from "./NewsFeedComments.jsx";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";


export default function NewsFeedBody({
    filteredPosts,
    fadeInUp,
    commentAction,
    expandedComments,
    toggleComments,
    handleSubmitLike,
    handleFavorite
}) {
    const isFavorited = true
    const { _id: userId } = useContext(UserContext)

    return (
        <AnimatePresence>
            {filteredPosts.length === 0
                ?
                <div className="text-center text-gray-500 p-6 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-lg">Looks like there’s nothing here yet.</p>
                    <p className="text-sm mt-1">Be the first to post something!</p>
                </div>
                :
                filteredPosts.map((post) => (
                    <motion.div
                        key={post._id}
                        {...fadeInUp}
                        className="relative bg-white rounded-xl shadow border border-gray-300 p-4"
                    >
                        <button
                            onClick={() => handleFavorite(post._id, userId)}
                            className="hover:text-blue-500 transition absolute top-3 right-3"
                            title={post.isFavorited ? "Remove from favorites" : "Save to favorites"}
                        >
                            {post.isFavorited ? (
                                <BsBookmarkFill className="text-pink-600 text-xl" />
                            ) : (
                                <BsBookmark className="text-gray-800 text-xl" />
                            )}
                        </button>
                        <div className="flex items-center gap-3 mb-2">
                            {post.imageUrlAuthor
                                ?
                                (<img
                                    src={post.imageUrlAuthor}
                                    alt={post.username}
                                    className="w-10 h-10 rounded-full object-cover border"
                                />)
                                :
                                <FaUser className="text-gray-600 w-10 h-10 rounded-full object-cover border" />
                            }
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
                                onClick={() => handleSubmitLike(post._id, userId)}
                                className="flex items-center gap-1 px-2 py-1 rounded-md"
                            >
                                {post.likes.some(user => user._id === userId) ?
                                    <AiFillHeart className="text-red-600 text-xl" />
                                    :
                                    <AiOutlineHeart className="text-gray-600 text-xl" />
                                }
                                <div className="relative group">
                                    <span className="text-sm text-gray-600 cursor-pointer">
                                        {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                                    </span>
                                    {post.likes.length > 0 && (
                                        <div className="absolute left-0 top-6 w-48 bg-gradient-to-r from-lime-100 to-green-200 border border-gray-200 rounded-md shadow-md p-2 z-20 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200">
                                            <p className="text-xs text-gray-400 mb-1">Liked by:</p>
                                            <ul className="space-y-1 max-h-40 overflow-auto">
                                                {post.likes.map(user => (
                                                    <li key={user._id} className="flex items-center gap-2 text-sm text-gray-800">
                                                        {user.imageUrl ? (
                                                            <img
                                                                src={user.imageUrl}
                                                                alt={user.firstName}
                                                                className="w-6 h-6 rounded-full object-cover border"
                                                            />
                                                        ) : (
                                                            <FaUser className="text-gray-600 w-6 h-6 rounded-full object-cover border" />
                                                        )}
                                                        <span>{user.firstName} {user.lastName}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </button>
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
                    </motion.div >
                ))
            }

        </AnimatePresence >
    );
}