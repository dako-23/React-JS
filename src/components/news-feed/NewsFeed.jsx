import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useNewsFeed } from "../../hooks/useNewsFeed.js";
import PostForm from "./PostForm.jsx";
import NewsFeedBody from "./NewsFeedBody.jsx";
import Loader from "../Loader.jsx";

export default function NewsFeed() {

    const {
        filteredPosts,
        commentAction,
        postAction,
        expandedComments,
        setSearch,
        setShowPostForm,
        setSortOption,
        showPostForm,
        search,
        toggleComments,
        sortOption,
        fadeInUp,
        loading,
        isPostPending,
        handleSubmitLike,
        handleFavorite,
        filterOption,
        setFilterOption,
        isCommentPending,
        handleDelete
    } = useNewsFeed()


    return (
        <div className="max-w-3xl mx-auto py-16 px-4 bg-page-pattern min-h-screen">
            <motion.div
                {...fadeInUp}
                className="flex justify-between items-center mb-6 gap-4 flex-wrap"
            >
                <div className="flex items-center justify-between gap-4 mb-6 w-full max-w-4xl mx-auto px-4">
                    <select
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                        className="border p-2 rounded shadow-sm w-32"
                    >
                        <option value="all">All Posts</option>
                        <option value="mine">My Posts</option>
                        <option value="favorites">Favorites</option>
                    </select>
                    <div className="flex items-center gap-2 flex-1 max-w-md mx-4">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600 w-full"
                        />
                    </div>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border p-2 rounded shadow-sm w-32"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="popular">Most Liked</option>
                    </select>
                </div>
            </motion.div>
            {loading ? (<Loader />) : (<>
                <PostForm
                    postAction={postAction}
                    showPostForm={showPostForm}
                    setShowPostForm={setShowPostForm}
                    fadeInUp={fadeInUp}
                    isPostPending={isPostPending}
                />

                <div className="space-y-6">
                    <NewsFeedBody
                        filteredPosts={filteredPosts}
                        fadeInUp={fadeInUp}
                        commentAction={commentAction}
                        expandedComments={expandedComments}
                        toggleComments={toggleComments}
                        handleSubmitLike={handleSubmitLike}
                        handleFavorite={handleFavorite}
                        isCommentPending={isCommentPending}
                        handleDelete={handleDelete}
                    />
                </div>
            </>)}
        </div>
    );
}

