import gsap from "gsap";
import { Sparkle } from "lucide-react";
import { useEffect, useRef } from "react";

const TextScroll = ({
  text = "Sample Text",
  repeat = 4,
  duration = 20,
  className = "",
  textClass = "",
}) => {
  const marqueeRef = useRef(null);
  const marqueeContentRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const marqueeContent = marqueeContentRef.current;

    if (!marquee || !marqueeContent) return;

    // remove existing clones to avoid duplication on re-renders
    marquee.querySelectorAll(".clone").forEach((c) => c.remove());

    // Duplicate programmatically
    for (let i = 0; i < 1; i++) {
      const clone = marqueeContent.cloneNode(true);
      clone.classList.add("clone");
      marquee.appendChild(clone);
    }

    const playMarquee = () => {
      const prevTween = tweenRef.current;
      let progress = prevTween ? prevTween.progress() : 0;

      prevTween && prevTween.progress(0).kill();

      const width = marqueeContent.offsetWidth;
      const gap = parseInt(
        getComputedStyle(marqueeContent).getPropertyValue("column-gap"),
        10
      );

      const distance = -1 * (gap + width);

      const tween = gsap.fromTo(
        marquee.children,
        { x: 0 },
        { x: distance, duration: duration, ease: "none", repeat: -1 }
      );

      tween.progress(progress);
      tweenRef.current = tween;
    };

    playMarquee();



    // optimized resize
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => playMarquee(), 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tweenRef.current && tweenRef.current.kill();
    };
  }, [duration, text, repeat]);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        className="marquee w-full flex overflow-hidden whitespace-nowrap"
        ref={marqueeRef}
      >
        <div
          className={`marquee-content flex gap-8 uppercase font-[arkhip] font-bold ${textClass}`}
          ref={marqueeContentRef}
        >
          {Array.from({ length: repeat }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-4"
            >
              <Sparkle
                className="w-[0.8em] h-[0.8em] flex-shrink-0"
                strokeWidth={2}
                fill="currentColor"
              />
              <span className="inline-block">
                {text}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextScroll;
