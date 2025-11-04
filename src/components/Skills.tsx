import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React", level: "Intermediate" },
  { name: "TypeScript", level: "Learning" },
  { name: "JavaScript", level: "Intermediate" },
  { name: "Python", level: "Beginner" },
  { name: "HTML/CSS", level: "Advanced" },
  { name: "Node.js", level: "Learning" },
  { name: "Git", level: "Intermediate" },
  { name: "UI/UX Design", level: "Intermediate" },
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef(0);

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

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate rotation based on scroll position within section
      if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
        const scrollProgress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
        scrollRef.current = scrollProgress * 360;
        setRotation(scrollRef.current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="max-w-6xl w-full">
        <h2 
          className={`text-5xl md:text-7xl font-display font-light text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          Skills & Technologies
        </h2>

        {/* 3D Cylinder effect */}
        <div className="relative h-[400px] flex items-center justify-center perspective-1000">
          <div 
            className="relative w-full max-w-md h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotation}deg)`,
              transition: "transform 0.1s linear",
            }}
          >
            {skills.map((skill, index) => {
              const angle = (360 / skills.length) * index;
              const radius = 280;
              
              return (
                <div
                  key={skill.name}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="w-full h-full bg-card border border-border rounded-lg p-6 backdrop-blur-sm flex flex-col justify-center items-center transition-all hover:bg-card/80 hover:border-primary/50">
                    <h3 className="text-xl font-display mb-2">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      {skill.level}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p 
          className={`text-center text-muted-foreground mt-12 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          Scroll to explore
        </p>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Skills;
