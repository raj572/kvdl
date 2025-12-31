import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Link } from "react-router-dom";
import { projects } from "../../constants/projectData.js";
import ImageSlider from "../common/ImageSlider.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

const projectData = projects;

const images = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
  "/images/6.png",
  "/images/7.png",
];

const Projects = () => {
  useGSAP(() => {
    gsap.utils.toArray(".work-item").forEach((item) => {
      const title = item.querySelector(".work-item-name h1");
      const img = item.querySelector(".work-item-img");

      const split = new SplitText(title, { type: "chars" });
      gsap.set(split.chars, { y: "100%" });

      split.chars.forEach((char, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: `top+=${index * 25 - 250} top`,
          end: `top+=${index * 25 - 100} top`,
          scrub: 1,
          animation: gsap.to(char, { y: "0%", ease: "none" }),
        });
      });

      ScrollTrigger.create({
        trigger: item,
        start: "top bottom",
        end: "top top",
        scrub: 0.5,
        animation: gsap.fromTo(
          img,
          {
            clipPath: "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "none",
          }
        ),
      });

      ScrollTrigger.create({
        trigger: item,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 0.5,
        animation: gsap.fromTo(
          img,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)",
            ease: "none",
          }
        ),
      });
    });

    ScrollTrigger.refresh();
  });

  return (
    <section className="overflow-hidden">
      {/* HEADING */}
      <div className="min-h-[40vh] pb-10 px-5 md:px-10 flex flex-col justify-between">
        <h1 className="text-4xl md:text-6xl lg:text-8xl uppercase font-bold font-[arkhip] leading-none">
          projects
        </h1>

        <div className="mt-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4">
          <Link to="/projects" className="border-b-2 border-dotted hover:border-primary">
            <p className="uppercase text-sm md:text-base lg:text-lg font-[sansation] hover:text-primary transition-all duration-300">
              Completed Projects
            </p>
          </Link>

          <div className="flex-1 max-w-xl">
            <p className="font-noto text-base md:text-lg lg:text-2xl leading-relaxed">
              Explore a curated selection of our featured work, crafted with
              precision, creativity, and a deep understanding of design and
              comfort.
            </p>
          </div>
        </div>
      </div>

      {/* PROJECT ITEMS */}
      {projectData.map((item, i) => (
        <div key={i} className="work-item relative w-screen h-[150vh] overflow-hidden">
          <div
            className="work-item-img absolute w-full h-full bg-black"
            style={{
              clipPath: "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)",
            }}
          >
            <div className="absolute z-2 top-[10%]  w-full md:top-[20%] px-5 lg:px-20 text-white font-[sansation]  flex justify-between">
              <div>
                <p>3.755° N,</p>
                <p>54.991° E</p>
              </div>
              <div>
                <p>2002,</p>
                <p>Pune</p>
              </div>
            </div>
            {/* IMAGE SLIDER */}
            <div className="absolute gap-30 p-4 backdrop-blur-sm bg-white/10 z-20 bottom-[12%] flex justify-center items-end w-full">

              <ImageSlider images={images} />

              {/* DESCRIPTION */}
              <div className="w-[30%] font-noto text-base md:text-lg lg:text-2xl text-white hidden lg:flex">
                <p>
                  A coastal villa where the sea and sky merge, serene interiors,
                  light, and the calm of endless horizons.
                </p>
              </div>
            </div>

            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover opacity-50"
            />
          </div>

          <div className="work-item-name absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-full text-white">
            <h1 className="uppercase text-center text-2xl md:text-3xl lg:text-5xl font-bold font-[arkhip]">
              {item.title}
            </h1>
            <div className=" flex justify-center mt-4">
              <div className="project-button bg-primary hover:bg-red-700 transition-all duration-300  px-4 md:px-10 py-2 text-background font-[sansation] border border-background cursor-pointer rounded-full">
                See Project
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
