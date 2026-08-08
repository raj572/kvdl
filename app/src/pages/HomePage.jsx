import ContactPopup from "../components/common/ContactPopup";
import MapSection from "../components/common/MapSection";
import About from "../components/home-page/AboutSection";
import Contact from "../components/home-page/ContactSection";
import GallerySectionV2 from "../components/home-page/GallerySectionV2";
import Hero from "../components/home-page/HeroSection";
import ProjectSection from "../components/home-page/ProjectSection";

const Home = () => {
  return (
    <div className="relative">
      <ContactPopup />
      <Hero />
      <About />
      <GallerySectionV2 />
      <ProjectSection />
      {/* <Projects/> */}
      <Contact />
      <MapSection />
    </div>
  );
};

export default Home;
