import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
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
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor="grow"]') ||
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
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-300 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          width: isHovered ? 0 : 7,
          height: isHovered ? 0 : 7,
          backgroundColor: '#c8a44d',
        }}
      />
      {/* Ambient follower ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full transition-[width,height,background-color,border-color,opacity] duration-300 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`,
          width: isHovered ? 76 : 34,
          height: isHovered ? 76 : 34,
          borderColor: isHovered ? '#e0c483' : 'rgba(200, 164, 77, 0.45)',
          borderWidth: '1px',
          backgroundColor: isHovered ? 'rgba(200, 164, 77, 0.12)' : 'transparent',
          opacity: isHovered ? 1 : 0.6,
        }}
      />
    </>
  );
};
