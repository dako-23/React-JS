const API_URL = 'https://server-tgjz.onrender.com/users';

export default {
    async register(userData) {
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed.');
            }

            localStorage.setItem('accessToken', data.accessToken);

            return data;
        } catch (err) {
            throw err;
        }
    },
    async login(email, password) {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password}),
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed.');
            }

            localStorage.setItem('accessToken', data.accessToken);

            return data;
        } catch (err) {
            throw err;
        }
    }
} 
