const API_URL = 'https://server-tgjz.onrender.com/groups';

export default {
    async getAll() {
        const res = await fetch(`${API_URL}`, { credentials: 'include' });

        const result = await res.json();

        const groups = Object.values(result);

        return groups
    },
    async getOne(groupId) {
        const res = await fetch(`${API_URL}/${groupId}`, { credentials: 'include' });

        const result = await res.json();

        return result
    },
    async getLatest() {

        const res = await fetch(`${API_URL}/latest`, { credentials: 'include' });

        const result = await res.json();

        const groups = Object.values(result);

        return groups
    },
    async create(groupData) {

        const res = await fetch(`${API_URL}/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(groupData),
                credentials: 'include'
            });

        const result = await res.json();

        return result
    },
    async joinGroup(groupId) {
        const res = await fetch(`${API_URL}/${groupId}/join`, {
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
        const res = await fetch(`${API_URL}/${groupId}/leave`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error('Failed to join group');
        }

        return await res.json()
    },
    async editGroup(groupId, updatedData) {
        try {

            const res = await fetch(`${API_URL}/${groupId}/edit`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(updatedData),
            })
            if (!res.ok) {
                throw new Error('Error editing group');
            }

            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Edit group error:', error);
            throw error;
        }
    },
    async deleteGroup(groupId) {

        const res = await fetch(`${API_URL}/${groupId}/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error('Failed to delete group');
        }
        return await res.json()
    }
}