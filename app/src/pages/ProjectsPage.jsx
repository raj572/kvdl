import React from 'react'
import TextScroll from '../components/common/TextScroll'
import ProjectsSection from '../components/project-page/ProjectsSection'

const Projects = () => {
  return (
    <div className="project-page min-h-dvh">

      {/* STICKY TOP SECTION */}
      <div className="sticky top-0 z-10 w-full ">
        <TextScroll 
          text="Projects"
          repeat={6}
          duration={100}
          className='pt-24 text-5xl md:pt-40 md:text-7xl lg:text-9xl'
        />
      </div>

      {/* CONTENT BELOW */}
      <div className="projects-hero min-h-dvh bg-background relative z-20">
        <ProjectsSection/>
      </div>

    </div>
  )
}

export default Projects
