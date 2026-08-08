import { useEffect, useRef, useState } from "react";
import { FaLocationDot, FaMapPin, FaStarHalfStroke } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { projects } from "../../constants/projectData.js";
import RedButton from "../common/RedButton.jsx";
import BackButton from "../common/BackButton.jsx";

/* ── Slider sub-component with left/right controls ── */
const SliderWithControls = ({ displayImages }) => {
  const wrapperRef = useRef(null);
  const pauseTimerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const SCROLL_AMOUNT = 320; // pixels per button click

  const pauseAnimation = () => {
    const track = wrapperRef.current?.querySelector(".project-images-track");
    if (!track) return;
    track.style.animationPlayState = "paused";
    clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      track.style.animationPlayState = "running";
    }, 1200);
  };

  const handlePrev = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    wrapper.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    pauseAnimation();
  };

  const handleNext = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    wrapper.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    pauseAnimation();
  };

  return (
    <div className="relative py-10 md:py-14 lg:py-20">
      {/* Left Button */}
      <button
        onClick={handlePrev}
        aria-label="Previous images"
        className="
          absolute left-2 top-1/2 -translate-y-1/2 z-20
          w-10 h-10 md:w-12 md:h-12
          flex items-center justify-center
          bg-white/90 hover:bg-white
          text-foreground
          rounded-full shadow-lg
          transition-all duration-200
          hover:scale-110 active:scale-95
          border border-neutral-200
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Slider */}
      <div ref={wrapperRef} className="project-images-slider overflow-x-auto overflow-y-hidden no-scrollbar">
        <div className="project-images-track">
          {displayImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${i + 1}`}
              onClick={() => setSelectedImage(img)}
              className="h-44 md:h-[70vh] w-auto min-w-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            />
          ))}
        </div>
      </div>

      {/* Right Button */}
      <button
        onClick={handleNext}
        aria-label="Next images"
        className="
          absolute right-2 top-1/2 -translate-y-1/2 z-20
          w-10 h-10 md:w-12 md:h-12
          flex items-center justify-center
          bg-white/90 hover:bg-white
          text-foreground
          rounded-full shadow-lg
          transition-all duration-200
          hover:scale-110 active:scale-95
          border border-neutral-200
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Full Image Modal Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors text-3xl font-bold bg-white/10 w-10 h-10 rounded-full flex items-center justify-center"
            aria-label="Close modal"
          >
            &times;
          </button>
          <img
            src={selectedImage}
            alt="Full size view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

const ProjectItem = () => {
  const { id } = useParams();
  const project = projects[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return (
    <div className="h-screen bg-foreground text-background w-full flex flex-col gap-10 justify-center items-center ">
      <h1 className="font-[arkhip] text-5xl text-center uppercase font-semibold">Project <br />Not Found<span className="text-primary">.</span></h1>
      <Link to="/projects" className="underline text-primary font-[sansation]">GO BACK</Link>
    </div>
  )
  return (
    <div className="w-full min-h-dvh pt-16 md:pt-24 pb-16 md:pb-24 px-4 md:px-8 lg:px-12">
      <BackButton label="Back to All Projects" to="/projects" className="mb-4" />

      <div className="mx-auto max-w-[1400px]">

        {/*Section Header */}
        <div className="flex flex-col gap-4 pb-6">

          {/* Heading */}
          <div className="flex gap-4 items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-6xl lg:text-7xl uppercase font-bold font-[arkhip] leading-none">
                {project.title}
              </h1>
              <div className="text-neutral-500 text-xs md:text-sm flex items-center gap-2">
                <span className="flex items-center gap-1 md:hidden "> <FaStarHalfStroke /> {project.rating}</span>
                <span className="flex md:hidden">|</span>
                <span>Rera: {project.reraid}</span>
                <span>|</span>
                <span className="flex items-center gap-1"><FaMapPin /> {project.pincode}</span>
              </div>
            </div>
            <div className="md:flex hidden  items-center text-sm md:text-base gap-1">
              <FaStarHalfStroke />
              <p>{project.rating}</p>
            </div>
          </div>

          {/* Location + Description  */}
          <div className="border-b-2 border-dotted flex items-center gap-2 w-fit">
            <FaLocationDot className="size-4" />
            <p className="uppercase text-sm md:text-base lg:text-lg font-[sansation]">
              {project.location}
            </p>
          </div>

        </div>

        {/* Hero */}
        <div className="flex flex-col lg:flex-row ">

          <div className="w-full lg:w-4/6 overflow-hidden rounded-xl">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="w-full lg:w-2/6 px-0 lg:px-10">
            {/* Basic Detail */}
            <div className="flex flex-col gap-4 mt-8 lg:mt-0 ">
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-2 md:gap-6">
                {project.highlights?.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex flex-row md:flex-col gap-4 justify-start md:justify-center items-center  border-2 border-foreground-light rounded-xl p-2 md:p-4"
                    >
                      <div className="bg-foreground-light p-2 rounded-full">
                        <Icon className="size-5 md:size-8" />
                      </div>
                      <div className="flex flex-row justify-between md:flex-col items-center w-full">
                        <p className="text-sm ">{item.label}</p>
                        <p className="text-sm md:text-base font-semibold">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 lg:mt-14 flex flex-col gap-4 ">
              <p>{project.description}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <RedButton to={"/contact"} label={"Contact Seller"} />
                {project.brochure && (
                  <a
                    href={project.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-full font-semibold text-sm uppercase tracking-wider text-center"
                  >
                    Download Brochure
                  </a>
                )}
              </div>
            </div>


          </div>
        </div>

        {/* Image Slider with nav buttons */}
        {(() => {
          const validImages = project?.images?.filter(img => !img.includes('placehold.co')) || [];
          if (validImages.length === 0) return null;

          let displayImages = [...validImages];
          while (displayImages.length < 10) {
            displayImages = [...displayImages, ...validImages];
          }

          return (
            <SliderWithControls displayImages={displayImages} />
          );
        })()}


        {/* Amneties */}
        <div className="flex flex-col gap-4">
          <h2 className="font-[arkhip] text-lg md:text-xl  uppercase">Amneties</h2>
          <div className=" flex flex-wrap gap-4 items-center text-sm">
            {project?.amneties?.length > 0 &&
              project.amneties.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-center gap-2 border border-neutral-800 rounded-full px-4 py-2">
                    <Icon className="text-lg md:text-xl text-neutral-800" />
                    <span >{a.label}</span>
                  </div>
                );
              })
            }
          </div>
        </div>

        {/* Floor Plan */}
        {(() => {
          const validFloorplans = project.floorplan?.filter(img => !img.includes('placehold.co')) || [];
          if (validFloorplans.length === 0) return null;

          return (
            <div
              className="
                bg-foreground rounded-xl mt-8 md:mt-14
                bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
                bg-size-[20px_20px]
              "
            >
              <div className="py-5 md:py-10 px-5">
                <h2 className="font-[arkhip] text-lg md:text-xl text-background uppercase mb-4">Floor Plan</h2>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                  {validFloorplans.map((img, i) => (
                    <div key={i} className="mb-4 break-inside-avoid rounded-md overflow-hidden">
                      <img
                        src={img}
                        alt={`Floorplan ${i + 1}`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}


      </div>


    </div>
  );
};

export default ProjectItem;
