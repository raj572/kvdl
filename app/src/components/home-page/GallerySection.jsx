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


    gsap.set(".column1", { y: -800 });
    gsap.set(".column3", { y: -800 });

    // Column movement (alternate directions)
    const movements = [-100, -300, -100, -300];


    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: true,
    });

    // Animate each column in opposite directions
    columns.forEach((col, i) => {
      gsap.to(col, {
        y: movements[i],
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: true,
        },
      });
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
        <div className=" column1">
          <div className="h-40 md:h-60 bg-black"><img src="/images/1.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60  bg-black"><img src="/images/2.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/3.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/4.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/2.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/3.png" className="h-full w-full object-cover opacity-80" /></div>


        </div>

        {/* COLUMN 2 */}
        <div className=" column2">
          <div className="h-40 md:h-60 bg-black"><img src="/images/5.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/6.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/7.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/8.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/5.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/6.png" className="h-full w-full object-cover opacity-80" /></div>
        </div>

        {/* COLUMN 3 */}
        <div className=" column3">
          <div className="h-40 md:h-60 bg-black"><img src="/images/9.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/10.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/11.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/12.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/10.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/11.png" className="h-full w-full object-cover opacity-80" /></div>
        </div>

        {/* COLUMN 4 */}
        <div className=" column4">
          <div className="h-40 md:h-60 bg-black"><img src="/images/13.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/14.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/15.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/16.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/13.png" className="h-full w-full object-cover opacity-80" /></div>
          <div className="h-40 md:h-60 bg-black"><img src="/images/14.png" className="h-full w-full object-cover opacity-80" /></div>
        </div>

      </div>
    </div>
  );
};

export default ImageTextScroll;
