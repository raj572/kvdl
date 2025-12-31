import TextScroll from "../components/common/TextScroll";
import About from "../components/home-page/AboutSection";
import Contact from "../components/home-page/ContactSection";
import Footer from "../components/layout/Footer";
import Hero from "../components/home-page/HeroSection";
import ImageTextScroll from "../components/home-page/GallerySection";
import Preview from "../components/home-page/Preview";
import Projects from "../components/home-page/Projects";
import PageReveal from "../transitions/PageReveal";
import ProjectSection from "../components/home-page/ProjectSection";

const Home = () => {
  return (
    <div className="relative">
      <PageReveal />
      <Hero/>
      <About/>
      <ImageTextScroll/>
      <ProjectSection/>
      {/* <Projects/> */}
      <Preview/>
      <Contact/>
    </div>
  );
};

export default Home;
