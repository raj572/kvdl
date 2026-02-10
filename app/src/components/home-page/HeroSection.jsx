import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import TestimonialSlider from "../common/TestimonialSlider";

const Hero = () => {

  useGSAP(() => {

    const animateHeroText = () => {
      gsap.from(".hero-line", {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      });

      gsap.from(".testimonial-slider", {
        yPercent: 100,
        opacity: 0,
        delay: .5,
        duration: 1.2,
        ease: "power3.out"
      });

      // gsap.from(".hero-button", {
      //   yPercent: 100,
      //   opacity: 0,
      //   delay:.5,
      //   duration: 1.2,
      //   ease: "power3.out"
      // });
    };

    //reveal complete event listener
    window.addEventListener("revealComplete", animateHeroText);
    return () => {
      window.removeEventListener("revealComplete", animateHeroText);
    };
  });

  useGSAP(() => {
    gsap.to(".bg-video", {
      scale: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: ".bg-video",
        start: "bottom bottom",
        scrub: true
      }
    });

    gsap.to(".testimonial-slider", {
      xPercent: -300,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".bg-video",
        start: "top top",
        scrub: true
      }
    })
    gsap.to(".hero-button", {
      opacity: 0,
      //  xPercent:100,
      ease: "none",
      scrollTrigger: {
        trigger: ".bg-video",
        start: "top top",
        end: "bottom center",
        // markers:true,
        scrub: true
      }
    })
  })
  return (
    <section className="hero-section relative w-full h-screen overflow-hidden ">

      {/* Background Video */}
      <div className="bg-video absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-screen h-screen bg-black overflow-hidden">
        <video
          src="/videos/bgvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-auto h-auto min-h-full min-w-full object-cover opacity-60"
        />

      </div>


      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center font-[arkhip] justify-center text-white text-center text-4xl md:text-6xl lg:text-7xl uppercase font-bold">

        <h1 className="overflow-hidden ">
          <span className="inline-block hero-line">More than</span>
        </h1>

        <h1 className="overflow-hidden ">
          <span className="inline-block hero-line">homes we</span>
        </h1>

        <h1 className="overflow-hidden ">
          <span className="inline-block hero-line">build lifestyles</span>
        </h1>

      </div>

      <div className="absolute w-full pr-0 md:pr-28 bottom-0 flex items-end justify-center md:justify-between">
        <div className="testimonial-slider hidden md:flex">
          <TestimonialSlider />
        </div>
        <Link
          to="/projects"
          className="hero-button mb-10 py-2 px-4 bg-primary hover:bg-red-700 text-background border font-[sansation] rounded-full  cursor-pointer transition duration-300"
        >
          See All Projects
        </Link>
      </div>



    </section>
  );
};

export default Hero;
