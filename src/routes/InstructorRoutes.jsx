import { Routes, Route } from "react-router-dom";
import InstructorLayout from "../pages/instructor/InstructorLayout";
import Dashboard from "../pages/instructor/Dashboard";
import CreateCourse from "../pages/instructor/CreateCourse";
import AllCourses from "../pages/instructor/AllCourses";
import Students from "../pages/instructor/Students";
import BlogList from "../components/BlogList";
import BlogCreate from "../pages/instructor/BlogCreate";
import InstructorCreate from "../pages/instructor/InstructorCreate";
import AllBlogs from "../pages/instructor/AllBlogs";
import NotFound from "../pages/NotFound";
import Section from "../pages/instructor/Section";
export default function InstructorRoutes() {
    return (
        <Routes>
            <Route element={<InstructorLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="create" element={<CreateCourse />} />
                <Route path="courses" element={<AllCourses />} />
                <Route path="students" element={<Students />} />
                <Route path="course/:id/section" element={<Section />} />
                <Route path="blog" element={<BlogList />} />
                <Route path="blog-create" element={<BlogCreate />} />
                <Route path="allblogs" element={<AllBlogs />} />
                <Route path="instructor-create" element={<InstructorCreate />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
