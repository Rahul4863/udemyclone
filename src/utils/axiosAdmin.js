import axios from "axios";
const axiosAdmin = axios.create({
    baseURL: "http://localhost:3000/api"
});
axiosAdmin.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("admin_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);
export default axiosAdmin;