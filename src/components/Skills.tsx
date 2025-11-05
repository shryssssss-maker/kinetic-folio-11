import { useEffect, useRef, useState } from "react";
const skills = [{
  name: "React",
  level: "Intermediate"
}, {
  name: "Arduino",
  level: "Learning"
}, {
  name: "MySQL",
  level: "Intermediate"
}, {
  name: "Python",
  level: "Beginner"
}, {
  name: "HTML/CSS",
  level: "Beginner"
}, {
  name: "Raspberry pi",
  level: "Learning"
}, {
  name: "Git",
  level: "Beginner"
}, {
  name: "UI/UX Design",
  level: "Intermediate"
}, {
  name: "Figma",
  level: "Beginner"
}, {
  name: "Lovable",
  level: "Intermediate"
}, {
  name: "Cursor",
  level: "Intermediate"
}, {
  name: "Supabase",
  level: "Beginner"
}, {
  name: "Tinkercad",
  level: "Beginner"
}];
const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rotationRef = useRef(0);
  const initialRotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, {
      threshold: [0, 0.2, 0.5, 0.8, 1]
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (cylinderRef.current) {
      observer.observe(cylinderRef.current);
    }

    // Handle mouse down on cylinder for drag-to-spin
    const handleMouseDown = (e: MouseEvent) => {
      if (!cylinderRef.current) return;
      
      const rect = cylinderRef.current.getBoundingClientRect();
      const isInsideCylinder = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;
      
      if (isInsideCylinder) {
        isDraggingRef.current = true;
        setIsDragging(true);
        lastMouseXRef.current = e.clientX;
        initialRotationRef.current = rotationRef.current;
        e.preventDefault();
      }
    };

    // Handle mouse move for horizontal dragging to spin cylinder
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const deltaX = e.clientX - lastMouseXRef.current;
        
        // Only rotate if horizontal movement is significant
        if (Math.abs(deltaX) > 2) {
          // Convert horizontal mouse movement to rotation
          rotationRef.current += deltaX * 0.8;
          setRotation(rotationRef.current);
        }
        
        lastMouseXRef.current = e.clientX;
      }
    };

    // Handle mouse up to stop dragging
    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    // Handle mouse leave to stop dragging if cursor leaves window
    const handleMouseLeave = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      
      isDraggingRef.current = false;
    };
  }, []);

  // Separate effect to attach touch listeners to cylinder element for mobile support
  useEffect(() => {
    if (!cylinderRef.current) return;

    // Handle touch start on cylinder for drag-to-spin (mobile)
    const handleCylinderTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      
      const touch = e.touches[0];
      isDraggingRef.current = true;
      setIsDragging(true);
      lastMouseXRef.current = touch.clientX;
      initialRotationRef.current = rotationRef.current;
      e.preventDefault();
    };

    // Handle touch move for horizontal dragging to spin cylinder (mobile)
    const handleCylinderTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length === 0) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastMouseXRef.current;
      
      // Only rotate if horizontal movement is significant
      if (Math.abs(deltaX) > 2) {
        // Convert horizontal touch movement to rotation
        rotationRef.current += deltaX * 0.8;
        setRotation(rotationRef.current);
        // Prevent scrolling only when actively rotating
        e.preventDefault();
      }
      
      lastMouseXRef.current = touch.clientX;
    };

    // Handle touch end to stop dragging (mobile)
    const handleCylinderTouchEnd = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    // Handle touch cancel (when touch is interrupted)
    const handleCylinderTouchCancel = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    const cylinder = cylinderRef.current;
    cylinder.addEventListener("touchstart", handleCylinderTouchStart, { passive: false });
    cylinder.addEventListener("touchmove", handleCylinderTouchMove, { passive: false });
    cylinder.addEventListener("touchend", handleCylinderTouchEnd);
    cylinder.addEventListener("touchcancel", handleCylinderTouchCancel);

    return () => {
      cylinder.removeEventListener("touchstart", handleCylinderTouchStart);
      cylinder.removeEventListener("touchmove", handleCylinderTouchMove);
      cylinder.removeEventListener("touchend", handleCylinderTouchEnd);
      cylinder.removeEventListener("touchcancel", handleCylinderTouchCancel);
    };
  }, []);

  const handleScrollToExplore = () => {
    // Scroll to next section
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const projectsTop = projectsSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: projectsTop, behavior: "smooth" });
    }
  };
  return <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      <div className="max-w-6xl w-full">
        <h2 className={`text-5xl md:text-7xl font-display font-light text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          Skills & Technologies
        </h2>

        {/* 3D Cylinder effect */}
        <div ref={cylinderRef} className="relative h-[400px] flex items-center justify-center perspective-1000 select-none" style={{ userSelect: "none", cursor: isDragging ? "grabbing" : "grab", touchAction: "pan-x pan-y" }}>
          <div className="relative w-full max-w-md h-full" style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)"
        }}>
            {skills.map((skill, index) => {
            const angle = 360 / skills.length * index;
            const radius = 280;
            return <div key={skill.name} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24" style={{
              transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              transformStyle: "preserve-3d"
            }}>
                  <div className="w-full h-full bg-card border border-border p-6 backdrop-blur-sm flex flex-col justify-center items-center transition-all hover:bg-card/80 hover:border-primary/50 rounded-sm my-0 px-0 py-0 mx-[150px]">
                    <h3 className="text-xl font-display mb-2">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      {skill.level}
                    </p>
                  </div>
                </div>;
          })}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            ref={buttonRef}
            onClick={handleScrollToExplore}
            className={`px-8 py-3 border border-border hover:border-primary hover:bg-secondary transition-all duration-300 uppercase tracking-wider text-sm font-display ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              transitionDelay: "400ms"
            }}
          >
            Scroll to explore
          </button>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>;
};
export default Skills;
