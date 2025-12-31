import React from 'react'
import CustomEase from 'gsap/CustomEase'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(CustomEase);

const customEase = CustomEase.create("custom", ".87,0,.13,1");

const PageReveal = () => {

  useGSAP(() => {

    const counter = document.getElementById('counter');

    gsap.set(".img-container", {
      scale: 0,
      rotation: -20,
    });

    gsap.to(".page-reveal", {
      clipPath: "polygon(0% 45%, 25% 45%, 25% 55%, 0% 55%)",
      duration: 1.5,
      ease: customEase,
      delay: 1,
    });

    gsap.to(".page-reveal", {
      clipPath: "polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)",
      duration: 2,
      ease: customEase,
      delay: 3,
      onStart: () => {
        gsap.to(".progress-bar", {
          width: "100vw",
          duration: 2,
          ease: customEase,
        });

        gsap.to(counter, {
          innerHTML: 100,
          duration: 2,
          ease: customEase,
          snap: { innerHTML: 1 },
        });
      }
    });

    gsap.to(".page-reveal", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: customEase,
      delay: 5,
      onStart: () => {
        gsap.to(".img-container", {
          scale: 1,
          rotation: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.25,
          ease: customEase,
          delay: 0.5,
        });

        gsap.to(".progress-bar", {
          opacity: 0,
          duration: 0.3,
        });
      }
    });

    gsap.to(".page", {
      pointerEvents: "none",
      delay: 6.5,
      onComplete: () => {
        const reveal = document.querySelector(".page");
        if (reveal) reveal.style.display = "none";

        window.dispatchEvent(new Event("revealComplete"));
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
