import React from 'react'
import SectionHeader from '../common/SectionHeader'
import ProjectContainer from '../common/ProjectContainer'

const ProjectSection = () => {
  return (
    <div>
        {/* HEADING */}
       <SectionHeader
        title="Projects"
        linkText="Ongoing Projects"
        linkTo="/projects"
        description="Explore a curated selection of our featured work, crafted with
              precision, creativity, and a deep understanding of design and
              comfort"
        
        />

        <ProjectContainer/>
    </div>
  )
}

export default ProjectSection