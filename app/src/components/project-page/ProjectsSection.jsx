import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CompletedProjects from "./CompletedProjects";
import OngoingProjects from "./OngoingProjects";

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("completed");

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      gsap.to(containerRef.current, {
        height: contentRef.current.offsetHeight,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div>
      {/* Tabs */}
      <div className="w-full py-6 md:py-10 flex items-center justify-center gap-5 text-foreground">
        
        <button
          onClick={() => setActiveTab("completed")}
          className={`font-[sansation] border py-2 px-4 rounded-full flex items-center gap-1 transition-all duration-300 cursor-pointer
            ${activeTab === "completed" ? " bg-primary text-white " : ""}
          `}
        >
          Completed <span className="hidden md:block">Projects</span>
        </button>

        <button
          onClick={() => setActiveTab("ongoing")}
          className={`font-[sansation]  border py-2 px-4 rounded-full flex items-center gap-1 transition-all duration-300 cursor-pointer
            ${activeTab === "ongoing" ? " bg-primary text-white " : " "}
          `}
        >
          Ongoing <span className="hidden md:block">Projects</span>
        </button>

      </div>

      {/* Animated container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden mt-5 px-6 "
      >
        <div ref={contentRef}>

          {activeTab === "completed" && (
            <div>
             <CompletedProjects/>
            </div>
          )}

          {activeTab === "ongoing" && (
            <div>
              <OngoingProjects/>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
