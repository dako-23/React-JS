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
        handleSubmitLike
    } = useNewsFeed()


    return (
        <div className="max-w-3xl mx-auto py-16 px-4 bg-page-pattern min-h-screen">
            <motion.div
                {...fadeInUp}
                className="flex justify-between items-center mb-6 gap-4 flex-wrap"
            >
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <FaSearch className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600 w-full sm:w-64"
                    />
                </div>

                <select
                    className="border p-2 rounded-md focus:outline-none"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="popular">Most Liked</option>
                </select>
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
                    />
                </div>
            </>)}
        </div>
    );
}

