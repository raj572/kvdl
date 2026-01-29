import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTransition from "./transitions/PageTransition";
import Home from "./pages/HomePage";
import Projects from "./pages/ProjectsPage";
import Gallery from "./pages/GalleryPage";
import ProjectItem from "./components/project-page/ProjectItem";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFoundPage";
import ContactPage from "./pages/ContactPage";
import PanaromaPage from "./pages/PanaromaPage";
import BlogPage from "./pages/BlogPage";
import AdminPage from "./admin/AdminPage";
import AdminLogin from "./admin/AdminLogin";
import { adminMe } from "./services/api";
import { clearAdminToken, isAuthenticated } from "./admin/adminAuth";

const AdminGate = ({ children }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (!isAuthenticated()) {
        navigate("/admin/login", { replace: true });
        setChecking(false);
        return;
      }

      try {
        const response = await adminMe();
        if (!response?.success) {
          clearAdminToken();
          navigate("/admin/login", { replace: true });
        }
      } catch (error) {
        clearAdminToken();
        navigate("/admin/login", { replace: true });
      } finally {
        setChecking(false);
      }
    };

    verifySession();
  }, [navigate]);

  if (checking || !isAuthenticated()) {
    return null;
  }

  return children;
};

const router = createBrowserRouter([
  {
    element: <PageTransition />,   
    children: [
      { path: "/", element: <Home /> },
      { path: "/projects", element: <Projects /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/projects/:id", element:<ProjectItem/>},
      { path:"/panaroma", element:<PanaromaPage/>},
      { path: "/about" , element: <AboutPage/>},
      { path: "/blog" , element: <BlogPage/>},
      { path: "/admin/login" , element: <AdminLogin/>},
      { path: "/admin" , element: <AdminGate><AdminPage/></AdminGate>},
      { path: "/*", element: <NotFound /> }
    ],
  },
]);

export default router;
