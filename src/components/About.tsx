import { useEffect, useRef, useState } from "react";
const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, {
      threshold: 0.3
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Title */}
          <div>
            <h2 className={`text-6xl md:text-8xl font-display font-light transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
              About Me
            </h2>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <p className={`text-lg leading-relaxed text-foreground/90 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`} style={{
            transitionDelay: "200ms"
          }}>Hey, I’m Shreyas Singh , a curious mind who loves exploring how things work and finding meaning in what I build.
I’m not chasing perfection just learning, creating, and following curiosity wherever it leads.</p>
            <p className={`text-lg leading-relaxed text-foreground/70 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`} style={{
            transitionDelay: "400ms"
          }}>
          </p>
            <div className={`pt-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`} style={{
            transitionDelay: "600ms"
          }}>
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                Currently learning
              </span>
              <p className="mt-2 text-lg text-foreground/80">C++ • front end • backend • Python</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;