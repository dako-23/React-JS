const API_URL = 'https://server-tgjz.onrender.com/reviews';

export default {
    async getAll() {

        const res = await fetch(`${API_URL}`, { credentials: 'include' });

        const result = await res.json();

        const reviews = Object.values(result);

        return reviews
    },
    async getLatest() {

        const res = await fetch(`${API_URL}/latest`, { credentials: 'include' });

        const result = await res.json();

        const reviews = Object.values(result);

        return reviews
    },
    async getOne(reviewId) {
        const res = await fetch(`${API_URL}/${reviewId}`, { credentials: 'include' });

        const result = await res.json();

        return result
    },
    async create(reviewData) {

        const res = await fetch(`${API_URL}/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData),
                credentials: 'include'
            });

        const result = await res.json();

        return result
    },
}
