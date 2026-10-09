import React, { useEffect } from 'react';
import { X, MessageCircle, Sparkles } from 'lucide-react';
import { LookbookItem, Language } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface LightboxModalProps {
  item: LookbookItem | null;
  language: Language;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  language,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const title = language === 'hi' ? item.titleHi : item.titleEn;
  const description = language === 'hi' ? item.descriptionHi : item.descriptionEn;
  const category = language === 'hi' ? item.categoryHi : item.categoryEn;
  const tag = language === 'hi' ? item.tagHi : item.tagEn;

  const waEnquiryText = encodeURIComponent(
    `Hello About Us Jabalpur, I am interested in "${item.titleEn}" (${item.categoryEn}). Please let me know available sizes and pricing.`
  );
  const waUrl = `https://wa.me/919713102229?text=${waEnquiryText}`;

  return (
    <div
      className="fixed inset-0 z-[9990] bg-[#171916]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#292B27] border border-[#B49A68]/30 rounded overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl animate-[fadeIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded bg-[#171916]/80 text-[#F3F0E8] hover:text-[#B49A68] border border-[#B49A68]/30 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Column */}
        <div className="relative min-h-[320px] md:min-h-[480px] bg-[#171916]">
          <ImageWithFallback
            src={item.imageUrl}
            alt={title}
            fallbackTitle={title}
            fallbackCategory={category}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] tracking-[0.25em] uppercase px-3 py-1 bg-[#171916]/85 backdrop-blur-sm border border-[#B49A68]/40 text-[#B49A68] font-sans font-medium rounded-sm">
              {tag}
            </span>
          </div>
        </div>

        {/* Details Column */}
        <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#292B27] text-[#F3F0E8]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#B49A68] font-sans font-medium mb-2">
              {category}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F3F0E8] font-normal leading-tight mb-4">
              {title}
            </h3>
            <p className="text-sm text-[#DED6C8] font-light leading-relaxed mb-6 font-sans">
              {description}
            </p>

            {/* Spec breakdown */}
            <div className="space-y-3 py-4 border-y border-[#F3F0E8]/10 text-xs font-sans">
              {item.fabric && (
                <div className="flex justify-between items-center text-[#DED6C8]">
                  <span className="uppercase tracking-wider text-[10px] text-[#F3F0E8]/60">
                    {language === 'hi' ? 'फैब्रिक' : 'Fabric Composition'}
                  </span>
                  <span className="text-[#F3F0E8] font-medium">{item.fabric}</span>
                </div>
              )}
              {item.fit && (
                <div className="flex justify-between items-center text-[#DED6C8]">
                  <span className="uppercase tracking-wider text-[10px] text-[#F3F0E8]/60">
                    {language === 'hi' ? 'फिटिंग' : 'Silhouette & Cut'}
                  </span>
                  <span className="text-[#F3F0E8] font-medium">{item.fit}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-[#DED6C8]">
                <span className="uppercase tracking-wider text-[10px] text-[#F3F0E8]/60">
                  {language === 'hi' ? 'उपलब्धता' : 'Availability'}
                </span>
                <span className="text-[#B49A68] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'hi' ? 'मरहटल शोरूम में उपलब्ध' : 'Ready In-Store at Marhatal'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 bg-[#263D32] hover:bg-[#2e4a3d] border border-[#B49A68]/40 text-[#F3F0E8] py-3.5 px-6 rounded font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 shadow-md hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 text-[#B49A68]" />
              <span>{language === 'hi' ? 'व्हाट्सएप पर यह लुक पूछें' : 'Enquire Look on WhatsApp'}</span>
            </a>
            <p className="text-[11px] text-center text-[#DED6C8]/60 mt-3 font-sans">
              {language === 'hi'
                ? 'कस्टम अल्टरेशन और ट्रायल हमारे शोरूम में उपलब्ध है'
                : 'Custom alteration & in-person trials available at our showroom'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
