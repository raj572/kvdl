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
import AdminPodcasts from "./pages/admin/AdminPodcasts";
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
import { adminMe, superAdminMe } from "./services/api";
import PageTransition from "./transitions/PageTransition";
import PageReveal from "./transitions/PageReveal";

// Super-Admin Imports
import { isSuperAuthenticated, clearSuperToken } from "./super-admin/superAuth";
import SuperAdminLogin from "./pages/super-admin/SuperAdminLogin";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import SuperAdminProjectForm from "./pages/super-admin/SuperAdminProjectForm";

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

const SuperAdminGate = ({ children }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (!isSuperAuthenticated()) {
        navigate("/super-admin/login", { replace: true });
        setChecking(false);
        return;
      }

      try {
        const response = await superAdminMe();
        if (!response?.success || !response?.data?.is_super_admin) {
          clearSuperToken();
          navigate("/super-admin/login", { replace: true });
        }
      } catch (error) {
        clearSuperToken();
        navigate("/super-admin/login", { replace: true });
      } finally {
        setChecking(false);
      }
    };

    verifySession();
  }, [navigate]);

  if (checking || !isSuperAuthenticated()) {
    return null;
  }

  return children;
};

import Chatbot from "./components/common/Chatbot";

const PublicLayout = () => {
  return (
    <>
      <PageReveal />
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
              { path: "podcasts", element: <AdminPodcasts /> },
              { path: "contacts", element: <AdminContacts /> },
              { path: "careers", element: <AdminCareers /> }
            ]
          }
        ]
      },
      {
        path: "/super-admin",
        children: [
          { path: "login", element: <SuperAdminLogin /> },
          {
            path: "dashboard",
            element: <SuperAdminGate><SuperAdminDashboard /></SuperAdminGate>
          },
          {
            path: "projects/new",
            element: <SuperAdminGate><SuperAdminProjectForm /></SuperAdminGate>
          },
          {
            path: "projects/:id/edit",
            element: <SuperAdminGate><SuperAdminProjectForm /></SuperAdminGate>
          },
          {
            path: "",
            element: <Navigate to="dashboard" replace />
          }
        ]
      }
    ],
  },
]);

export default router;
