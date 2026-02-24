import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const useCourse = (autoFetch = true) => {
    const { course, loadingCourse, fetchCourse } = useAuth();

    useEffect(() => {
        if (autoFetch && course.length === 0) {
            fetchCourse();
        }
    }, []);

    return {
        course,
        loadingCourse,
        refetchCourse: fetchCourse
    };
};