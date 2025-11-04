import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import MenuOverlay from "@/components/MenuOverlay";
const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"default" | "alternate">("default");
  useEffect(() => {
    if (theme === "alternate") {
      document.documentElement.setAttribute("data-theme", "alternate");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme(prev => prev === "default" ? "alternate" : "default");
  };
  return <div className="relative">
      <Hero onMenuClick={() => setIsMenuOpen(true)} onThemeToggle={toggleTheme} />
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects className="rounded-lg" />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>;
};
export default Index;