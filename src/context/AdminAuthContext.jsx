import { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔐 LOGIN → store only token
    const loginAdmin = (authToken) => {
        setToken(authToken);
        localStorage.setItem("admin_token", authToken);
    };

    // 🚪 LOGOUT
    const logoutAdmin = () => {
        setToken(null);
        localStorage.removeItem("admin_token");
    };

    // 🔄 Restore token on refresh
    useEffect(() => {
        const storedToken = localStorage.getItem("admin_token");
        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    return (
        <AdminAuthContext.Provider
            value={{ token, loginAdmin, logoutAdmin, loading }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
