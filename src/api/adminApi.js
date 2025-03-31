import request from "../utils/request.js";

const API_URL = 'https://server-tgjz.onrender.com/admin';

export const useAdminApi = () => {

    const getStats = async () => {
        return request.get(`${API_URL}/dashboard`)
    }

    const getAllUsers = async () => {
        return request.get(`${API_URL}/all`);
    };

    const blockUser = async (userId) => {
        return request.patch(`${API_URL}/${userId}/block-user`);
    };

    const makeAdmin = async (userId) => {
        return request.patch(`${API_URL}/${userId}/make-admin`);
    }
    return {
        getStats,
        getAllUsers,
        blockUser,
        makeAdmin
    }
}
