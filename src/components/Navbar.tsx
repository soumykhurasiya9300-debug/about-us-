import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, Calendar } from 'lucide-react';
import { Language } from '../types';
import { STORE_WHATSAPP_LINK } from '../data/storeData';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenEnquiry,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', labelEn: 'Home', labelHi: 'होम' },
    { href: '#everyday', labelEn: 'Everyday', labelHi: 'रोज़मर्रा' },
    { href: '#occasion', labelEn: 'Occasionwear', labelHi: 'अवसर वस्त्र' },
    { href: '#kids', labelEn: 'Kidswear', labelHi: 'बच्चे' },
    { href: '#gallery', labelEn: 'Looks', labelHi: 'गैलरी' },
    { href: '#showroom', labelEn: 'Showroom', labelHi: 'शोरूम' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-[900] transition-all duration-300 ${
          isScrolled
            ? 'bg-[#171916]/95 border-b border-[#B49A68]/25 py-3.5 backdrop-blur-md shadow-lg'
            : 'bg-[#171916]/80 border-b border-[#F3F0E8]/10 py-4.5 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Pure Typographic Wordmark */}
          <a
            href="#home"
            className="flex flex-col tracking-[0.22em] font-serif text-xl sm:text-2xl text-[#F3F0E8] font-normal whitespace-nowrap shrink-0 group leading-none"
          >
            <span>ABOUT US</span>
            <span className="font-sans text-[9px] tracking-[0.38em] text-[#B49A68] uppercase font-medium mt-1">
              {language === 'hi' ? 'द मेन्स एंड किड्स स्टोर' : "THE MEN'S & KIDS STORE"}
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[12px] uppercase tracking-[0.2em] text-[#DED6C8] shrink-0 font-medium font-sans">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 transition-colors hover:text-[#F3F0E8] group whitespace-nowrap shrink-0"
              >
                <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B49A68] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions & Language Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Language Switcher */}
            <div
              className="flex items-center border border-[#B49A68]/30 rounded p-0.5 text-[11px] font-sans tracking-wider"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-sm transition-all duration-200 whitespace-nowrap shrink-0 ${
                  language === 'en'
                    ? 'bg-[#B49A68] text-[#171916] font-semibold'
                    : 'text-[#DED6C8] hover:text-[#F3F0E8]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1 rounded-sm transition-all duration-200 whitespace-nowrap shrink-0 ${
                  language === 'hi'
                    ? 'bg-[#B49A68] text-[#171916] font-semibold'
                    : 'text-[#DED6C8] hover:text-[#F3F0E8]'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Book Trial / Visit Store Action */}
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="hidden sm:inline-flex items-center gap-2 border border-[#B49A68]/60 hover:border-[#B49A68] text-[#DED6C8] hover:text-[#F3F0E8] hover:bg-[#263D32]/40 px-3.5 py-2 rounded text-xs font-sans uppercase tracking-[0.16em] transition-all duration-200 whitespace-nowrap shrink-0 font-medium"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B49A68]" />
              <span>{language === 'hi' ? 'ट्रायल आरक्षित करें' : 'Book Trial'}</span>
            </button>

            {/* Primary Action: Direct WhatsApp */}
            <a
              href={STORE_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#263D32] hover:bg-[#2e4a3d] border border-[#B49A68]/40 text-[#F3F0E8] px-4 py-2 rounded text-xs font-sans uppercase tracking-[0.16em] font-semibold transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#B49A68]" />
              <span>{language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-[#F3F0E8] hover:text-[#B49A68] transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-[#171916]/98 z-[850] lg:hidden flex flex-col justify-center px-8 transition-all duration-400 ${
          isMobileOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="max-w-md mx-auto w-full flex flex-col gap-5 py-8">
          <div className="text-[#B49A68] text-xs uppercase tracking-[0.3em] font-sans pb-2 border-b border-[#B49A68]/20">
            {language === 'hi' ? 'नेविगेशन' : 'Directory'}
          </div>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="font-serif text-2xl sm:text-3xl text-[#F3F0E8] hover:text-[#B49A68] transition-colors py-2 border-b border-[#F3F0E8]/10"
            >
              {language === 'hi' ? item.labelHi : item.labelEn}
            </a>
          ))}

          <div className="pt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 border border-[#B49A68] text-[#F3F0E8] py-3 rounded text-xs uppercase tracking-[0.2em] font-medium"
            >
              <Calendar className="w-4 h-4 text-[#B49A68]" />
              <span>{language === 'hi' ? 'शोरूम ट्रायल आरक्षित करें' : 'Book Showroom Trial'}</span>
            </button>
            <a
              href={STORE_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#263D32] border border-[#B49A68]/50 text-[#F3F0E8] font-semibold py-3 rounded text-xs uppercase tracking-[0.2em]"
            >
              <MessageCircle className="w-4 h-4 text-[#B49A68]" />
              <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

