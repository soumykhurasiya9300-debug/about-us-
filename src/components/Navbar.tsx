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
      if (window.scrollY > 30) {
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
    { href: '#men', labelEn: "Men's Edit", labelHi: 'पुरुष' },
    { href: '#kids', labelEn: "Kids' Edit", labelHi: 'बच्चे' },
    { href: '#occasion', labelEn: 'Occasionwear', labelHi: 'अवसर वस्त्र' },
    { href: '#gallery', labelEn: 'Lookbook', labelHi: 'गैलरी' },
    { href: '#visit', labelEn: 'Visit Store', labelHi: 'पधारें' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-[900] transition-all duration-400 backdrop-blur-md ${
          isScrolled
            ? 'bg-[#0d0d0d]/92 border-b border-[#f4efe6]/10 py-3 shadow-2xl'
            : 'bg-[#0d0d0d]/75 border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <a
            href="#home"
            className="flex flex-col tracking-[0.24em] font-serif text-xl sm:text-2xl text-[#f4efe6] font-medium whitespace-nowrap shrink-0 group leading-tight"
          >
            <span>ABOUT US</span>
            <span className="font-sans text-[9px] tracking-[0.35em] text-[#c8a44d] uppercase font-normal">
              {language === 'hi' ? 'पुरुष और बच्चों का स्टोर' : "The Men's & Kids Store"}
            </span>
          </a>

          {/* Zone 2: Navigation Links (Single-Line, 4-6 links) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.2em] text-[#c9c3b7] shrink-0 font-medium font-sans">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 transition-colors hover:text-[#f4efe6] group whitespace-nowrap shrink-0"
              >
                <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c8a44d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions & Language Toggle */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Language Switcher */}
            <div
              className="flex items-center border border-[#f4efe6]/15 rounded-full p-0.5 text-[11px] font-sans tracking-wider"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                  language === 'en'
                    ? 'bg-[#c8a44d] text-[#0d0d0d] font-semibold shadow-sm'
                    : 'text-[#c9c3b7] hover:text-[#f4efe6]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                  language === 'hi'
                    ? 'bg-[#c8a44d] text-[#0d0d0d] font-semibold shadow-sm'
                    : 'text-[#c9c3b7] hover:text-[#f4efe6]'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Book Trial / Enquiry Button */}
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="hidden sm:inline-flex items-center gap-2 border border-[#c8a44d]/50 hover:border-[#c8a44d] text-[#e0c483] hover:text-[#f4efe6] hover:bg-[#c8a44d]/10 px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-[0.16em] transition-all duration-300 whitespace-nowrap shrink-0 font-medium"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c8a44d]" />
              <span>{language === 'hi' ? 'ट्रायल बुक करें' : 'Book Trial'}</span>
            </button>

            {/* Primary Action: WhatsApp Direct */}
            <a
              href={STORE_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#f4efe6] hover:bg-[#c8a44d] text-[#0d0d0d] px-4 py-1.5 sm:py-2 rounded-full text-xs font-sans uppercase tracking-[0.18em] font-semibold transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap shrink-0 shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-[#f4efe6] hover:text-[#c8a44d] transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-[#0d0d0d]/98 z-[850] lg:hidden flex flex-col justify-center px-8 transition-all duration-500 ${
          isMobileOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        <div className="max-w-md mx-auto w-full flex flex-col gap-5 py-8">
          <div className="text-[#c8a44d] text-xs uppercase tracking-[0.3em] font-sans pb-2 border-b border-[#f4efe6]/10">
            {language === 'hi' ? 'नेविगेशन' : 'Directory'}
          </div>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="font-serif text-2xl sm:text-3xl text-[#f4efe6] hover:text-[#c8a44d] transition-colors py-2 border-b border-[#f4efe6]/10"
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
              className="w-full flex items-center justify-center gap-2 border border-[#c8a44d] text-[#e0c483] py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium"
            >
              <Calendar className="w-4 h-4" />
              <span>{language === 'hi' ? 'शोरूम ट्रायल बुक करें' : 'Book Showroom Trial'}</span>
            </button>
            <a
              href={STORE_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-[#0d0d0d] font-semibold py-3 rounded-full text-xs uppercase tracking-[0.2em]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
