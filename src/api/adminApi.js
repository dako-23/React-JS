import request from "../utils/request.js";


const API_URL = 'https://server-tgjz.onrender.com/admin';

export const useAdminApi = () => {

    const getStats = async () => {
        return request.get(`${API_URL}/dashboard`)
    }
    return {
        getStats
    }
}
