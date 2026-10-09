import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackCategory?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Bespoke Collection',
  fallbackCategory = 'The Men\'s & Kids Store',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div className={`relative flex flex-col justify-end p-6 bg-gradient-to-br from-[#1f1b16] via-[#141414] to-[#0a0a0a] border border-[#c8a44d]/20 overflow-hidden ${className}`}>
        {/* Subtle decorative geometric lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c8a44d_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-4 right-4 text-[#c8a44d]/40">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="relative z-10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a44d] font-sans font-medium block mb-1">
            {fallbackCategory}
          </span>
          <h4 className="font-serif text-lg text-[#f4efe6] font-normal tracking-wide">
            {fallbackTitle}
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#161616] animate-pulse z-0" />
      )}
      <img
        src={src}
        alt={alt || fallbackTitle}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        {...props}
      />
    </div>
  );
};
