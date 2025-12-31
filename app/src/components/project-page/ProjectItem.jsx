import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextScroll from "../common/TextScroll";
import { projects} from "../../constants/projectData.js";
import { FaLocationDot, FaLocationPin, FaMapPin, FaStar, FaStarAndCrescent, FaStarHalfStroke } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { GiHouseKeys } from "react-icons/gi";
import { PiResizeFill } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { BiSolidBuildings } from "react-icons/bi";
import Preview from "../home-page/Preview";
import SectionHeader from "../common/SectionHeader.jsx";
import RedButton from "../common/RedButton.jsx";
import { Pin } from "lucide-react";

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
    <div className="w-full min-h-dvh pt-12 md:pt-20 ">

      <div className="mx-auto max-w-[1400px] p-4 md:p-8">

      {/*Section Header */}
      <div className="  flex flex-col justify-between gap-10 py-5 lg:py-10">

        {/* Heading */}
        <div className="flex gap-4 items-start">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-6xl lg:text-7xl uppercase font-bold font-[arkhip] leading-none">
            {project.title}
            </h1>
            <div  className="text-neutral-500 text-xs md:text-sm flex items-center gap-2">
            <span className="flex items-center gap-1 md:hidden "> <FaStarHalfStroke/> {project.rating}</span>
            <span className="flex md:hidden">|</span>
            <span>Rera: {project.reraid}</span>
            <span>|</span>
            <span className="flex items-center gap-1"><FaMapPin/> {project.pincode}</span>
            </div>
          </div>
          <div className="md:flex hidden  items-center text-sm md:text-base gap-1">
            <FaStarHalfStroke/>
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
              <RedButton to={"/contact"} label={"Contact Seller"}/>
            </div>
            
            
          </div>
        </div>

        <div className="project-images-slider overflow-hidden py-10 md:py-14 lg:py-20">
          <div className="project-images-track">
          {project?.images?.length > 0 && (
          [...project.images, ...project.images].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${i + 1}`}
              className="h-44 md:h-[70vh] w-auto min-w-40 object-cover rounded-lg"
            />
          ))
        )}

          </div>
        </div>
        
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
              {project.floorplan?.map((img, i) => (
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


      </div>


</div>
  );
};

export default ProjectItem;
