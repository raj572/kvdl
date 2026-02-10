import ContactPopup from "../components/common/ContactPopup";
import About from "../components/home-page/AboutSection";
import Contact from "../components/home-page/ContactSection";
import ImageTextScroll from "../components/home-page/GallerySection";
import Hero from "../components/home-page/HeroSection";
import ProjectSection from "../components/home-page/ProjectSection";
import PageReveal from "../transitions/PageReveal";

const Home = () => {
  return (
    <div className="relative">
      <ContactPopup />
      <PageReveal />
      <Hero />
      <About />
      <ImageTextScroll />
      <ProjectSection />
      {/* <Projects/> */}
      <Contact />
    </div>
  );
};

export default Home;
