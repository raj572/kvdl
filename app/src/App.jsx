// src/App.jsx
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Lenis from "lenis";



// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Disable lag smoothing for perfect Lenis + ScrollTrigger sync
gsap.ticker.lagSmoothing(0);

const App = () => {

  useEffect(() => {

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.1,  // smoothness
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 1,
    });

    // GSAP ScrollTrigger sync with Lenis
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // RAF loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
};

export default App;
