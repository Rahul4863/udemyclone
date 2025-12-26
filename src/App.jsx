import { Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar";
import Banner from "./components/Banner";
import CourseSlider from "./components/CourseSlider";
import Footer from "./components/Footer";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import InstructorLayout from "./pages/instructor/InstructorLayout";
import Dashboard from "./pages/instructor/Dashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import AllCourses from "./pages/instructor/AllCourses";
import Students from "./pages/instructor/Students";
import Courses from "./pages/Courses";
import MyLearning from "./pages/MyLearning";
import InstructorCreate from "./pages/instructor/InstructorCreate";
import { useLocation } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogCreate from "./pages/instructor/BlogCreate";
import CoursePlayer from "./pages/CoursePlayer";
import Contact from "./components/Contact";
import AllBlogs from "./pages/instructor/AllBlogs";
import BlogDetails from "./components/BlogDetails";


import "./App.css";

const courses = [
  {
    title: "100 Days of Python Bootcamp",
    trainer: "Dr. Angela Yu",
    rating: 4.7,
    reviews: "404,449",
    price: 549,
    actual: 3109,
    img: "https://picsum.photos/500/300?1",
    trending: 1
  },
  {
    title: "Full Stack Web Development",
    trainer: "Angela Yu",
    rating: 4.7,
    reviews: "459,864",
    price: 549,
    actual: 3109,
    img: "https://picsum.photos/500/300?2",
    trending: 1
  },
  {
    title: "AI Engineer Agentic Track",
    trainer: "Ed Donner",
    rating: 4.7,
    reviews: "24,321",
    price: 549,
    actual: 799,
    img: "https://picsum.photos/500/300?3",
    trending: 1
  },
  {
    title: "Ultimate AWS Solutions Architect",
    trainer: "Stephane Maarek",
    rating: 4.7,
    reviews: "276,491",
    price: 399,
    actual: 3379,
    img: "https://picsum.photos/500/300?4",
    trending: 1
  },
  {
    title: "Complete Web Development Bootcamp",
    trainer: "Dr. Angela Yu",
    rating: 4.7,
    reviews: "459,864",
    price: 549,
    actual: 3109,
    img: "https://picsum.photos/500/300?5",
    trending: 1
  },
  {
    title: "React – The Complete Guide",
    trainer: "Maximilian Schwarzmüller",
    rating: 4.8,
    reviews: "720,154",
    price: 599,
    actual: 3499,
    img: "https://picsum.photos/500/300?6",
  },
  {
    title: "NodeJS – The Complete Guide",
    trainer: "Maximilian Schwarzmüller",
    rating: 4.7,
    reviews: "201,423",
    price: 499,
    actual: 3299,
    img: "https://picsum.photos/500/300?7",
  },
  {
    title: "Machine Learning Bootcamp",
    trainer: "Jose Portilla",
    rating: 4.7,
    reviews: "510,678",
    price: 649,
    actual: 3999,
    img: "https://picsum.photos/500/300?8",
  },
  {
    title: "Android App Development",
    trainer: "Mitch Tabian",
    rating: 4.6,
    reviews: "142,210",
    price: 549,
    actual: 2999,
    img: "https://picsum.photos/500/300?9",
  },
  {
    title: "Ethical Hacking Masterclass",
    trainer: "Zaid Sabih",
    rating: 4.7,
    reviews: "350,987",
    price: 699,
    actual: 3499,
    img: "https://picsum.photos/500/300?10",
  },
  {
    title: "Ethical Hacking Masterclass",
    trainer: "Zaid Sabih",
    rating: 4.7,
    reviews: "350,987",
    price: 699,
    actual: 3499,
    img: "https://picsum.photos/500/300?10",
  },
  {
    title: "Ethical Hacking Masterclass",
    trainer: "Zaid Sabih",
    rating: 4.7,
    reviews: "350,987",
    price: 699,
    actual: 3499,
    img: "https://picsum.photos/500/300?10",
  },
  {
    title: "Ethical Hacking Masterclass",
    trainer: "Zaid Sabih",
    rating: 4.7,
    reviews: "350,987",
    price: 699,
    actual: 3499,
    img: "https://picsum.photos/500/300?10",
  },
];

function Home() {
  const featuredCourses = courses;
  const trendingOnly = courses.filter(c => c.trending === 1);
  return (
    <>
      <Banner />
      <CourseSlider title="Featured Courses" courses={featuredCourses} />
      <CourseSlider title="Trending Courses" courses={trendingOnly} />
    </>
  );
}

function App() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/instructor") ||
    location.pathname.startsWith("/courseplayer");
  return (
    <>
      {!hideLayout && <NavBar />}
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/allcourses" element={<Courses />} />
        <Route path="/mylearning" element={<MyLearning />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/courseplayer/:id" element={<CoursePlayer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* INSTRUCTOR PANEL */}
        <Route path="/instructor" element={<InstructorLayout />} >
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateCourse />} />
          <Route path="courses" element={<AllCourses />} />
          <Route path="students" element={<Students />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog-create" element={<BlogCreate />} />
          <Route path="allblogs" element={<AllBlogs />} />
          <Route path="instructor-create" element={<InstructorCreate />} />
        </Route>
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
