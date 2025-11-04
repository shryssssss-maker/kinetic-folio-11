import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const Contact = () => {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-24"
    >
      <div className="max-w-5xl w-full">
        <div className="text-center space-y-12">
          <h2 
            className={`text-5xl md:text-7xl font-display font-light transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            Let's Connect
          </h2>

          <p 
            className={`text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          {/* Contact links */}
          <div 
            className={`flex flex-col items-center gap-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <a
              href="mailto:your.email@example.com"
              className="group flex items-center gap-3 text-xl hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-body">your.email@example.com</span>
            </a>

            <div className="flex items-center gap-6 pt-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border hover:border-primary hover:bg-secondary transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border hover:border-primary hover:bg-secondary transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-border hover:border-primary hover:bg-secondary transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer */}
          <div 
            className={`pt-16 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <button
              onClick={scrollToTop}
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              Back to Top
            </button>
            <p className="text-sm text-muted-foreground">
              © 2024 All rights reserved
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
