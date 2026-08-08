import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { projects } from '../constants/projectData';

gsap.registerPlugin(CustomEase);

const customEase = CustomEase.create("custom", ".87,0,.13,1");

// Module-level flag: resets on hard refresh (JS re-executes),
// but survives SPA navigation (module stays in memory).
let loaderShown = false;

const PageReveal = () => {
  const hasRevealed = loaderShown;

  useGSAP(() => {
    if (hasRevealed) {
      const reveal = document.querySelector(".page");
      if (reveal) reveal.style.display = "none";
      window.dispatchEvent(new Event("revealComplete"));
      return;
    }

    const counter = document.getElementById('counter');

    // ── Set initial states ──────────────────────────────────────────────
    gsap.set(".loader-brand",         { y: 60,  opacity: 0 });
    gsap.set(".loader-tagline",       { y: 30,  opacity: 0 });
    gsap.set(".loader-progress-fill", { scaleX: 0, transformOrigin: "left" });
    gsap.set(".loader-dot",           { scale: 0 });

    // ── Entrance animations (run immediately) ───────────────────────────
    gsap.to(".loader-brand",   { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
    gsap.to(".loader-tagline", { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out" });
    gsap.to(".loader-dot",     { scale: 1, duration: 0.4, delay: 0.8, ease: "back.out(2)" });

    // ── Visual progress: always runs 0→100 over ANIM_DURATION seconds ───
    const ANIM_DURATION = 2.5; // seconds — always feels smooth
    let visualDone  = false;
    let assetsDone  = false;

    const tryExit = () => {
      if (!visualDone || !assetsDone) return;

      // ── Exit timeline ─────────────────────────────────────────────────
      const exitTl = gsap.timeline();

      exitTl.to(".loader-tagline", { y: -20, opacity: 0, duration: 0.5, ease: "power2.in" });
      exitTl.to(".loader-brand",   { y: -40, opacity: 0, duration: 0.7, ease: "power3.in" }, "-=0.3");
      exitTl.to(".loader-line-container", { opacity: 0, duration: 0.4 }, "-=0.4");
      exitTl.to(".page", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.0,
        ease: customEase,
        onComplete: () => {
          loaderShown = true;
          const reveal = document.querySelector(".page");
          if (reveal) reveal.style.display = "none";
          window.dispatchEvent(new Event("revealComplete"));
        }
      });
    };

    // Animate counter + bar smoothly regardless of cache speed
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: 100,
      duration: ANIM_DURATION,
      ease: "power1.inOut",
      delay: 0.3,
      onUpdate() {
        const v = Math.round(proxy.val);
        if (counter) counter.innerHTML = v;
        gsap.set(".loader-progress-fill", { scaleX: v / 100 });
      },
      onComplete() {
        if (counter) counter.innerHTML = "100";
        gsap.set(".loader-progress-fill", { scaleX: 1 });
        visualDone = true;
        tryExit();
      }
    });

    // ── Real asset preloading ────────────────────────────────────────────
    const assetsToLoad = [
      "/videos/bgvideo.mp4",
      "/images/KVboss.webp",
      ...Array.from({ length: 16 }, (_, i) => `/images/${i + 1}.webp`),
    ];

    const activeProjects = projects.slice(7, 12);
    activeProjects.forEach(project => {
      if (project.image) assetsToLoad.push(project.image);
      if (project.images) {
        const validImages = project.images.filter(img => !img.includes('placehold.co'));
        let displayImages = [...validImages];
        while (displayImages.length < 10 && validImages.length > 0) {
          displayImages = [...displayImages, ...validImages];
        }
        displayImages.slice(0, 10).forEach(img => assetsToLoad.push(img));
      }
    });

    const uniqueAssets = [...new Set(assetsToLoad)];
    let loadedCount = 0;
    const totalAssets = uniqueAssets.length;

    const onAssetDone = () => {
      loadedCount++;
      if (loadedCount === totalAssets) {
        assetsDone = true;
        tryExit();
      }
    };

    uniqueAssets.forEach(url => {
      if (url.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = url;
        video.onloadeddata = onAssetDone;
        video.onerror = onAssetDone;
      } else {
        const img = new Image();
        img.src = url;
        img.onload = onAssetDone;
        img.onerror = onAssetDone;
      }
    });
  }, [hasRevealed]);


  if (hasRevealed) {
    return null;
  }

  return (
    <div
      className="page fixed inset-0 z-9999 w-screen h-screen"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Dark architectural background */}
      <div className="absolute inset-0 bg-[#0c0c0c]">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #f8f0dd 1px, transparent 1px),
              linear-gradient(to bottom, #f8f0dd 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(175,34,31,0.08) 0%, transparent 70%)"
          }}
        />
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        {/* Brand name */}
        <div className="overflow-hidden mb-3">
          <h1 className="loader-brand font-[arkhip] text-[clamp(2.5rem,8vw,7rem)] uppercase text-[#f8f0dd] leading-none tracking-[0.08em]">
            KVDL
          </h1>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden">
          <p className="loader-tagline font-[sansation] text-[clamp(0.6rem,1.5vw,0.85rem)] uppercase tracking-[0.35em] text-[#f8f0dd]/40">
            Kedar Vanjape Developers
            <span className="loader-dot inline-block w-1.5 h-1.5 rounded-full bg-[#AF221F] ml-2 align-middle"></span>
          </p>
        </div>
      </div>

      {/* Progress section — bottom */}
      <div className="loader-line-container absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-10 md:pb-14">
        <div className="flex justify-between items-center mb-3">
          <span className="font-[sansation] text-[0.65rem] uppercase tracking-[0.3em] text-[#f8f0dd]/30">
            Loading
          </span>
          <span className="font-[arkhip] text-[0.75rem] text-[#f8f0dd]/50">
            <span id="counter">0</span>
            <span className="text-[#f8f0dd]/20">%</span>
          </span>
        </div>

        {/* Progress bar track */}
        <div className="relative w-full h-px bg-[#f8f0dd]/10 overflow-hidden">
          <div
            className="loader-progress-fill absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#AF221F]/60 to-[#AF221F]"
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageReveal;

