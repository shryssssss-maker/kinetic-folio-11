import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
interface HeroProps {
  onMenuClick: () => void;
  onThemeToggle: () => void;
}
const Hero = ({
  onMenuClick,
  onThemeToggle
}: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between">
        <div className={`text-2xl font-display transition-all duration-1000 text-glow-hover ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          Portfolio
        </div>
        <div className="flex items-center gap-8">
          <button onClick={onThemeToggle} className={`text-sm tracking-wider uppercase hover:text-primary transition-colors text-glow-hover ${isVisible ? "opacity-100" : "opacity-0"}`} style={{
          transitionDelay: "200ms"
        }}>
            Bored?
          </button>
          <Button variant="ghost" size="sm" onClick={onMenuClick} className={`text-sm tracking-wider uppercase hover:text-primary transition-all text-glow-hover ${isVisible ? "opacity-100" : "opacity-0"}`} style={{
          transitionDelay: "400ms"
        }}>
            Menu
          </Button>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 text-center px-4">
        <div className="space-y-8">
          {/* Main title with staggered animation */}
          <h1 className={`text-8xl md:text-[12rem] lg:text-[16rem] font-display font-light tracking-tight transition-all duration-1500 text-glow-hover-accent ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{
          transitionDelay: "600ms"
        }}>Shreyas</h1>
          
          {/* Subtitle */}
          <p className={`text-lg md:text-xl tracking-[0.3em] uppercase text-muted-foreground transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
          transitionDelay: "1000ms"
        }}>BTECH 1ST YEAR STUDENT</p>
          
          {/* Tagline */}
          <p className={`max-w-2xl mx-auto text-base md:text-lg text-foreground/80 leading-relaxed transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
          transitionDelay: "1200ms"
        }}>Manipal university jaipur</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{
      transitionDelay: "1400ms"
    }}>
        
      </div>
    </section>;
};
export default Hero;
