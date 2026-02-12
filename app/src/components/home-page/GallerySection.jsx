import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ImageTextScroll = () => {
  const sectionRef = useRef(null);



  useGSAP(() => {
    const columns = gsap.utils.toArray(".column1, .column2, .column3, .column4");

    // Set initial positions
    gsap.set(".column1", { y: -800 });
    gsap.set(".column3", { y: -800 });

    const movements = [100, -300, 100, -300]; // Adjusted for clearer movement

    // Create a timeline that pins the section and animates columns
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        pin: true,
        scrub: 0.75, // Slightly tighter than 1
        anticipatePin: 1,
        fastScrollEnd: true, // Forces completion if scrolled past quickly
        invalidateOnRefresh: true, // Handles resizes better
      }
    });

    columns.forEach((col, i) => {
      tl.to(col, {
        y: movements[i],
        ease: "power1.inOut",
        force3D: true // Ensure hardware acceleration
      }, 0);
    });
  });

  return (
    <div
      ref={sectionRef}
      className="imagetextscroll-section min-h-dvh h-screen py-16  md:py-24 w-full "
    >
      <div className="background-scroll relative  h-full w-full overflow-hidden   grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
        <div className="absolute inset-0 z-10 flex flex-col items-center gap-4 justify-center ">
          <h1 className="w-fit text-3xl lg:text-6xl tracking-tighter uppercase font-semibold text-white font-[arkhip] text-center ">
            See More Places <br /> Like This
          </h1>
          <Link to="/gallery" className="bg-primary hover:bg-red-700 transition-all duration-300  px-4 md:px-5 py-2 md:py-3 text-background font-[sansation]   border border-background cursor-pointer rounded-full">
            Explore Our Gallery
          </Link>
        </div>

        {/* COLUMN 1 */}
        <div className=" column1 will-change-transform" style={{ willChange: 'transform' }}>
          <div className="h-40 md:h-60 bg-black"><img src="/images/1.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60  bg-black"><img src="/images/2.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/3.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/4.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/2.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/3.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>


        </div>

        {/* COLUMN 2 */}
        <div className=" column2 will-change-transform" style={{ willChange: 'transform' }}>
          <div className="h-40 md:h-60 bg-black"><img src="/images/5.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/6.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/7.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/8.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/5.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/6.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
        </div>

        {/* COLUMN 3 */}
        <div className=" column3 will-change-transform" style={{ willChange: 'transform' }}>
          <div className="h-40 md:h-60 bg-black"><img src="/images/9.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/10.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/11.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/12.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/10.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/11.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
        </div>

        {/* COLUMN 4 */}
        <div className=" column4 will-change-transform" style={{ willChange: 'transform' }}>
          <div className="h-40 md:h-60 bg-black"><img src="/images/13.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/14.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/15.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/16.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/13.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/14.png" className="h-full w-full object-cover opacity-80" loading="lazy" decoding="async" /></div>
        </div>

      </div>
    </div>
  );
};

export default ImageTextScroll;
