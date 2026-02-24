import { createContext, useContext, useEffect, useState } from "react";
import axiosUser from "../utils/axiosUser";
import { baseurl } from "../App";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ======================
    // AUTH STATE
    // ======================
    const [token, setToken] = useState(null);

    // 👤 USER PROFILE
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);

    // 🖼 BANNER
    const [banner, setBanner] = useState([]);
    const [loadingBanner, setLoadingBanner] = useState(false);
    // 📚 COURSE
    const [course, setCourse] = useState([]);
    const [loadingCourse, setLoadingCourse] = useState(false);
    // ======================
    // LOAD TOKEN ON REFRESH
    // ======================
    useEffect(() => {
        const storedToken = localStorage.getItem("usertoken");
        if (storedToken) {
            setToken(storedToken);
            fetchUserProfile(storedToken); // ✅ fetch profile ONCE
        }
    }, []);

    // ======================
    // FETCH USER PROFILE
    // ======================
    const fetchUserProfile = async () => {
        try {
            setLoadingUser(true);
            const res = await axiosUser.get("/auth/profile");
            setUser(res.data.data || res.data.user);
        } catch (error) {
            console.error("Profile fetch error:", error);
            // ❌ NO AUTO LOGOUT HERE
        } finally {
            setLoadingUser(false);
        }
    };

    // ======================
    // FETCH BANNER
    // ======================
    const fetchBanner = async () => {
        try {
            setLoadingBanner(true);
            const res = await fetch(`${baseurl}/api/view/get-banner`);
            const json = await res.json();
            if (json.status) {
                setBanner(json.data);
            }
        } catch (error) {
            console.error("Banner fetch error:", error);
        } finally {
            setLoadingBanner(false);
        }
    };
    const fetchCourse = async () => {
        try {
            setLoadingCourse(true);
            const res = await fetch(`${baseurl}/api/view/get-course`);
            const json = await res.json();
            if (json.status) {
                setCourse(json.data);
            }
        } catch (error) {
            console.error("Course fetch error:", error);
        } finally {
            setLoadingCourse(false);
        }
    };
    useEffect(() => {
        fetchBanner();
    }, []);

    // ======================
    // AUTH ACTIONS
    // ======================
    const login = (token) => {
        localStorage.setItem("usertoken", token);
        setToken(token);
        fetchUserProfile(); // ✅ SAFE
    };

    const logout = () => {
        localStorage.removeItem("usertoken");
        setToken(null);
        setUser(null);
    };

    // ======================
    // CONTEXT PROVIDER
    // ======================
    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                setUser,
                loadingUser,
                banner,
                loadingBanner,
                course,
                loadingCourse,
                login,
                logout,
                fetchUserProfile,
                fetchCourse,
                fetchBanner
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
