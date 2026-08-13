import BackButton from '../components/common/BackButton'
import TextScroll from '../components/common/TextScroll'
import ProjectsSection from '../components/project-page/ProjectsSection'

const Projects = () => {
  return (
    <div className="project-page min-h-dvh">

      {/* STICKY TOP SECTION */}
      <div className="sticky top-[70px] md:top-[85px] z-10 w-full bg-background mt-[70px] md:mt-[85px]">
        <TextScroll
          text="Projects"
          repeat={24}
          duration={100}
          className="py-2 md:py-3 text-2xl md:text-4xl lg:text-5xl border-y border-foreground"
        />
      </div>

      {/* CONTENT BELOW */}
      <div className="projects-hero min-h-dvh bg-background relative z-20 px-4 md:px-8 lg:px-12 py-6">
        <BackButton className="mb-4" />
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <ProjectsSection />
        </div>
      </div>

    </div>
  )
}

export default Projects
