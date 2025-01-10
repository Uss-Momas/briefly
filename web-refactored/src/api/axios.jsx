import axiosHandler from 'axios';

const axios = axiosHandler.create({
    baseURL: 'http://localhost:3333/api/v1',
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