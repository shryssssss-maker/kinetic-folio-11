import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const contactLinks = [
  { label: "Email", href: "#contact-email" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shreyas-singh-bbbb20384/" },
  { label: "Github", href: "https://github.com/shryssssss-maker" },
  { label: "Twitter", href: "https://x.com/shrysss3" },
];

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const handleNavigate = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.open(href, "_blank");
    }
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-accent transition-all duration-700 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-8">
          <div className="text-2xl font-display text-accent-foreground text-glow-hover">Portfolio</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-accent-foreground hover:text-accent-foreground/80"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-2xl grid md:grid-cols-2 gap-16">
            {/* Main navigation */}
            <nav className="space-y-6">
              {menuItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigate(item.href)}
                  className={`block text-left text-4xl md:text-5xl font-display text-accent-foreground hover:opacity-70 transition-all duration-500 text-glow-hover-accent ${
                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${100 + index * 100}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Contact links */}
            <div 
              className={`space-y-6 transition-all duration-700 ${
                isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <h3 className="text-sm uppercase tracking-wider text-accent-foreground/60 mb-8">
                Contact
              </h3>
              {contactLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavigate(link.href)}
                  className="block text-left text-lg text-accent-foreground hover:opacity-70 transition-opacity uppercase tracking-wider text-glow-hover"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
