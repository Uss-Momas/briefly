import axiosHandler from 'axios';

const axios = axiosHandler.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
    }
});

axios.interceptors.response.use((response) => response, (error) => {
    if (error.response && (error.response.status === 401)) {
        localStorage.removeItem("auth");
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default axios;