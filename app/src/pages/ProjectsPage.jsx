import { useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import ProjectsSection from '../components/project-page/ProjectsSection';

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="project-page min-h-dvh bg-background text-foreground pt-[70px] md:pt-[85px]">
      <PageHeader
        badge="Portfolio"
        title="Our Projects"
        description="Discover our collection of landmark residential developments crafted with precision, luxury, and timeless architectural excellence."
        breadcrumb={[
          { label: 'Home', link: '/' },
          { label: 'Projects' }
        ]}
      />

      {/* CONTENT BELOW */}
      <div className="projects-content min-h-[60vh] bg-background relative z-20 px-4 md:px-8 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <ProjectsSection />
        </div>
      </div>
    </div>
  );
};

export default Projects;

