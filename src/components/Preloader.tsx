import React, { useEffect, useState } from 'react';
import { Language } from '../types';

interface PreloaderProps {
  language: Language;
  onFinish?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ language, onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 22) + 10;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            onFinish?.();
          }, 350);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onFinish]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#0d0d0d] flex flex-col items-center justify-center transition-opacity duration-700 select-none ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="overflow-hidden flex text-3xl sm:text-5xl md:text-6xl font-serif text-[#f4efe6] tracking-[0.28em] font-light">
        {['A', 'B', 'O', 'U', 'T', '\u00A0', 'U', 'S'].map((char, index) => (
          <span
            key={index}
            className="inline-block animate-[bounce_1s_ease-out] transition-transform duration-700"
            style={{
              animationDelay: `${index * 60}ms`,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Progress Line */}
      <div className="w-48 sm:w-64 h-[1px] bg-[#f4efe6]/15 mt-8 overflow-hidden relative">
        <div
          className="h-full bg-[#c8a44d] transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#c9c3b7] font-sans">
        {language === 'hi' ? 'स्थापना 2011 · जबलपुर' : 'Est. 2011 · Jabalpur'}
      </div>
    </div>
  );
};
