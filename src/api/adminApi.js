import request from "../utils/request.js";

const API_URL = 'https://server-tgjz.onrender.com/admin';

export const useAdminApi = () => {

    const getStats = async () => {
        return request.get(`${API_URL}/dashboard`)
    }

    const getAllUsers = async () => {
        return request.get(`${API_URL}/all-users`);
    };

    const getAllPartners = async () => {
        return request.get(`${API_URL}/all-partners`);
    };

    const blockUser = async (userId) => {
        return request.patch(`${API_URL}/${userId}/block-user`);
    };

    const makeAdmin = async (userId) => {
        return request.patch(`${API_URL}/${userId}/make-admin`);
    }

    const deletePartner = async (partnerId) => {
        return request.patch(`${API_URL}/${partnerId}/delete-partner`);
    }

    const createPartner = async (postData) => {
        return request.post(
            `${API_URL}/partner-create`,
            postData
        );
    };
    return {
        getStats,
        getAllUsers,
        blockUser,
        makeAdmin,
        getAllPartners,
        createPartner,
        deletePartner
    }
}
