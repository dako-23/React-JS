import request from "../utils/request.js";

const API_URL = 'https://server-tgjz.onrender.com/users';

export const useLogin = () => {

    const login = async (email, password) => {
        const data = request.post(
            `${API_URL}/login`,
            { email, password },
        )
        return data;
    }

    return { login };
};

export const useRegister = () => {
    const register = async (userData) => {
        const data = request.post(
            `${API_URL}/register`,
            userData
        )
        return data;
    }

    return { register };
}

export const useCreateProfileInfo = () => {
    const createProfileInfo = async (userId, updateData) => {
        const data = request.put(
            `${API_URL}/${userId}`,
            updateData
        )
        return data;
    }
    return { createProfileInfo }
}

export const useGetUser = () => {

    const getUser = async (userId) => {

        return request.get(`${API_URL}/${userId}`);
    }

    return {
        getUser,
    }

};