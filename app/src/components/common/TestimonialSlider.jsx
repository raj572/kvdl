import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const testimonials = [
  {
    text: `"KV has been a game-changer for my home. Their ability to blend functionality with exquisite design is unparalleled."`,
    author: "Mathews R."
  },
  {
    text: `"Outstanding experience! The attention to detail and dedication shown by the team exceeded all expectations."`,
    author: "Priya S."
  },
  {
    text: `"A perfect blend of modern aesthetic and practicality. Highly recommended!"`,
    author: "Rahul K."
  }
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);
  const textRef = useRef(null);

  // Fade animation on every change
  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [index]);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md p-6 rounded-xl ">
      
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[1,2,3,4,5].map((s) => (
          <span key={s} className="text-white text-lg">★</span>
        ))}
      </div>

      {/* Text */}
      <p ref={textRef} className="text-white  leading-snug mb-4">
        {testimonials[index].text} – <span className="font-semibold">{testimonials[index].author}</span>
      </p>

      {/* Dots */}
      <div className="flex gap-2 mt-3">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 w-6 rounded-full transition-all duration-300 ${
              index === i ? "bg-primary" : "bg-[#c9c9c9]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
