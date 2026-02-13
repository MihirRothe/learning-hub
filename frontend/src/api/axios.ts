import axios from 'axios';

// Create an Axios instance with a base URL
// VITE_API_URL should be set in .env for production (e.g., https://your-backend.onrender.com/api)
// If not set, it defaults to '/api' which works with the local proxy
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
