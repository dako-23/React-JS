import { useEffect, useState } from "react";
import request from "../utils/request.js";

const API_URL = 'https://server-tgjz.onrender.com/news-feed';

export const usePost = () => {

    const create = async (postData) => {
        return request.post(
            `${API_URL}/create`,
            postData
        );
    };

    const createComment = async (commentData, postId) => {
        return request.post(
            `${API_URL}/${postId}/comment`,
            commentData
        );
    };

    const like = async (postId, userId) => {
        return request.post(
            `${API_URL}/${postId}/like`,
            {userId}
        )
    }

    return {
        create,
        createComment,
        like
    }
}


export const usePostGetAll = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAll = async () => {
        try {
            setLoading(true);
            const result = await request.get(`${API_URL}`);
            setPosts(result);


            return result;
        } catch (error) {
            console.error("Error fetching groups:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    return {
        posts,
        setPosts,
        getAll,
        loading
    };
};