import axios from "axios";
const axiosUser = axios.create({
    baseURL: "http://localhost:3000/api"
});
axiosUser.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("usertoken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);
export default axiosUser;