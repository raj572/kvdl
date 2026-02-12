import ContactPopup from "../components/common/ContactPopup";
import About from "../components/home-page/AboutSection";
import Contact from "../components/home-page/ContactSection";
import GallerySectionV2 from "../components/home-page/GallerySectionV2";
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
      <GallerySectionV2 />
      <ProjectSection />
      {/* <Projects/> */}
      <Contact />
    </div>
  );
};

export default Home;
