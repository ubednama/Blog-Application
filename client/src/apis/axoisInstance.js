import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const axiosInstance = axios.create({
    baseURL: "/api/v1"
    // baseURL: 'http://localhost:5000/api/v1'
});

export const useAxiosInterceptors = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.request.use(
            config => {
                const token = localStorage.getItem("jwt");
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        axiosInstance.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );

    }, [navigate]);
};

export { axiosInstance };