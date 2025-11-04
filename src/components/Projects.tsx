import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack online shopping platform with cart functionality and payment integration",
    tech: ["React", "Node.js", "MongoDB"],
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task tracker with real-time updates and team features",
    tech: ["TypeScript", "React", "Firebase"],
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Interactive weather forecasting application with location-based data",
    tech: ["React", "Weather API", "CSS"],
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects and skills with modern design",
    tech: ["React", "Tailwind", "Framer Motion"],
    image: "/placeholder.svg",
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="min-h-screen px-6 md:px-12 py-24"
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          className={`text-5xl md:text-7xl font-display font-light mb-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          Featured Projects
        </h2>
        <p 
          className={`text-lg text-muted-foreground mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          A selection of my recent work
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-display text-foreground/10 group-hover:text-foreground/20 transition-colors">
                    {project.id}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-display group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-foreground/70 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 bg-secondary rounded-full text-muted-foreground uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
