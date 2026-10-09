import React, { useEffect, useState } from 'react';
import { Language } from '../types';

interface PreloaderProps {
  language: Language;
  onFinish?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ language, onFinish }) => {
  const [phase, setPhase] = useState<'enter' | 'reveal' | 'exit' | 'done'>('enter');

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      onFinish?.();
      return;
    }

    const t1 = setTimeout(() => setPhase('reveal'), 250);
    const t2 = setTimeout(() => setPhase('exit'), 1300);
    const t3 = setTimeout(() => {
      setPhase('done');
      onFinish?.();
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#171916] flex flex-col items-center justify-center transition-opacity duration-500 ease-out select-none px-6 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center max-w-md">
        {/* Main Wordmark with masked fade-rise */}
        <div className="overflow-hidden mb-3">
          <h1
            className={`font-serif text-4xl sm:text-6xl text-[#F3F0E8] font-normal tracking-[0.2em] uppercase transition-all duration-700 ease-out ${
              phase !== 'enter' ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            ABOUT US
          </h1>
        </div>

        {/* Descriptor */}
        <p
          className={`font-sans text-[11px] sm:text-xs tracking-[0.38em] uppercase text-[#B49A68] font-medium transition-all duration-500 delay-150 ease-out ${
            phase !== 'enter' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          {language === 'hi' ? 'पुरुष और बच्चों का स्टोर' : "THE MEN'S & KIDS STORE"}
        </p>

        {/* Thin Antique Brass separator line expanding horizontally */}
        <div className="my-6 mx-auto h-[1px] bg-[#B49A68]/30 max-w-[220px] overflow-hidden relative">
          <div
            className={`h-full bg-[#B49A68] transition-all duration-700 ease-in-out ${
              phase !== 'enter' ? 'w-full' : 'w-0'
            }`}
          />
        </div>

        {/* Small location & heritage label */}
        <div
          className={`text-[10px] tracking-[0.45em] uppercase text-[#DED6C8]/80 font-sans transition-all duration-500 delay-300 ease-out ${
            phase !== 'enter' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {language === 'hi' ? 'जबलपुर · स्थापना 2011' : 'JABALPUR · EST. 2011'}
        </div>
      </div>
    </div>
  );
};

