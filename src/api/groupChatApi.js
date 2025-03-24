import request from "../utils/request.js";
const API_URL = 'https://server-tgjz.onrender.com/chat';

export const useGroupChat = () => {

    const getChatHistory = async (groupId) => {
        return request.get(`${API_URL}/${groupId}`)
    }
    return {
        getChatHistory,
    }

}

