import { useActionState, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import { usePost, usePostGetAll } from "../api/postApi.js";
import { useToast } from "./useToast.js";
import { useNavigate } from "react-router-dom";

export function useNewsFeed() {
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("newest");
    const [filterOption, setFilterOption] = useState("all");
    const [expandedComments, setExpandedComments] = useState({});
    const [showPostForm, setShowPostForm] = useState(false);

    const { firstName, lastName, imageUrl: imageUrlAuthor, _id: userId, isAuth } = useContext(UserContext);
    const { create, createComment, like, addToFavorite, deletePost } = usePost()
    const { posts, loading, setPosts } = usePostGetAll()
    const { info, error } = useToast();
    const navigate = useNavigate();

    const handleSubmitPost = async (_, formData) => {

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

    const [__, postAction, isPostPending] = useActionState(handleSubmitPost, {
        content: "",
        imageUrl: "",
    });

    const handleSubmitComment = async (_, formData) => {
        if (!firstName || !lastName) {

            info('Complete your profile first!');

            return navigate('/my-profile/edit');
        }
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

    const [_, commentAction, isCommentPending] = useActionState(handleSubmitComment, {
        text: "",
    });

    const handleSubmitLike = async (postId, userId) => {

        if (!isAuth) return info('You need to be logged in.');

        if (!firstName || !lastName) {
            info('Complete your profile first!');
            return navigate('/my-profile/edit');
        }

        try {
            const likeInfo = await like(postId, userId)

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...likeInfo, isFavorited: post.isFavorited }
                        : post
                )
            );
        } catch (err) {
            error(err.message);
        }
    }

    const handleFavorite = async (postId, userId) => {
        if (!isAuth) {
            return info('You need to be logged in.');
        };

        try {
            await addToFavorite(postId, userId)

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, isFavorited: !post.isFavorited }
                        : post
                )
            );

        } catch (err) {
            error(err.message);
        };

    }

    const transition = { duration: 0.3, ease: "easeInOut" };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition,
    };

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

    const handleDelete = async (postId) => {

        const hasConfirm = confirm(
            `Are you sure you want to delete ?`
        );

        if (!hasConfirm) return;

        try {
            await deletePost(postId);

            setPosts((prevPosts) =>
                prevPosts.filter(post => post._id !== postId)
            );

        } catch (err) {
            console.log(err.message);

        }
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
        setFilterOption,
        isCommentPending,
        handleDelete
    }

}