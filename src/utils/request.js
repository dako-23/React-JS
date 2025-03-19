const request = async (method, url, data, options = {}) => {

    if (method !== 'GET') {
        options.method = method;
    }

    options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
    };

    const user = JSON.parse(localStorage.getItem('user')) || {}
    const accessToken = user.accessToken || null;

    if (accessToken) {
        options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (data) {
        options = {
            ...options,
            body: JSON.stringify(data),
            credentials: 'include',
        }
    }

    const response = await fetch(url, options);
    const responseContentType = response.headers.get('Content-Type');
    if (!responseContentType) {
        return;
    }

    const result = await response.json();

    return result;

};

export default {
    get: request.bind(null, 'GET'),
    post: request.bind(null, 'POST'),
    put: request.bind(null, 'PUT'),
    delete: request.bind(null, 'DELETE'),
    baseRequest: request,
}