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
  const [isSectionActive, setIsSectionActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rotationRef = useRef(0);
  const scrollLockedRef = useRef(false);
  const spinCountRef = useRef(0);
  const initialRotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);

  useEffect(() => {
    const checkLockCondition = () => {
      if (!sectionRef.current || !cylinderRef.current) return;
      
      const cylinderRect = cylinderRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowCenter = windowHeight / 2;
      
      // Check if cylinder is centered in the middle of the screen
      const cylinderCenter = cylinderRect.top + cylinderRect.height / 2;
      const isCentered = Math.abs(cylinderCenter - windowCenter) < 150; // 150px tolerance
      
      // Lock only when cylinder is centered and we haven't exceeded 2 spins
      const shouldLock = isCentered && spinCountRef.current < 2 && !scrollLockedRef.current;
      
      if (shouldLock) {
        // Only lock if not already locked to prevent re-locking
        if (!scrollLockedRef.current) {
          setIsSectionActive(true);
          scrollLockedRef.current = true;
          // Reset spin tracking when lock activates
          spinCountRef.current = 0;
          initialRotationRef.current = rotationRef.current;
          const scrollY = window.scrollY;
          
          // Lock scroll position - we'll allow vertical scroll via wheel when not dragging
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          document.body.style.top = `-${scrollY}px`;
          document.body.style.width = "100%";
          
          // Add cursor style to cylinder
          if (cylinderRef.current) {
            cylinderRef.current.style.cursor = "grab";
          }
        }
      } else if (!isCentered && scrollLockedRef.current) {
        // Unlock if cylinder is no longer centered
        const lockedScrollTop = document.body.style.top;
        let currentScroll = 0;
        
        if (lockedScrollTop) {
          const match = lockedScrollTop.match(/-?(\d+)px/);
          if (match) {
            currentScroll = parseInt(match[1]);
          }
        }
        
        scrollLockedRef.current = false;
        setIsSectionActive(false);
        spinCountRef.current = 0; // Reset spin count
        
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        
        // Restore scroll position smoothly
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (currentScroll > 0) {
              window.scrollTo({ top: currentScroll, behavior: "auto" });
            }
          });
        });
      } else if (spinCountRef.current >= 2 && scrollLockedRef.current) {
        // Unlock after 2 spins (fallback check)
        const lockedScrollTop = document.body.style.top;
        let currentScroll = 0;
        
        if (lockedScrollTop) {
          const match = lockedScrollTop.match(/-?(\d+)px/);
          if (match) {
            currentScroll = parseInt(match[1]);
          }
        }
        
        scrollLockedRef.current = false;
        setIsSectionActive(false);
        
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        
        // Restore scroll position smoothly
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (currentScroll > 0) {
              window.scrollTo({ top: currentScroll, behavior: "auto" });
            }
          });
        });
      }
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
      checkLockCondition();
    }, {
      threshold: [0, 0.2, 0.5, 0.8, 1]
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (cylinderRef.current) {
      observer.observe(cylinderRef.current);
    }

    // Check on scroll for responsive locking/unlocking
    const handleScroll = () => {
      checkLockCondition();
    };

    // Handle mouse down on cylinder for drag-to-spin
    const handleMouseDown = (e: MouseEvent) => {
      if (!cylinderRef.current) return;
      
      const rect = cylinderRef.current.getBoundingClientRect();
      const isInsideCylinder = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;
      
      if (isInsideCylinder && scrollLockedRef.current && spinCountRef.current < 2) {
        isDraggingRef.current = true;
        setIsDragging(true);
        lastMouseXRef.current = e.clientX;
        initialRotationRef.current = rotationRef.current;
        e.preventDefault();
        // Change cursor to indicate dragging
        document.body.style.cursor = "grabbing";
      }
    };

    // Handle mouse move for horizontal dragging to spin cylinder
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current && scrollLockedRef.current && spinCountRef.current < 2) {
        const deltaX = e.clientX - lastMouseXRef.current;
        
        // Only rotate if horizontal movement is significant (prevents vertical scroll interference)
        if (Math.abs(deltaX) > 2) {
          // Convert horizontal mouse movement to rotation
          // More horizontal movement = more rotation
          rotationRef.current += deltaX * 0.8;
          setRotation(rotationRef.current);
          
          // Track cumulative rotation from initial position
          const totalRotation = Math.abs(rotationRef.current - initialRotationRef.current);
          
          // Count full rotations (360 degrees = 1 spin)
          const newSpinCount = Math.floor(totalRotation / 360);
          
          if (newSpinCount > spinCountRef.current) {
            spinCountRef.current = newSpinCount;
            
            // Unlock after 2 spins
            if (spinCountRef.current >= 2) {
              // Get the locked scroll position before unlocking
              const lockedScrollTop = document.body.style.top;
              let currentScroll = 0;
              
              if (lockedScrollTop) {
                const match = lockedScrollTop.match(/-?(\d+)px/);
                if (match) {
                  currentScroll = parseInt(match[1]);
                }
              }
              
              // Unlock scrolling first
              scrollLockedRef.current = false;
              setIsSectionActive(false);
              isDraggingRef.current = false;
              setIsDragging(false);
              
              // Remove lock styles
              document.body.style.position = "";
              document.body.style.top = "";
              document.body.style.width = "";
              document.body.style.overflow = "";
              document.body.style.cursor = "";
              
              // Use double requestAnimationFrame to ensure smooth transition
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  if (currentScroll > 0) {
                    window.scrollTo({ top: currentScroll, behavior: "auto" });
                  }
                });
              });
            }
          }
        }
        
        lastMouseXRef.current = e.clientX;
      }
    };

    // Handle mouse up to stop dragging
    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        document.body.style.cursor = "";
      }
    };

    // Handle mouse leave to stop dragging if cursor leaves window
    const handleMouseLeave = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        document.body.style.cursor = "";
      }
    };

    // Handle wheel events for vertical scrolling when not dragging
    const handleWheel = (e: WheelEvent) => {
      // If locked and dragging, prevent vertical scroll
      if (isDraggingRef.current && scrollLockedRef.current) {
        e.preventDefault();
        return;
      }
      
      // If locked but not dragging, allow vertical scroll
      if (scrollLockedRef.current && !isDraggingRef.current) {
        const lockedScrollTop = document.body.style.top;
        let currentScroll = 0;
        
        if (lockedScrollTop) {
          const match = lockedScrollTop.match(/-?(\d+)px/);
          if (match) {
            currentScroll = parseInt(match[1]);
          }
        }
        
        // Temporarily unlock to allow vertical scroll
        const deltaY = e.deltaY;
        const newScroll = Math.max(0, currentScroll + deltaY);
        
        // Remove lock styles temporarily
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        
        // Scroll to new position
        window.scrollTo({ top: newScroll, behavior: "auto" });
        
        // Re-check lock condition after scroll
        requestAnimationFrame(() => {
          checkLockCondition();
        });
      }
    };

    // Handle mouse enter/leave on cylinder for cursor feedback
    const handleCylinderMouseEnter = () => {
      if (scrollLockedRef.current && spinCountRef.current < 2 && !isDraggingRef.current) {
        if (cylinderRef.current) {
          cylinderRef.current.style.cursor = "grab";
        }
      }
    };

    const handleCylinderMouseLeave = () => {
      if (cylinderRef.current && !isDraggingRef.current) {
        cylinderRef.current.style.cursor = "";
      }
    };

    // Initial check
    checkLockCondition();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Add cursor feedback to cylinder
    if (cylinderRef.current) {
      cylinderRef.current.addEventListener("mouseenter", handleCylinderMouseEnter);
      cylinderRef.current.addEventListener("mouseleave", handleCylinderMouseLeave);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("wheel", handleWheel);
      
      if (cylinderRef.current) {
        cylinderRef.current.removeEventListener("mouseenter", handleCylinderMouseEnter);
        cylinderRef.current.removeEventListener("mouseleave", handleCylinderMouseLeave);
      }
      
      // Ensure cleanup on unmount
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.cursor = "";
      if (cylinderRef.current) {
        cylinderRef.current.style.cursor = "";
      }
      scrollLockedRef.current = false;
      isDraggingRef.current = false;
    };
  }, [isSectionActive]);

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
        <div ref={cylinderRef} className="relative h-[400px] flex items-center justify-center perspective-1000 select-none" style={{ userSelect: "none", cursor: isSectionActive && spinCountRef.current < 2 ? "grab" : "default" }}>
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