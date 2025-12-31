import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const ImageSlider = ({ images }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const totalWidth = slider.scrollWidth - slider.clientWidth;

    gsap.to(slider, {
      scrollLeft: totalWidth,
      duration: 12,
      ease: "none",
      repeat: -1,
    //   yoyo: true,
    });
  }, []);

  return (
    <div
      ref={sliderRef}
      className="
        image-slider
        flex gap-5
        w-full lg:w-[60%]
        overflow-x-auto
        snap-x snap-mandatory
        scroll-smooth
        no-scrollbar
        relative z-30
        
      "
    >
      {images.map((src, index) => {
        const isLast = index === images.length - 1;

        return (
          <div
            key={index}
            className="
              h-52 w-60 shrink-0
              overflow-hidden snap-start
              relative
            "
          >
            {/* Last slide overlay */}
            {isLast && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-lg z-10">
                <p className="p-2 border">See More</p>
              </div>
            )}

            <img
              src={src}
              className={`w-full h-full object-cover ${
                isLast ? "opacity-40" : ""
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageSlider;
