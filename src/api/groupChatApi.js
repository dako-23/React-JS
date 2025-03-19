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



export default {

    async sendMessage(groupId, senderId, message) {
        const username = localStorage.getItem('username');

        const res = await fetch(`${API_URL}/${groupId}/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senderId, message, username }),
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to send message");
        return await res.json();
    }
};
