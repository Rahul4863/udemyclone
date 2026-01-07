import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import TotalInstructor from "../pages/admin/TotalInstructor";
import Category from "../pages/admin/Category";
import SubCat from "../pages/admin/SubCat";
import AdminProfile from "../pages/admin/AdminProfile";
import AdminBlogs from "../pages/admin/AdminBlogs";
import BlogCreateAdmin from "../pages/admin/BlogCreateAdmin";
import BannerUpdate from "../pages/admin/BannerUpdate";
import ChangePassword from "../pages/admin/ChangePassword";
import AdminProtectedRoute from "./AdminProtectedRoute";
import NotFound from "../pages/NotFound";

export default function AdminRoutes() {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path="login" element={<AdminLogin />} />

            {/* PROTECTED */}
            <Route
                path="/"
                element={
                    <AdminProtectedRoute>
                        <AdminLayout />
                    </AdminProtectedRoute>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="total-instructor" element={<TotalInstructor />} />
                <Route path="category" element={<Category />} />
                <Route path="subcategory" element={<SubCat />} />
                <Route path="admin-blogs" element={<AdminBlogs />} />
                <Route path="admin-blog-create" element={<BlogCreateAdmin />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="banner-update" element={<BannerUpdate />} />
                <Route path="change-password" element={<ChangePassword />} />
            </Route>

            {/* ADMIN 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
