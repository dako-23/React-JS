import request from "../utils/request.js";

const API_URL = 'https://server-tgjz.onrender.com/users';

export const useLogin = () => {

    const login = async (email, password) => {
        const data = request.post(
            `${API_URL}/login`,
            { email, password },
        )
        return data
    }

    return { login }
};