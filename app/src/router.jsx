import { createBrowserRouter } from "react-router-dom";
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
      { path: "/*", element: <NotFound /> }
    ],
  },
]);

export default router;
