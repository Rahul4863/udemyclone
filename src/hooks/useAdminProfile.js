import { useEffect, useState } from "react";
import axiosAdmin from "../utils/axiosAdmin";

const useAdminProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        try {
            const res = await axiosAdmin.get("/admin/get-profile");

            if (res.data.status) {
                setProfile(res.data.data);
            } else {
                setError("Failed to load profile");
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Unauthorized"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return {
        profile,
        loading,
        error,
        refetchProfile: fetchProfile
    };
};

export default useAdminProfile;
