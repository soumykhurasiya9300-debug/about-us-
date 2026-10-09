import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const loop = () => {
      setRingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const galleryCard = target.closest('[data-cursor="view"]') || target.closest('[data-cursor="explore"]');
      if (galleryCard) {
        const text = galleryCard.getAttribute('data-cursor') === 'explore' ? 'EXPLORE' : 'VIEW';
        setCursorText(text);
        setIsHovered(true);
        return;
      }

      setCursorText(null);
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central pointer dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-200 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          width: cursorText ? 0 : 5,
          height: cursorText ? 0 : 5,
          backgroundColor: '#B49A68',
        }}
      />
      {/* Follower ring or textual badge */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-[width,height,background-color,border-color,opacity,border-radius] duration-200 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 font-sans font-medium text-[9px] tracking-[0.25em]"
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
          width: cursorText ? 64 : isHovered ? 40 : 26,
          height: cursorText ? 26 : isHovered ? 40 : 26,
          borderRadius: cursorText ? 13 : 9999,
          borderColor: cursorText ? 'transparent' : isHovered ? 'rgba(180, 154, 104, 0.7)' : 'rgba(180, 154, 104, 0.35)',
          borderWidth: cursorText ? 0 : '1px',
          backgroundColor: cursorText ? '#171916' : isHovered ? 'rgba(38, 61, 50, 0.15)' : 'transparent',
          color: '#F3F0E8',
          boxShadow: cursorText ? '0 4px 14px rgba(0,0,0,0.3), 0 0 0 1px rgba(180, 154, 104, 0.4)' : 'none',
        }}
      >
        {cursorText && <span>{cursorText}</span>}
      </div>
    </>
  );
};

