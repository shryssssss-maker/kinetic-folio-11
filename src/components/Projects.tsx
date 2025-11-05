import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const projects = [
  {
    id: 1,
    title: "SIH Project – AI Dropout Predictor & Preventor",
    description: "An AI-powered system designed to predict and prevent student dropouts using machine learning algorithms and data analysis.",
    fullDescription: "This project was developed for the Smart India Hackathon (SIH). It uses machine learning models to analyze various student data points including attendance, academic performance, socio-economic factors, and behavioral patterns to predict dropout risk. The system provides early warnings to educators and suggests personalized intervention strategies to help at-risk students stay in school.",
    tech: ["Python", "Machine Learning", "TensorFlow", "React"],
    image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=500,height=500/event-covers/ic/e3857230-b3bf-4c9d-a551-88999c6ca6d1.png",
  },
  {
    id: 2,
    title: "Hela – DApp Deployment",
    description: "A decentralized application deployment platform built on blockchain technology for seamless smart contract integration.",
    fullDescription: "Hela is a comprehensive DApp deployment platform that simplifies the process of launching decentralized applications. It provides developers with tools for smart contract deployment, blockchain integration, and distributed storage solutions. The platform supports multiple blockchain networks and offers intuitive interfaces for managing decentralized infrastructure.",
    tech: ["Blockchain", "Smart Contracts", "Web3.js", "React"],
    image: "https://helalabs.com/wp-content/uploads/2023/07/previewLink.png",
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
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
              onClick={() => setSelectedProject(project)}
              className={`group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Project Image */}
              <div className="aspect-video bg-muted relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-700" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-display group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
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

        {/* Project Details Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-3xl font-display mb-4">
                {selectedProject?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="aspect-video bg-muted relative overflow-hidden rounded-lg">
                <img
                  src={selectedProject?.image}
                  alt={selectedProject?.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              <p className="text-foreground/80 leading-relaxed text-lg">
                {selectedProject?.fullDescription}
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedProject?.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm px-4 py-2 bg-secondary rounded-full text-muted-foreground uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;
