import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Fragment, useRef } from 'react'
import { projects } from '../../constants/projectData'
import ProjectMedia from './ProjectMedia'

gsap.registerPlugin(ScrollTrigger);

const ProjectContainer = () => {
  const mainRef = useRef(null);
  const projectsData = projects.slice(7, 12);

  useGSAP(() => {
    if (!mainRef.current) return;

    const mm = gsap.matchMedia();

    // 🔥 Only run animation on screens >= 1024px
    mm.add("(min-width: 1024px)", () => {

      const projectSection = Array.from(
        mainRef.current.querySelectorAll("[data-snap-section]")
      );
      const medias = Array.from(
        mainRef.current.querySelectorAll("[data-media]")
      );

      medias.forEach((media, index) => {
        const isLast = index === medias.length - 1;

        gsap.fromTo(
          media,
          { y: "-100vh" },
          {
            y: isLast ? "0vh" : "100vh",
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: projectSection[index],
              start: "top bottom",
              end: isLast ? "bottom bottom" : "bottom top",
              scrub: true,
            },
          }
        );
      });

    });

    return () => {
      mm.revert(); // 🧹 Clean up GSAP animations when component unmounts
    };
  }, { scope: mainRef });

  return (
    <main ref={mainRef}>
      {projectsData.map((project, index) => (
        <Fragment key={index}>
          <ProjectMedia project={project} />
        </Fragment>
      ))}
    </main>
  );
};

export default ProjectContainer;
