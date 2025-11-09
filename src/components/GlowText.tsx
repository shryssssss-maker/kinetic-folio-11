interface GlowTextProps {
  text: string;
  className?: string;
  glowType?: 'primary' | 'accent' | 'subtle';
}

const GlowText = ({ text, className = '', glowType = 'primary' }: GlowTextProps) => {
  const glowClass = 
    glowType === 'accent' ? 'text-glow-hover-accent' :
    glowType === 'subtle' ? 'text-glow-hover-subtle' :
    'text-glow-hover';

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={`inline-block ${glowClass}`}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default GlowText;
