import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ResponseInterceptor() {
    const navigate = useNavigate();
    const interceptorId = useRef(null);
    const { logout } = useAuth();

    useEffect(() => {
        interceptorId.current = axios.interceptors.response.use(undefined, (error) => {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('auth');
                    logout();
                    navigate('/login');
                    break;
                default:
                    return Promise.reject(error);
            }
        });
    }, [navigate]);

    return null;
}