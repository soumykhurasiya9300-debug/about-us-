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
      <div className={`relative flex flex-col justify-end p-6 bg-gradient-to-br from-[#171916] via-[#263D32]/25 to-[#171916] border border-[#B49A68]/25 overflow-hidden ${className}`}>
        {/* Subtle decorative geometric lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#B49A68_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute top-4 right-4 text-[#B49A68]/50">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="relative z-10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B49A68] font-sans font-medium block mb-1">
            {fallbackCategory}
          </span>
          <h4 className="font-serif text-lg text-[#F3F0E8] font-normal tracking-wide">
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
