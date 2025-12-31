import { useEffect, useState } from "react";
import RedButton from "./RedButton";

const ProjectMedia = ({ project }) => {
  const [imagesToShow, setImagesToShow] = useState(4);

  useEffect(() => {
    const checkHeight = () => {
      setImagesToShow(window.innerHeight > 900 ? 5 : 4);
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);

    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  return (
    <section
      data-snap-section
      className="relative flex justify-between overflow-hidden flex-col h-screen text-background"
    >
      {/* CENTERED TITLE */}
      <div className="flex flex-col items-center gap-2 justify-center h-screen py-10 px-5 relative z-2 text-center">
        <h2 className="text-3xl w-3/5 leading-none whitespace-pre-line font-[arkhip] uppercase lg:text-5xl">
          {project.title}
        </h2>
        <RedButton to={`/projects/${project.id}`} label={"See Project"} />
      </div>

      {/* LOCATION  */}
      <div className="absolute top-10 md:bottom-10 left-5 md:left-10 z-2">
        <p className="lg:text-xl">{project.location}</p>
      </div>

      {/* BACKGROUND IMAGE */}
      <div>
        <div
          data-media
          className="w-full h-screen overflow-hidden will-change-transform z-1 absolute top-[50vh]
          left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black"
        >
          <img
            src={project.image}
            alt={project.title}
            className="object-cover h-full w-full opacity-60"
          />
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="thumb-slider absolute bottom-10 md:top-1/2 md:-translate-y-1/2 left-5 md:left-auto md:right-5 z-2 overflow-hidden md:h-[90vh]">
        <div className="thumb-track flex flex-row md:flex-col">
          {[...project.images.slice(0, imagesToShow), ...project.images.slice(0, imagesToShow)].map(
            (img, i) => (
              <div
                key={i}
                className="thumb-item h-36 w-48 md:w-40 md:h-30 lg:w-52 lg:h-40 mr-4"
              >
                <img src={img} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectMedia;
