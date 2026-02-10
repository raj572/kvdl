import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

const customEase = CustomEase.create("custom", ".87,0,.13,1");

const PageReveal = () => {

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    const counter = document.getElementById('counter');

    // Define animation timeline
    tl.set(".img-container", { scale: 0, rotation: -20 });

    tl.to(".page-reveal", {
      clipPath: "polygon(0% 45%, 25% 45%, 25% 55%, 0% 55%)",
      duration: 1.5,
      ease: customEase,
    });

    tl.to(".page-reveal", {
      clipPath: "polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)",
      duration: 2,
      ease: customEase,
      onStart: () => {
        gsap.to(".progress-bar", { width: "100vw", duration: 2, ease: customEase });
        gsap.to(counter, { innerHTML: 100, duration: 2, ease: customEase, snap: { innerHTML: 1 } });
      }
    });

    tl.to(".page-reveal", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: customEase,
      onStart: () => {
        gsap.to(".img-container", {
          scale: 1, rotation: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.25, ease: customEase, delay: 0.5
        });
        gsap.to(".progress-bar", { opacity: 0, duration: 0.3 });
      }
    });

    tl.to(".page", {
      pointerEvents: "none",
      delay: 1.5,
      onComplete: () => {
        const reveal = document.querySelector(".page");
        if (reveal) reveal.style.display = "none";
        window.dispatchEvent(new Event("revealComplete"));
      }
    });

    // Asset Preloading Logic
    const imageUrls = [
      "/videos/bgvideo.mp4",
      "/images/1.png", "/images/2.png", "/images/3.png", "/images/4.png",
      "/images/5.png", "/images/6.png", "/images/7.png", "/images/8.png",
      "/images/9.png", "/images/10.png", "/images/11.png", "/images/12.png",
      "/images/13.png", "/images/14.png", "/images/15.png", "/images/16.png"
    ];

    let loadedCount = 0;
    const updateProgress = () => {
      loadedCount++;
      // Optional: Update a preliminary progress bar here if needed
      if (loadedCount === imageUrls.length) {
        tl.play(); // Start animation only when everything is loaded
      }
    };

    imageUrls.forEach(url => {
      if (url.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = url;
        video.onloadeddata = updateProgress;
        video.onerror = updateProgress; // Proceed even if fail
      } else {
        const img = new Image();
        img.src = url;
        img.onload = updateProgress;
        img.onerror = updateProgress;
      }
    });

  });

  return (
    <div className="page fixed inset-0 z-9999 w-screen h-screen bg-background ">
      <div
        className="page-reveal relative w-screen h-screen bg-black flex flex-col justify-between"
        style={{
          clipPath: "polygon(0% 45%, 0% 45%, 0% 55%, 0% 55%)"
        }}
      >
        <div className='progress-bar absolute top-[50%] left-0 translate-y-[-50%] w-[25vw] p-[1em] md:p-[2em] flex justify-between items-center text-white'>
          <p className='uppercase hidden lg:flex text-base font-[arkhip]'>Kedar Vanjape</p>
          <p className='uppercase lg:hidden'>KVDL</p>
          <p>/<span id='counter'>0</span></p>
        </div>

        <div
          className='img-container absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-screen h-screen bg-black overflow-hidden'
          style={{
            clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)"
          }}
        >
          <video
            src="/videos/bgvideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-auto h-auto min-h-full min-w-full object-cover opacity-60'
          />
        </div>

      </div>
    </div>
  );
};

export default PageReveal;
