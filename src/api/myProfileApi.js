import request from "../utils/request.js";
const API_URL = 'https://server-tgjz.onrender.com/my-profile';


export const useMyProfile = () => {


    const myGroups = async (userId) => {
        return request.get(
            `${API_URL}/${userId}/my-groups`,
        );
    };

    const myPosts = async (userId) => {
        return request.get(
            `${API_URL}/${userId}/my-posts`,
        )
    }

    return {
        addToFavorite,
        myGroups,
        myPosts
    }
}