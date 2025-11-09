import { useState, useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import MenuOverlay from "@/components/MenuOverlay";

type Theme = "default" | "alternate" | "theme3" | "theme4";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("default");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [glitterParticles, setGlitterParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number; createdAt: number }>>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Add fade animation class
    setIsTransitioning(true);
    document.body.classList.add("theme-transitioning");

    // Remove data-theme for default, set for others
    if (theme === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }

    // Remove animation class after transition
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      document.body.classList.remove("theme-transitioning");
    }, 400);

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    const themes: Theme[] = ["default", "alternate", "theme3", "theme4"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  useEffect(() => {
    let animationFrameId: number;
    let lastParticleTime = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth updates
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        // Check if hovering over interactive elements
        const target = e.target as HTMLElement;
        const computedStyle = window.getComputedStyle(target);
        const isInteractive = 
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.closest('[role="button"]') !== null ||
          target.closest('[onclick]') !== null ||
          computedStyle.cursor === 'pointer' ||
          target.style.cursor === 'pointer';
        
        setIsHoveringInteractive(isInteractive);

        // Create glitter particles when not hovering interactive elements
        if (!isInteractive) {
          const now = Date.now();
          if (now - lastParticleTime > 50) { // Create particles every 50ms
            lastParticleTime = now;
            
            // Create 2-3 new glitter particles
            const particleCount = Math.floor(Math.random() * 2) + 2;
            const newParticles = Array.from({ length: particleCount }, () => {
              const angle = Math.random() * Math.PI * 2;
              const distance = 20 + Math.random() * 30;
              const x = e.clientX + Math.cos(angle) * distance;
              const y = e.clientY + Math.sin(angle) * distance;
              
              return {
                id: particleIdRef.current++,
                x,
                y,
                delay: Math.random() * 0.2,
                size: 4 + Math.random() * 6,
                createdAt: Date.now(),
              };
            });

            setGlitterParticles(prev => {
              const combined = [...prev, ...newParticles];
              // Keep only last 30 particles for performance
              return combined.slice(-30);
            });
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Remove old particles after animation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitterParticles(prev => prev.filter(p => {
        // Particles fade after 1 second
        return Date.now() - p.createdAt < 1000;
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <div className="relative">
      {/* Glittery Animation Effect */}
      {!isHoveringInteractive && glitterParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: 'translate(-50%, -50%)',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `glitter ${0.8 + particle.delay}s ease-out forwards`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(45deg, hsl(var(--secondary) / 0.9), hsl(var(--secondary) / 0.6), hsl(var(--secondary) / 0.9))`,
              borderRadius: '50%',
              boxShadow: `
                0 0 ${particle.size}px hsl(var(--secondary) / 0.8),
                0 0 ${particle.size * 2}px hsl(var(--secondary) / 0.4),
                inset 0 0 ${particle.size / 2}px hsl(var(--secondary) / 1)
              `,
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      ))}

      <style>{`
        @keyframes glitter {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2) rotate(90deg);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3) rotate(360deg);
          }
        }
      `}</style>
      <Hero onMenuClick={() => setIsMenuOpen(true)} onThemeToggle={toggleTheme} />
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>;
};
export default Index;
