import { useActionState, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import { usePost, usePostGetAll } from "../api/postApi.js";
import { useToast } from "./useToast.js";

export function useNewsFeed() {
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("newest");
    const [filterOption, setFilterOption] = useState("all");
    const [expandedComments, setExpandedComments] = useState({});
    const [showPostForm, setShowPostForm] = useState(false);

    const { firstName, lastName, imageUrl: imageUrlAuthor, _id: userId } = useContext(UserContext);
    const { create, createComment, like, addToFavorite } = usePost()
    const { posts, loading, setPosts, getAll } = usePostGetAll()
    const { error, info, success, warn } = useToast();

    const filteredPosts = posts
        .filter((p) =>
            p.content.toLowerCase().includes(search.toLowerCase())
        )
        .filter((p) => {
            if (filterOption === "mine") return p._ownerId === userId;
            if (filterOption === "favorites") return p.isFavorited === true;
            return true;
        })
        .sort((a, b) => {
            if (sortOption === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortOption === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortOption === "popular") return (b.likes.length || 0) - (a.likes.length || 0);
        });

    const toggleComments = (postId) => {
        setExpandedComments((prev) => ({
            [postId]: !prev[postId]
        }));
    };

    const handleSubmitPost = async (prevState, formData) => {

        const values = Object.fromEntries(formData);
        const postData = {
            ...values,
            firstName,
            lastName,
            imageUrlAuthor
        }

        try {
            const newPost = await create(postData);

            setPosts((state) => [newPost, ...state]);

            setShowPostForm(false);
        } catch (err) {
            console.log(err);
        }
    };

    const [postValues, postAction, isPostPending] = useActionState(handleSubmitPost, {
        content: "",
        imageUrl: "",
    });

    const handleSubmitComment = async (prevState, formData) => {

        const values = Object.fromEntries(formData);
        const commentData = {
            ...values,
            firstName,
            lastName,
            imageUrlComment: imageUrlAuthor
        }
        const postId = commentData.postId


        try {
            const newComment = await createComment(commentData, postId);

            setPosts((prevPosts) =>
                prevPosts.map(post =>
                    post._id === postId
                        ? { ...post, comments: [newComment, ...post.comments] }
                        : post
                )
            );

        } catch (err) {
            error(err.message);
        }
    };

    const handleSubmitLike = async (postId, userId) => {
        try {
            const likeInfo = await like(postId, userId)

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? likeInfo : post
                )
            );
        } catch (err) {
            console.log(err.message);
            info('You need to be logged in.');
        }
    }

    const handleFavorite = async (postId, userId) => {
        try {
            if (!userId) {
                return info('You need to be logged in.');
            };

            await addToFavorite(postId, userId)

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, isFavorited: !post.isFavorited }
                        : post
                )
            );

        } catch (err) {
            console.log(err.message);
        };

    }

    const [Commentvalues, commentAction, isCommentPending] = useActionState(handleSubmitComment, {
        text: "",
    });

    const transition = { duration: 0.3, ease: "easeInOut" };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition,
    };

    return {
        filteredPosts,
        postAction,
        commentAction,
        setSearch,
        setSortOption,
        expandedComments,
        showPostForm,
        setShowPostForm,
        toggleComments,
        search,
        sortOption,
        transition,
        fadeInUp,
        loading,
        isPostPending,
        handleSubmitLike,
        handleFavorite,
        filterOption,
        setFilterOption
    }

}