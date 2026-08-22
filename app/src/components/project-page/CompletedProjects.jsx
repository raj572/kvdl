import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects, getImageUrl } from "../../services/api";

gsap.registerPlugin(ScrollTrigger);

const CompletedProjects = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entranceFinished, setEntranceFinished] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProjects = async () => {
      try {
        const res = await getProjects({ type: "completed" });
        if (res.success) {
          setProjectData(res.data);
        }
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // -------------------------
  // 🔥 MAIN PAGE ZOOM ENTRANCE
  // -------------------------
  useGSAP(() => {
    if (loading) return;
    // Disable all scrollTriggers before entrance animation
    ScrollTrigger.getAll().forEach((st) => st.disable());

    gsap
      .timeline({
        defaults: { ease: "power3.out", duration: 1 },
      })
      .from(".completed-projects", {
        scale: 1.15,
        opacity: 0,
      })
      .add(() => {
        // Re-enable scrollTriggers after entrance animation finishes
        ScrollTrigger.getAll().forEach((st) => st.enable());
        ScrollTrigger.refresh();
        setEntranceFinished(true);
      });
  }, { dependencies: [loading] });

  // -------------------------
  // 🔥 SCROLL ANIMATIONS
  // -------------------------
  useGSAP(() => {
    if (loading || !entranceFinished) return;
    const rows = gsap.utils.toArray(".project-row");

    rows.forEach((row) => {
      const items = row.querySelectorAll(".work-item");

      gsap.from(items, {
        rotate: (i) => (i === 0 ? -60 : 60),
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
        },
      });
    });
    ScrollTrigger.refresh();
  }, { dependencies: [loading, projectData, entranceFinished] });


  const rows = [];
  for (let i = 0; i < projectData.length; i += 2) {
    rows.push(projectData.slice(i, i + 2));
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <p className="uppercase text-sm tracking-widest animate-pulse">Loading Projects...</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="completed-projects w-full pb-10">
      <div className="flex flex-col gap-10">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="project-row grid grid-cols-1 sm:grid-cols-2 gap-10"
          >
            {row.map((project, colIndex) => {

              return (
                <Link
                  to={`/projects/${project.id}`}
                  key={colIndex}
                  className="work-item flex flex-col gap-4 cursor-pointer"
                >
                  <div className="work-item-img h-[50vh] md:h-[50vh] lg:h-[70vh] overflow-hidden rounded-lg">
                    <img
                      src={getImageUrl(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex justify-between">
                    <h3 className="md:text-xl font-[sansation]">
                      {project.title}
                    </h3>
                    <p className="text-foreground/80 text-sm md:text-base">
                      {project.location}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedProjects;
