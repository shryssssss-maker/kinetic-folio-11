import { useState, useRef, useEffect } from 'react';

interface GlowTextProps {
  text: string;
  className?: string;
  glowType?: 'primary' | 'accent' | 'subtle';
}

const GlowText = ({ text, className = '', glowType = 'primary' }: GlowTextProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && isHovering) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  const getGlowIntensity = (index: number) => {
    if (!isHovering || !charRefs.current[index]) return 0;

    const charElement = charRefs.current[index];
    if (!charElement) return 0;

    const rect = charElement.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return 0;

    const charCenterX = rect.left - containerRect.left + rect.width / 2;
    const charCenterY = rect.top - containerRect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - charCenterX, 2) + 
      Math.pow(mousePos.y - charCenterY, 2)
    );

    // Maximum distance for the wave effect (in pixels)
    const maxDistance = 150;
    const intensity = Math.max(0, 1 - distance / maxDistance);
    
    return intensity;
  };

  const getGlowStyle = (intensity: number) => {
    if (intensity === 0) return {};

    const colors = {
      primary: {
        main: 'hsl(var(--primary))',
        glow1: `hsl(var(--primary) / ${0.6 * intensity})`,
        glow2: `hsl(var(--primary) / ${0.4 * intensity})`,
        glow3: `hsl(var(--primary) / ${0.2 * intensity})`,
      },
      accent: {
        main: 'hsl(var(--accent))',
        glow1: `hsl(var(--accent) / ${0.8 * intensity})`,
        glow2: `hsl(var(--accent) / ${0.5 * intensity})`,
        glow3: `hsl(var(--accent) / ${0.3 * intensity})`,
      },
      subtle: {
        main: 'hsl(var(--foreground))',
        glow1: `hsl(var(--foreground) / ${0.5 * intensity})`,
        glow2: `hsl(var(--foreground) / ${0.3 * intensity})`,
        glow3: `hsl(var(--foreground) / ${0.15 * intensity})`,
      },
    };

    const colorSet = colors[glowType];

    return {
      textShadow: `
        0 0 ${10 * intensity}px ${colorSet.glow1},
        0 0 ${20 * intensity}px ${colorSet.glow2},
        0 0 ${40 * intensity}px ${colorSet.glow3},
        0 0 ${60 * intensity}px ${colorSet.glow3}
      `,
      color: intensity > 0.3 ? colorSet.main : undefined,
      transform: `scale(${1 + intensity * 0.15}) translateY(${-intensity * 2}px)`,
    };
  };

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {text.split('').map((char, index) => {
        const intensity = getGlowIntensity(index);
        const glowStyle = getGlowStyle(intensity);

        return (
          <span
            key={`${char}-${index}`}
            ref={(el) => (charRefs.current[index] = el)}
            className="inline-block transition-all duration-300 ease-out"
            style={{
              display: char === ' ' ? 'inline' : 'inline-block',
              ...glowStyle,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </span>
  );
};

export default GlowText;
