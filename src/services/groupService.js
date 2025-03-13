const API_URL = 'https://server-tgjz.onrender.com';

export default {
    async getAll() {
        const response = await fetch(`${API_URL}/groups`, { credentials: 'include' });

        const result = await response.json();

        const groups = Object.values(result);

        return groups
    },
    async create(groupData) {

        const response = await fetch(`${API_URL}/groups`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(groupData),
                credentials: 'include'
            });

        const result = await response.json();

        return result
    },
    async joinGroup(groupId) {
        const res = await fetch(`${API_URL}/groups/${groupId}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error('Failed to join group');
        }
        return await res.json();
    },
    async leaveGroup(groupId) {
        const res = await fetch(`${API_URL}/groups/${groupId}/leave`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error('Failed to join group');
        }

        return await res.json()
    },
    async deleteGroup(groupId) {
        

    }
}