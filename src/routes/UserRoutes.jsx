import { Routes, Route } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import CourseSlider from "../components/CourseSlider";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Courses from "../pages/Courses";
import MyLearning from "../pages/MyLearning";
import CourseDetail from "../pages/CourseDetail";
import CoursePlayer from "../pages/CoursePlayer";
import BlogList from "../components/BlogList";
import BlogDetails from "../components/BlogDetails";
import Contact from "../components/Contact";
import Feed from "../components/Feed/Feed";
import NotFound from "../pages/NotFound";
import { useAuth } from "../context/AuthContext";
import { useCourse } from "../hooks/useCourse";

function Home() {
    const { banner, loadingBanner } = useAuth();
    const { course, loadingCourse } = useCourse(); // 👈 use context

    const featuredCourses = course || [];
    const trendingOnly = course?.filter(c => c.trending === 1);

    return (
        <>
            <Banner banner={banner} loadingBanner={loadingBanner} />

            {loadingCourse ? (
                <p style={{ textAlign: "center" }}>Loading courses...</p>
            ) : (
                <>
                    <CourseSlider
                        title="Courses"
                        courses={featuredCourses}
                    />

                    {trendingOnly && trendingOnly.length > 0 && (
                        <CourseSlider
                            title="Trending Courses"
                            courses={trendingOnly}
                        />
                    )}

                </>
            )}
        </>
    );
}
export default function UserRoutes({ hideLayout }) {
    return (
        <>
            {!hideLayout && <NavBar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/allcourses" element={<Courses />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/mylearning" element={<MyLearning />} />
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route path="/courseplayer/:id" element={<CoursePlayer />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {!hideLayout && <Footer />}
        </>
    );
}
