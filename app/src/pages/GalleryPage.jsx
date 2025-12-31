import React, { useEffect } from "react";
import TextScroll from "../components/common/TextScroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    // animate each image when it enters viewport
    ScrollTrigger.batch(".gallery-image", {
      onEnter: (batch) => {
        gsap.to(batch, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
        });
      },
    });
  });

  return (
    <div className="gallery-page min-h-dvh">
      {/* STICKY TOP SECTION */}
      <div className="sticky top-0 z-10 w-full">
        <TextScroll
          text="Showcase"
          repeat={6}
          duration={100}
          className="pt-24 text-5xl md:pt-40 md:text-7xl lg:text-9xl "
        />
      </div>

      {/* CONTENT BELOW */}
      <div className="gallery-hero min-h-dvh bg-background relative z-20 px-4 py-10">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 md:gap-4 space-y-4 md:space-y-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <img
              key={i}
              src={`/images/${i + 1}.png`}
              alt={`Gallery ${i + 1}`}
              className="gallery-image w-full rounded-lg  break-inside-avoid object-cover"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", // fully clipped at start
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
