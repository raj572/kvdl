import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

const PageTransition = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const overlayRef = useRef(null);
  const blocksRef = useRef([]);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return;

      overlayRef.current.innerHTML = "";
      blocksRef.current = [];

      let blockCount = 20;
      if (window.innerWidth <= 640) blockCount = 8;
      else if (window.innerWidth <= 1024) blockCount = 12;

      for (let i = 0; i < blockCount; i++) {
        const block = document.createElement("div");
        block.className = "block";
        overlayRef.current.appendChild(block);
        blocksRef.current.push(block);
      }
    };

    createBlocks();

    gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });

    // COVER → Navigate
    const coverPage = (url) => {
      const tl = gsap.timeline({
        onComplete: () => navigate(url),
      });

      tl.to(blocksRef.current, {
        scaleX: 1,
        duration: 1,
        stagger: 0.02,
        ease: "power2.out",
        transformOrigin: "left",
      });
    };

    const handleRouteChange = (url) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    };

    // REVEAL new page
    const revealPage = () => {
      gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });

      gsap.to(blocksRef.current, {
        scaleX: 0,
        duration: 1,
        stagger: 0.02,
        ease: "power2.out",
        transformOrigin: "right",
        onComplete: () => {
          isTransitioning.current = false;
        },
      });
    };

    revealPage();

    // Intercept all links
    const links = document.querySelectorAll('a[href^="/"]');

    const clickHandler = (e) => {
      const href = e.currentTarget.href;
      const url = new URL(href).pathname;

      if (url !== pathname) {
        e.preventDefault();
        handleRouteChange(url);
      }
    };

    links.forEach((link) => link.addEventListener("click", clickHandler));

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", clickHandler)
      );
    };
  }, [pathname, navigate]);

  return (
    <>
      <div
        ref={overlayRef}
        className="transition-overlay fixed top-0 left-0 w-screen h-screen flex pointer-events-none z-9999"
      ></div>

      <Outlet />
    </>
  );
};

export default PageTransition;
