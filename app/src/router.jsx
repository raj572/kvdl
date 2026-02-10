import { useEffect, useState } from "react";
import { createBrowserRouter, Navigate, Outlet, useNavigate } from "react-router-dom";
import { clearAdminToken, isAuthenticated } from "./admin/adminAuth";
import AdminLogin from "./admin/AdminLogin";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProjectItem from "./components/project-page/ProjectItem";
import AdminLayout from "./layouts/AdminLayout";
import AboutPage from "./pages/AboutPage";
import AdminBlogPreview from "./pages/admin/AdminBlogPreview";
import AdminCareers from "./pages/admin/AdminCareers";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminCreateBlog from "./pages/admin/AdminCreateBlog";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminManageBlogs from "./pages/admin/AdminManageBlogs";
import BlogInternalPage from "./pages/BlogInternalPage";
import BlogPage from "./pages/BlogPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import ForgotPassword from "./pages/ForgotPassword";
import Gallery from "./pages/GalleryPage";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import Projects from "./pages/ProjectsPage";
import ResetPassword from "./pages/ResetPassword";
import { adminMe } from "./services/api";
import PageTransition from "./transitions/PageTransition";

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

import Chatbot from "./components/common/Chatbot";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Chatbot />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <PageTransition />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/projects", element: <Projects /> },
          { path: "/gallery", element: <Gallery /> },
          { path: "/contact", element: <ContactPage /> },
          { path: "/projects/:id", element: <ProjectItem /> },
          { path: "/about", element: <AboutPage /> },
          { path: "/blog", element: <BlogPage /> },
          { path: "/blog/:id", element: <BlogInternalPage /> },
          { path: "/careers", element: <CareersPage /> },
          { path: "/faqs", element: <FaqPage /> },
          { path: "/*", element: <NotFound /> }
        ]
      },
      {
        path: "/admin",
        children: [
          { path: "login", element: <AdminLogin /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "reset-password/:token", element: <ResetPassword /> },
          {
            element: <AdminGate><AdminLayout /></AdminGate>,
            children: [
              { index: true, element: <Navigate to="dashboard" replace /> },
              { path: "dashboard", element: <AdminDashboard /> },
              { path: "blogs/create", element: <AdminCreateBlog /> },
              { path: "blogs/preview", element: <AdminBlogPreview /> },
              { path: "blogs/edit/:id", element: <AdminCreateBlog /> },
              { path: "blogs/manage", element: <AdminManageBlogs /> },
              { path: "contacts", element: <AdminContacts /> },
              { path: "careers", element: <AdminCareers /> }
            ]
          }
        ]
      }
    ],
  },
]);

export default router;
