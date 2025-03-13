const API_URL = 'https://server-tgjz.onrender.com/chat';

export default {
    async getChatHistory(groupId) {
        const res = await fetch(`${API_URL}/${groupId}`, {credentials: 'include'});
        if (!res.ok) throw new Error("Failed to fetch chat history");
        return await res.json();
    },

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
