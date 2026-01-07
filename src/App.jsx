// import { useLocation } from "react-router-dom";
// import UserRoutes from "./routes/UserRoutes";
// import InstructorRoutes from "./routes/InstructorRoutes";
// import AdminRoutes from "./routes/AdminRoutes";
// export const baseurl = "http://localhost:3000/api";
// import "./App.css";
// function App() {
//   const location = useLocation();
//   const hideLayout =
//     location.pathname.startsWith("/instructor") ||
//     location.pathname.startsWith("/courseplayer") ||
//     location.pathname.startsWith("/admin") ||
//     location.pathname.startsWith("/feed");
//   return (
//     <>
//       <UserRoutes hideLayout={hideLayout} />
//       <InstructorRoutes />
//       <AdminRoutes />
//     </>
//   );
// }

// export default App;
import { useLocation, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import NotFound from "./pages/NotFound";

export const baseurl = "http://localhost:3000/api";
import "./App.css";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/instructor") ||
    location.pathname.startsWith("/courseplayer") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/feed");

  return (
    <Routes>
      <Route path="/*" element={<UserRoutes hideLayout={hideLayout} />} />
      <Route path="/instructor/*" element={<InstructorRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* global fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
