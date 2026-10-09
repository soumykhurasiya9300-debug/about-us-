import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  ExternalLink,
  Copy,
  Check,
  Instagram,
  Facebook,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';
import { Language, LookbookItem } from './types';
import {
  STORE_PHONE,
  STORE_PHONE_DISPLAY,
  STORE_WHATSAPP_LINK,
  STORE_ADDRESS_EN,
  STORE_ADDRESS_HI,
  STORE_HOURS_EN,
  STORE_HOURS_HI,
  CATEGORIES_LIST,
  LOOKBOOK_ITEMS,
  INSTAGRAM_POSTS,
  STORE_FEATURES,
} from './data/storeData';
import { ImageWithFallback } from './components/ImageWithFallback';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { LightboxModal } from './components/LightboxModal';
import { EnquiryModal } from './components/EnquiryModal';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('aboutus_lang');
      return saved === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ethnic' | 'kids' | 'casual' | 'wedding'>('all');
  const [selectedLookbookItem, setSelectedLookbookItem] = useState<LookbookItem | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('aboutus_lang', lang);
    } catch {}
  };

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(STORE_PHONE);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const filteredLookbook = LOOKBOOK_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.filter === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e8e4dc] selection:bg-[#c8a44d] selection:text-[#0d0d0d] relative font-sans">
      {/* Preloader */}
      <Preloader language={language} />

      {/* Desktop Luxury Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#c8a44d] via-[#e0c483] to-[#b8734a] z-[999] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Announcement Bar */}
      <aside aria-label="Announcement" className="bg-[#151515] border-b border-[#f4efe6]/10 text-center py-2 px-4 text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#c9c3b7] relative z-40">
        <span className="text-[#c8a44d] mr-2">✦</span>
        <span>
          {language === 'hi'
            ? 'नए त्योहार और शादी कलेक्शन अब स्टोर में उपलब्ध · मरहटल, जबलपुर पधारें'
            : 'New Festive & Wedding Collections In-Store · Visit Us at Marhatal, Jabalpur'}
        </span>
        <span className="text-[#c8a44d] ml-2">✦</span>
      </aside>

      {/* Top Navigation */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
      />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section id="home" className="relative min-h-[92vh] flex items-center px-6 sm:px-12 py-16 sm:py-24 overflow-hidden border-b border-[#f4efe6]/10">
          {/* Background Editorial Visual with Tint */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=2400&q=80"
              alt="Luxury Menswear & Kidswear Editorial"
              className="w-full h-full object-cover scale-105 filter brightness-[0.38] contrast-[1.08] saturate-[0.85]"
            />
            {/* Scrim Gradients */}
            <div className="absolute inset-0 bg-radial-[ellipse_at_20%_35%] from-[#b8734a]/18 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/60 via-[#0d0d0d]/40 to-[#0d0d0d]" />
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto w-full">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 text-xs sm:text-sm tracking-[0.45em] uppercase text-[#c8a44d] mb-6 font-medium">
                <span className="w-9 h-[1px] bg-[#c8a44d]" />
                <span>
                  {language === 'hi' ? '2011 से · मरहटल, जबलपुर' : 'Since 2011 · Marhatal, Jabalpur'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.04] text-[#f4efe6] font-normal tracking-tight mb-8">
                {language === 'hi' ? (
                  <>
                    जबलपुर का प्रतिष्ठित फैशन ठिकाना — <em className="italic text-[#c8a44d]">पुरुष</em> और बच्चों के लिए।
                  </>
                ) : (
                  <>
                    Jabalpur’s Fashion Destination for <em className="italic text-[#c8a44d]">Men</em> &amp; Kids.
                  </>
                )}
              </h1>

              {/* Lead Text */}
              <p className="text-[#c9c3b7] text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-10">
                {language === 'hi'
                  ? 'रोज़मर्रा के कैज़ुअल, त्योहारों की पसंद, और शादी के लिए तैयार एथनिक वियर — आधुनिक पुरुष और नन्हे राजकुमार के लिए। जबलपुर के दिल में, बेहतरीन गुणवत्ता उचित दाम पर।'
                  : 'Everyday casuals, festive favourites, and wedding-ready ethnicwear — curated for the modern man and the little gentleman. Premium craftsmanship at reasonable prices, right in the heart of Jabalpur.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#men"
                  className="inline-flex items-center gap-2.5 bg-[#f4efe6] hover:bg-[#c8a44d] text-[#0d0d0d] px-7 py-3.5 rounded-full text-xs font-sans uppercase tracking-[0.22em] font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-xl"
                >
                  <span>{language === 'hi' ? 'कलेक्शन देखें' : 'Explore Collections'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="inline-flex items-center gap-2.5 border border-[#f4efe6]/35 hover:border-[#c8a44d] text-[#f4efe6] hover:text-[#e0c483] px-7 py-3.5 rounded-full text-xs font-sans uppercase tracking-[0.22em] font-medium transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
                >
                  <Calendar className="w-4 h-4 text-[#c8a44d]" />
                  <span>{language === 'hi' ? 'ट्रायल आरक्षित करें' : 'Book Showroom Trial'}</span>
                </button>

                <a
                  href="#visit"
                  className="inline-flex items-center gap-2.5 text-[#c9c3b7] hover:text-[#f4efe6] px-5 py-3.5 text-xs font-sans uppercase tracking-[0.2em] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#c8a44d]" />
                  <span>{language === 'hi' ? 'स्टोर का रास्ता' : 'Store Directions'}</span>
                </a>
              </div>
            </div>

            {/* Quick Meta Indicators */}
            <div className="pt-16 sm:pt-20 border-t border-[#f4efe6]/10 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-[#c9c3b7] tracking-[0.2em] uppercase font-sans">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8a44d]" />
                <span>{language === 'hi' ? 'पुरुष वस्त्र' : "Men's Collection"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8a44d]" />
                <span>{language === 'hi' ? 'बच्चों के परिधान' : 'Kids Fashion (1-14 yrs)'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8a44d]" />
                <span>{language === 'hi' ? 'वेडिंग शेरवानी' : 'The Groom Edit'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8a44d]" />
                <span>{language === 'hi' ? 'मरहटल, जबलपुर' : 'Marhatal Showroom'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MARQUEE ================= */}
        <section aria-label="Collections overview" className="bg-[#151515] border-b border-[#f4efe6]/10 py-5 overflow-hidden">
          <div className="animate-marquee font-serif text-xl sm:text-2xl text-[#c9c3b7] italic tracking-[0.16em]">
            {[1, 2].map((group) => (
              <span key={group} className="flex items-center gap-10 whitespace-nowrap px-4">
                <span>Casualwear</span>
                <span className="text-[#c8a44d] not-italic text-sm">✦</span>
                <span>Ethnicwear</span>
                <span className="text-[#c8a44d] not-italic text-sm">✦</span>
                <span>Sherwanis</span>
                <span className="text-[#c8a44d] not-italic text-sm">✦</span>
                <span>Indo-Western</span>
                <span className="text-[#c8a44d] not-italic text-sm">✦</span>
                <span>Denim &amp; Linen</span>
                <span className="text-[#c8a44d] not-italic text-sm">✦</span>
                <span>Boys Kidswear</span>
                <span className="text-[#c8a44d] not-italic text-sm">✦</span>
                <span>Wedding Edit</span>
                <span className="text-[#c8a44d] not-italic text-sm">✦</span>
                <span>Festive Looks</span>
                <span className="text-[#c8a44d] not-italic text-sm">✦</span>
              </span>
            ))}
          </div>
        </section>

        {/* ================= MEN'S COLLECTION ================= */}
        <section id="men" className="py-24 sm:py-32 px-6 sm:px-12 border-b border-[#f4efe6]/10">
          <div className="max-w-[1440px] mx-auto">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mb-16">
              <div>
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#c8a44d] mb-4 font-medium">
                  <span className="w-7 h-[1px] bg-[#c8a44d]" />
                  <span>{language === 'hi' ? 'पुरुष संग्रह' : "The Men's Edit"}</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal leading-tight">
                  {language === 'hi' ? (
                    <>
                      हर <em className="italic text-[#c8a44d]">अवसर</em> के लिए उत्कृष्ट पोशाक।
                    </>
                  ) : (
                    <>
                      Dressed for every <em className="italic text-[#c8a44d]">moment.</em>
                    </>
                  )}
                </h2>
              </div>
              <p className="text-[#c9c3b7] text-sm sm:text-base font-light max-w-md md:ml-auto">
                {language === 'hi'
                  ? 'सोमवार की सुबह की शर्ट से लेकर शादी की रात की शेरवानी तक — उस पुरुष के लिए जो जानता है कि वह क्या पहनना चाहता है।'
                  : 'From Monday-morning linen shirts to wedding-night sherwanis — a considered wardrobe for the gentleman who values sharp tailoring.'}
              </p>
            </div>

            {/* Featured Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              {/* Card 1: Ethnicwear (7 cols) */}
              <div
                onClick={() => {
                  setActiveFilter('ethnic');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[0]);
                }}
                className="lg:col-span-7 relative min-h-[460px] rounded overflow-hidden bg-[#151515] group cursor-pointer border border-[#f4efe6]/10"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1400&q=80"
                  alt="Men's Ethnicwear Collection"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.7] group-hover:brightness-[0.82]"
                />
                <div className="absolute top-6 right-6 w-11 h-11 rounded-full border border-[#f4efe6]/30 bg-[#0d0d0d]/40 backdrop-blur-md flex items-center justify-center text-[#f4efe6] group-hover:bg-[#c8a44d] group-hover:border-[#c8a44d] group-hover:text-[#0d0d0d] transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 bg-gradient-to-t from-[#0d0d0d]/95 via-[#0d0d0d]/70 to-transparent">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-[#c8a44d] font-sans font-medium mb-2">
                    {language === 'hi' ? 'एथनिक वियर' : 'Festive & Occasion'}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-4xl text-[#f4efe6] font-normal mb-2">
                    {language === 'hi' ? 'कुर्ते, शेरवानी और इंडो-वेस्टर्न' : 'Kurtas, Sherwanis & Indo-Western'}
                  </h3>
                  <p className="text-sm text-[#c9c3b7] font-light max-w-lg transition-all duration-300">
                    {language === 'hi'
                      ? 'शादी के लिए तैयार, त्योहारी रंग और सधी हुई फिटिंग। मरहटल शोरूम में नए कट्स।'
                      : 'Wedding-ready silhouettes, festive jewel tones, and tailored fits.'}
                  </p>
                </div>
              </div>

              {/* Card 2: Casualwear (5 cols) */}
              <div
                onClick={() => {
                  setActiveFilter('casual');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[1]);
                }}
                className="lg:col-span-5 relative min-h-[460px] rounded overflow-hidden bg-[#151515] group cursor-pointer border border-[#f4efe6]/10"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Men's Casualwear Collection"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.7] group-hover:brightness-[0.82]"
                />
                <div className="absolute top-6 right-6 w-11 h-11 rounded-full border border-[#f4efe6]/30 bg-[#0d0d0d]/40 backdrop-blur-md flex items-center justify-center text-[#f4efe6] group-hover:bg-[#c8a44d] group-hover:border-[#c8a44d] group-hover:text-[#0d0d0d] transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 bg-gradient-to-t from-[#0d0d0d]/95 via-[#0d0d0d]/70 to-transparent">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-[#c8a44d] font-sans font-medium mb-2">
                    {language === 'hi' ? 'कैज़ुअल वियर' : 'Everyday Staples'}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe6] font-normal mb-2">
                    {language === 'hi' ? 'शर्ट · टी-शर्ट · डेनिम' : 'Shirts · Tees · Denim'}
                  </h3>
                  <p className="text-sm text-[#c9c3b7] font-light max-w-sm transition-all duration-300">
                    {language === 'hi'
                      ? 'आधुनिक ट्रेंड्स, प्रीमियम लिनन और आरामदायक फिट।'
                      : 'Refined everyday essentials, breathable fabrics, and effortless style.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Category Grid Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {CATEGORIES_LIST.map((cat) => (
                <div
                  key={cat.number}
                  onClick={() => {
                    setActiveFilter(cat.filterTag);
                    const el = document.getElementById('gallery');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-5 sm:p-6 bg-[#151515] border border-[#f4efe6]/10 hover:border-[#c8a44d] rounded transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between min-h-[160px] group cursor-pointer"
                >
                  <span className="font-serif text-xs text-[#c8a44d] font-normal">
                    {cat.number}
                  </span>
                  <div>
                    <h4 className="font-serif text-lg sm:text-xl text-[#f4efe6] group-hover:text-[#e0c483] transition-colors leading-tight mb-1">
                      {language === 'hi' ? cat.nameHi : cat.nameEn}
                    </h4>
                    <p className="text-[11px] text-[#c9c3b7] font-sans font-light">
                      {language === 'hi' ? cat.subHi : cat.subEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= KIDS' COLLECTION ================= */}
        <section id="kids" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#151515] border-b border-[#f4efe6]/10">
          <div className="max-w-[1440px] mx-auto">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mb-16">
              <div>
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#c8a44d] mb-4 font-medium">
                  <span className="w-7 h-[1px] bg-[#c8a44d]" />
                  <span>{language === 'hi' ? 'बच्चों का संग्रह' : "The Kids Edit"}</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal leading-tight">
                  {language === 'hi' ? (
                    <>
                      छोटे कपड़े, <em className="italic text-[#c8a44d]">बड़े पल।</em>
                    </>
                  ) : (
                    <>
                      Little looks, <em className="italic text-[#c8a44d]">big moments.</em>
                    </>
                  )}
                </h2>
              </div>
              <p className="text-[#c9c3b7] text-sm sm:text-base font-light max-w-md md:ml-auto">
                {language === 'hi'
                  ? 'लड़कों और बच्चों के लिए मज़ेदार, आरामदायक और उत्सव के लिए तैयार कपड़े — क्योंकि स्टाइल कम उम्र में ही शुरू होती है।'
                  : 'Playful, comfortable, and celebration-ready clothing for boys and children — because style starts young.'}
              </p>
            </div>

            {/* Kids Showcase Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Card 1: Kids Everyday */}
              <div
                onClick={() => {
                  setActiveFilter('kids');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[2]);
                }}
                className="lg:col-span-5 relative min-h-[440px] rounded overflow-hidden bg-[#1c1c1c] group cursor-pointer border border-[#f4efe6]/10"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1200&q=80"
                  alt="Kids everyday wear"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.75] group-hover:brightness-[0.85]"
                />
                <div className="absolute top-6 right-6 w-11 h-11 rounded-full border border-[#f4efe6]/30 bg-[#0d0d0d]/40 backdrop-blur-md flex items-center justify-center text-[#f4efe6] group-hover:bg-[#c8a44d] group-hover:border-[#c8a44d] group-hover:text-[#0d0d0d] transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 bg-gradient-to-t from-[#0d0d0d]/95 via-[#0d0d0d]/70 to-transparent">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-[#c8a44d] font-sans font-medium mb-2">
                    {language === 'hi' ? 'रोज़मर्रा और खेल' : 'Daily Comfort'}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe6] font-normal mb-2">
                    {language === 'hi' ? 'कैज़ुअल और आराम' : 'Casual & Comfort'}
                  </h3>
                  <p className="text-sm text-[#c9c3b7] font-light max-w-sm">
                    {language === 'hi'
                      ? 'पूरे दिन खेलने और आराम के लिए मुलायम, हवादार कॉटन।'
                      : 'Soft natural fabrics for all-day play and school days.'}
                  </p>
                </div>
              </div>

              {/* Card 2: Kids Festive & Partywear */}
              <div
                onClick={() => {
                  setActiveFilter('kids');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[5]);
                }}
                className="lg:col-span-7 relative min-h-[440px] rounded overflow-hidden bg-[#1c1c1c] group cursor-pointer border border-[#f4efe6]/10"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1400&q=80"
                  alt="Kids festive and partywear"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.75] group-hover:brightness-[0.85]"
                />
                <div className="absolute top-6 right-6 w-11 h-11 rounded-full border border-[#f4efe6]/30 bg-[#0d0d0d]/40 backdrop-blur-md flex items-center justify-center text-[#f4efe6] group-hover:bg-[#c8a44d] group-hover:border-[#c8a44d] group-hover:text-[#0d0d0d] transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 bg-gradient-to-t from-[#0d0d0d]/95 via-[#0d0d0d]/70 to-transparent">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-[#c8a44d] font-sans font-medium mb-2">
                    {language === 'hi' ? 'त्योहार और पार्टी' : 'Celebration Edit'}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-4xl text-[#f4efe6] font-normal mb-2">
                    {language === 'hi' ? 'नन्हों के लिए उत्सव के कपड़े' : 'Celebration-Ready for Little Ones'}
                  </h3>
                  <p className="text-sm text-[#c9c3b7] font-light max-w-lg">
                    {language === 'hi'
                      ? 'फेस्टिव कुर्ता-धोती सेट, सूट-ब्लेज़र और मैचिंग एक्सेसरीज़ (आयु 1 से 14 वर्ष)।'
                      : 'Miniature festive kurtas, waistcoats, and tuxedos tailored with gentle linings.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= OCCASIONWEAR & WEDDING ================= */}
        <section id="occasion" className="py-24 sm:py-32 px-6 sm:px-12 border-b border-[#f4efe6]/10">
          <div className="max-w-[1440px] mx-auto">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mb-16">
              <div>
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#c8a44d] mb-4 font-medium">
                  <span className="w-7 h-[1px] bg-[#c8a44d]" />
                  <span>{language === 'hi' ? 'अवसर वस्त्र' : 'Occasionwear'}</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal leading-tight">
                  {language === 'hi' ? (
                    <>
                      उन दिनों के लिए जिन्हें आप <em className="italic text-[#c8a44d]">याद रखेंगे।</em>
                    </>
                  ) : (
                    <>
                      For the days you’ll <em className="italic text-[#c8a44d]">remember.</em>
                    </>
                  )}
                </h2>
              </div>
              <p className="text-[#c9c3b7] text-sm sm:text-base font-light max-w-md md:ml-auto">
                {language === 'hi'
                  ? 'शादी, रिसेप्शन, त्योहार और पारिवारिक उत्सव — ऐसे परिधान जो आपको और आपके परिवार को अलग और सम्मानित पहचान दें।'
                  : 'Weddings, receptions, festivals and family celebrations — discover looks designed to make a memorable entrance.'}
              </p>
            </div>

            {/* Three Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Wedding Guests */}
              <div
                onClick={() => {
                  setActiveFilter('ethnic');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[7]);
                }}
                className="relative min-h-[420px] rounded overflow-hidden bg-[#151515] group cursor-pointer border border-[#f4efe6]/10"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&w=1000&q=80"
                  alt="Wedding guest looks"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.7] group-hover:brightness-[0.82]"
                />
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full border border-[#f4efe6]/30 bg-[#0d0d0d]/40 backdrop-blur-md flex items-center justify-center text-[#f4efe6] group-hover:bg-[#c8a44d] group-hover:border-[#c8a44d] group-hover:text-[#0d0d0d] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-[#0d0d0d]/95 via-[#0d0d0d]/70 to-transparent">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#c8a44d] font-sans font-medium mb-1.5">
                    {language === 'hi' ? 'शादी के मेहमान' : 'Wedding Guests'}
                  </div>
                  <h3 className="font-serif text-2xl text-[#f4efe6] font-normal mb-1">
                    {language === 'hi' ? 'गेस्ट व सगी लुक' : 'Guest & Sangeet Looks'}
                  </h3>
                  <p className="text-xs text-[#c9c3b7] font-light">
                    {language === 'hi' ? 'नेहरू जैकेट्स, प्रिंटेड कुर्ते और पेस्टल सेट्स।' : 'Tailored Nehru jackets, pastel linens & twin sets.'}
                  </p>
                </div>
              </div>

              {/* Card 2: The Groom Edit */}
              <div
                onClick={() => {
                  setActiveFilter('wedding');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[3]);
                }}
                className="relative min-h-[420px] rounded overflow-hidden bg-[#151515] group cursor-pointer border border-[#c8a44d]/40 shadow-xl"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                  alt="The Groom Sherwani Edit"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.7] group-hover:brightness-[0.82]"
                />
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full border border-[#c8a44d] bg-[#0d0d0d]/60 backdrop-blur-md flex items-center justify-center text-[#c8a44d] group-hover:bg-[#c8a44d] group-hover:text-[#0d0d0d] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-[#0d0d0d]/95 via-[#0d0d0d]/70 to-transparent">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#c8a44d] font-sans font-medium mb-1.5">
                    {language === 'hi' ? 'दूल्हे का संग्रह' : 'The Groom Edit'}
                  </div>
                  <h3 className="font-serif text-2xl text-[#f4efe6] font-normal mb-1">
                    {language === 'hi' ? 'शाही शेरवानी' : 'Imperial Sherwanis'}
                  </h3>
                  <p className="text-xs text-[#c9c3b7] font-light">
                    {language === 'hi' ? 'ज़रदोज़ी वर्क, साफा, माला और मैचिंग दुपट्टा।' : 'Zardozi craftsmanship, safa, stole & royal jewelry.'}
                  </p>
                </div>
              </div>

              {/* Card 3: Celebration Looks */}
              <div
                onClick={() => {
                  setActiveFilter('ethnic');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[6]);
                }}
                className="relative min-h-[420px] rounded overflow-hidden bg-[#151515] group cursor-pointer border border-[#f4efe6]/10"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1615887110697-a5e0f4c8e0e3?auto=format&fit=crop&w=1000&q=80"
                  alt="Festive celebration looks"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.7] group-hover:brightness-[0.82]"
                />
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full border border-[#f4efe6]/30 bg-[#0d0d0d]/40 backdrop-blur-md flex items-center justify-center text-[#f4efe6] group-hover:bg-[#c8a44d] group-hover:border-[#c8a44d] group-hover:text-[#0d0d0d] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-[#0d0d0d]/95 via-[#0d0d0d]/70 to-transparent">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-[#c8a44d] font-sans font-medium mb-1.5">
                    {language === 'hi' ? 'त्योहार और पूजन' : 'Festive Rituals'}
                  </div>
                  <h3 className="font-serif text-2xl text-[#f4efe6] font-normal mb-1">
                    {language === 'hi' ? 'दीपावली व पूजा लुक' : 'Festive & Puja Looks'}
                  </h3>
                  <p className="text-xs text-[#c9c3b7] font-light">
                    {language === 'hi' ? 'चंदेरी कॉटन सिल्क और पारंपरिक हाथ की कढ़ाई।' : 'Chanderi silk, festive tones & comfortable fits.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= LOOKBOOK GALLERY ================= */}
        <section id="gallery" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#151515] border-b border-[#f4efe6]/10">
          <div className="max-w-[1440px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#c8a44d] mb-4 font-medium">
                  <span className="w-7 h-[1px] bg-[#c8a44d]" />
                  <span>{language === 'hi' ? 'नवीनतम लुक' : 'Lookbook'}</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal leading-tight">
                  {language === 'hi' ? (
                    <>
                      स्टोर में, <em className="italic text-[#c8a44d]">ट्रेंड में।</em>
                    </>
                  ) : (
                    <>
                      In-store, <em className="italic text-[#c8a44d]">on-trend.</em>
                    </>
                  )}
                </h2>
              </div>

              {/* Segmented Filter Controls */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#1f1f1f] rounded-lg border border-[#f4efe6]/10 text-xs font-sans">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={`px-3.5 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 ${
                    activeFilter === 'all'
                      ? 'bg-[#c8a44d] text-[#0d0d0d] font-semibold shadow-sm'
                      : 'text-[#c9c3b7] hover:text-[#f4efe6]'
                  }`}
                >
                  {language === 'hi' ? 'सभी' : 'All Looks'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('ethnic')}
                  className={`px-3.5 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 ${
                    activeFilter === 'ethnic'
                      ? 'bg-[#c8a44d] text-[#0d0d0d] font-semibold shadow-sm'
                      : 'text-[#c9c3b7] hover:text-[#f4efe6]'
                  }`}
                >
                  {language === 'hi' ? 'एथनिक' : 'Ethnicwear'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('kids')}
                  className={`px-3.5 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 ${
                    activeFilter === 'kids'
                      ? 'bg-[#c8a44d] text-[#0d0d0d] font-semibold shadow-sm'
                      : 'text-[#c9c3b7] hover:text-[#f4efe6]'
                  }`}
                >
                  {language === 'hi' ? 'बच्चे' : 'Kids Collection'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('casual')}
                  className={`px-3.5 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 ${
                    activeFilter === 'casual'
                      ? 'bg-[#c8a44d] text-[#0d0d0d] font-semibold shadow-sm'
                      : 'text-[#c9c3b7] hover:text-[#f4efe6]'
                  }`}
                >
                  {language === 'hi' ? 'कैज़ुअल' : 'Casual & Denim'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('wedding')}
                  className={`px-3.5 py-1.5 rounded-md transition-all whitespace-nowrap shrink-0 ${
                    activeFilter === 'wedding'
                      ? 'bg-[#c8a44d] text-[#0d0d0d] font-semibold shadow-sm'
                      : 'text-[#c9c3b7] hover:text-[#f4efe6]'
                  }`}
                >
                  {language === 'hi' ? 'शेरवानी' : 'Sherwanis'}
                </button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredLookbook.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedLookbookItem(item)}
                  className="group relative bg-[#1c1c1c] border border-[#f4efe6]/10 rounded overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#c8a44d]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#0a0a0a]">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={language === 'hi' ? item.titleHi : item.titleEn}
                      fallbackTitle={language === 'hi' ? item.titleHi : item.titleEn}
                      fallbackCategory={language === 'hi' ? item.categoryHi : item.categoryEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.88] group-hover:brightness-100"
                    />
                  </div>

                  {/* Overlay Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/95 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#c8a44d] font-sans font-medium block mb-1">
                      {language === 'hi' ? item.categoryHi : item.categoryEn}
                    </span>
                    <h4 className="font-serif text-lg text-[#f4efe6] font-normal leading-snug line-clamp-1 group-hover:text-[#e0c483] transition-colors">
                      {language === 'hi' ? item.titleHi : item.titleEn}
                    </h4>
                    <div className="mt-2 text-[11px] text-[#c9c3b7]/70 flex items-center justify-between font-sans">
                      <span>{language === 'hi' ? item.tagHi : item.tagEn}</span>
                      <span className="text-[#c8a44d] group-hover:translate-x-1 transition-transform">
                        {language === 'hi' ? 'विस्तार देखें →' : 'View Look →'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= INSTAGRAM SECTION ================= */}
        <section id="instagram" className="py-24 sm:py-32 px-6 sm:px-12 border-b border-[#f4efe6]/10">
          <div className="max-w-[1440px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#c8a44d] mb-4 font-medium">
                  <span className="w-7 h-[1px] bg-[#c8a44d]" />
                  <span>{language === 'hi' ? 'सोशल फीड' : 'Community & Social'}</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal leading-tight">
                  {language === 'hi' ? (
                    <>
                      इंस्टाग्राम पर <em className="italic text-[#c8a44d]">@aboutus_jabalpur</em>
                    </>
                  ) : (
                    <>
                      Follow on Instagram <em className="italic text-[#c8a44d]">@aboutus_jabalpur</em>
                    </>
                  )}
                </h2>
              </div>
              <a
                href="https://instagram.com/aboutus_jabalpur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#f4efe6]/25 hover:border-[#c8a44d] text-[#c9c3b7] hover:text-[#f4efe6] px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.2em] transition-colors whitespace-nowrap shrink-0"
              >
                <Instagram className="w-4 h-4 text-[#c8a44d]" />
                <span>{language === 'hi' ? 'फॉलो करें' : 'Follow Profile'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INSTAGRAM_POSTS.map((post) => (
                <a
                  key={post.id}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square rounded overflow-hidden bg-[#151515] border border-[#f4efe6]/10 block"
                >
                  <ImageWithFallback
                    src={post.imageUrl}
                    alt="Instagram Showroom Post"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-[#0d0d0d]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-[#f4efe6]">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#c8a44d] font-sans font-medium">{post.profileHandle}</span>
                      <Instagram className="w-4 h-4 text-[#c8a44d]" />
                    </div>
                    <p className="text-xs font-light line-clamp-3 text-[#c9c3b7]">
                      {language === 'hi' ? post.captionHi : post.captionEn}
                    </p>
                    <span className="text-[10px] uppercase tracking-wider text-[#c8a44d]">
                      {language === 'hi' ? 'पोस्ट देखें ↗' : 'View Post ↗'}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================= STORY / ABOUT ================= */}
        <section id="about" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#151515] border-b border-[#f4efe6]/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Visual with Established 2011 Badge */}
              <div className="lg:col-span-5 relative aspect-[4/5] rounded overflow-hidden bg-[#1c1c1c] border border-[#f4efe6]/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80"
                  alt="Our Showroom Story in Jabalpur"
                  className="w-full h-full object-cover filter brightness-85"
                />
                <div className="absolute inset-0 border border-[#c8a44d]/30 m-4 pointer-events-none" />
                <div className="absolute bottom-8 right-8 bg-[#c8a44d] text-[#0d0d0d] p-5 rounded-sm shadow-xl text-center">
                  <span className="font-serif text-3xl font-bold block leading-none">2011</span>
                  <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-medium block mt-1">
                    {language === 'hi' ? 'स्थापना वर्ष' : 'Established'}
                  </span>
                </div>
              </div>

              {/* Text Narrative */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#c8a44d] mb-4 font-medium">
                  <span className="w-7 h-[1px] bg-[#c8a44d]" />
                  <span>{language === 'hi' ? 'हमारी कहानी' : 'Our Story'}</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal leading-tight mb-8">
                  {language === 'hi' ? (
                    <>
                      एक स्टोर से बढ़कर — <em className="italic text-[#c8a44d]">जबलपुर की परंपरा।</em>
                    </>
                  ) : (
                    <>
                      More than a store — <em className="italic text-[#c8a44d]">a Jabalpur ritual.</em>
                    </>
                  )}
                </h2>

                <div className="space-y-5 text-[#c9c3b7] text-base font-light leading-relaxed max-w-2xl mb-12">
                  <p>
                    {language === 'hi'
                      ? '2011 से, About Us — The Men\'s & Kids Store जबलपुर के पुरुषों और बच्चों को उनके खास मौकों के लिए तैयार कर रहा है। एक युवा की पहली इंटरव्यू शर्ट से लेकर एक बच्चे के पहले दिवाली कुर्ते तक, और उसकी ज़िंदगी के सबसे बड़े दिन की शेरवानी तक — हम इस कहानी का हिस्सा रहे हैं।'
                      : 'Since 2011, About Us — The Men’s & Kids Store has been dressing the men and children of Jabalpur for the moments that truly matter. From a young man\'s first interview shirt, to a child\'s first Diwali kurta, to the sherwani worn on the biggest day of his life — we have been an honoured part of the city\'s celebrations.'}
                  </p>
                  <p>
                    {language === 'hi'
                      ? 'हमारा वादा सरल है: आधुनिक ट्रेंड्स, ईमानदार गुणवत्ता, और वाजिब दाम — सब कुछ मरहटल में एक ही छत के नीचे।'
                      : 'Our promise remains honest and simple: current silhouettes, authentic fabric quality, and transparent pricing — all under one welcoming roof at Marhatal.'}
                  </p>
                </div>

                {/* Quantitative Metric Proof */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#f4efe6]/10">
                  {STORE_FEATURES.map((feat) => (
                    <div key={feat.number}>
                      <span className="font-serif text-3xl sm:text-4xl text-[#c8a44d] block font-normal leading-none mb-2">
                        {feat.number}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#f4efe6] font-sans font-medium block mb-1">
                        {language === 'hi' ? feat.titleHi : feat.titleEn}
                      </span>
                      <p className="text-xs text-[#c9c3b7]/70 font-light hidden sm:block">
                        {language === 'hi' ? feat.descHi : feat.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= VISIT US / SHOWROOM & MAP ================= */}
        <section id="visit" className="py-24 sm:py-32 px-6 sm:px-12 border-b border-[#f4efe6]/10">
          <div className="max-w-[1440px] mx-auto">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mb-16">
              <div>
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#c8a44d] mb-4 font-medium">
                  <span className="w-7 h-[1px] bg-[#c8a44d]" />
                  <span>{language === 'hi' ? 'पधारें' : 'Showroom Visit'}</span>
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#f4efe6] font-normal leading-tight">
                  {language === 'hi' ? (
                    <>
                      आकर देखें <em className="italic text-[#c8a44d]">व्यक्तिगत रूप से।</em>
                    </>
                  ) : (
                    <>
                      Come experience it <em className="italic text-[#c8a44d]">in person.</em>
                    </>
                  )}
                </h2>
              </div>
              <p className="text-[#c9c3b7] text-sm sm:text-base font-light max-w-md md:ml-auto">
                {language === 'hi'
                  ? 'तस्वीरें ही सब कुछ नहीं कहतीं। अंदर आइए, कपड़ा महसूस करें, और हमें सही लुक चुनने दें।'
                  : 'Photographs only say so much. Step in, feel the weave of raw silk and linen, and let our stylists dress you.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Information Column */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#151515] p-8 sm:p-10 rounded border border-[#f4efe6]/10">
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4 items-start pb-6 border-b border-[#f4efe6]/10">
                    <div className="w-10 h-10 rounded-full bg-[#0d0d0d] border border-[#c8a44d]/30 flex items-center justify-center text-[#c8a44d] shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a44d] block mb-1 font-medium font-sans">
                        {language === 'hi' ? 'पता' : 'Address'}
                      </span>
                      <p className="text-sm sm:text-base text-[#f4efe6] font-light leading-relaxed">
                        {language === 'hi' ? STORE_ADDRESS_HI : STORE_ADDRESS_EN}
                      </p>
                      <span className="text-xs text-[#c9c3b7]/70 mt-1 block">
                        {language === 'hi' ? 'लैंडमार्क: गुरुद्वारा के पास' : 'Landmark: Beside Gurudwara, Teen Patti Road'}
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start pb-6 border-b border-[#f4efe6]/10">
                    <div className="w-10 h-10 rounded-full bg-[#0d0d0d] border border-[#c8a44d]/30 flex items-center justify-center text-[#c8a44d] shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a44d] block mb-1 font-medium font-sans">
                        {language === 'hi' ? 'फोन व व्हाट्सएप' : 'Phone & Enquiries'}
                      </span>
                      <div className="flex items-center gap-3">
                        <a
                          href={`tel:${STORE_PHONE}`}
                          className="text-base sm:text-lg text-[#f4efe6] hover:text-[#c8a44d] font-sans font-medium transition-colors"
                        >
                          {STORE_PHONE_DISPLAY}
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyPhone}
                          className="p-1.5 text-[#c9c3b7] hover:text-[#f4efe6] transition-colors"
                          title="Copy phone number"
                        >
                          {copiedPhone ? <Check className="w-4 h-4 text-[#c8a44d]" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#0d0d0d] border border-[#c8a44d]/30 flex items-center justify-center text-[#c8a44d] shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#c8a44d] block mb-1 font-medium font-sans">
                        {language === 'hi' ? 'शोरूम समय' : 'Showroom Hours'}
                      </span>
                      <p className="text-sm sm:text-base text-[#f4efe6] font-light">
                        {language === 'hi' ? STORE_HOURS_HI : STORE_HOURS_EN}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-8 mt-6 border-t border-[#f4efe6]/10 flex flex-wrap gap-3">
                  <a
                    href={`tel:${STORE_PHONE}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#f4efe6] hover:bg-[#c8a44d] text-[#0d0d0d] py-3 px-5 rounded-full text-xs font-sans uppercase tracking-[0.18em] font-semibold transition-all duration-300"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'कॉल करें' : 'Call Store'}</span>
                  </a>

                  <a
                    href={STORE_WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-[#0d0d0d] py-3 px-5 rounded-full text-xs font-sans uppercase tracking-[0.18em] font-semibold transition-all duration-300"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsEnquiryModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 border border-[#f4efe6]/25 hover:border-[#c8a44d] text-[#c9c3b7] hover:text-[#f4efe6] py-3 px-5 rounded-full text-xs font-sans uppercase tracking-[0.18em] transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#c8a44d]" />
                    <span>{language === 'hi' ? 'व्यक्तिगत ट्रायल अपॉइंटमेंट लें' : 'Schedule VIP Consultation'}</span>
                  </button>
                </div>
              </div>

              {/* Map Embed Column */}
              <div className="lg:col-span-7 min-h-[380px] lg:min-h-full rounded overflow-hidden border border-[#f4efe6]/10 relative bg-[#1c1c1c]">
                <iframe
                  title="About Us Showroom Location — Marhatal, Jabalpur"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[380px] filter invert-[90%] hue-rotate-180 contrast-[105%]"
                  src="https://www.google.com/maps?q=Marhatal%2C%20Jabalpur%2C%20Madhya%20Pradesh&output=embed"
                />
                <div className="absolute top-4 left-4 z-10 bg-[#0d0d0d]/85 backdrop-blur-md px-4 py-2 border border-[#f4efe6]/20 rounded text-xs text-[#f4efe6]">
                  <span className="text-[#c8a44d] font-semibold">About Us</span> · Marhatal, Jabalpur
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA BANNER ================= */}
        <section className="py-24 sm:py-32 px-6 sm:px-12 bg-gradient-to-br from-[#1a1512] via-[#121212] to-[#0d0d0d] text-center border-b border-[#f4efe6]/10 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#c8a44d]/10 blur-[120px] pointer-events-none rounded-full" />
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[#c8a44d] mb-6 font-medium">
              <span className="w-7 h-[1px] bg-[#c8a44d]" />
              <span>{language === 'hi' ? 'आपका स्वागत है' : 'Welcome to About Us'}</span>
              <span className="w-7 h-[1px] bg-[#c8a44d]" />
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#f4efe6] font-normal leading-tight mb-6">
              {language === 'hi' ? (
                <>
                  अपना <em className="italic text-[#c8a44d]">अगला पसंदीदा परिधान</em> खोजने के लिए तैयार?
                </>
              ) : (
                <>
                  Ready to discover your <em className="italic text-[#c8a44d]">next favourite outfit?</em>
                </>
              )}
            </h2>
            <p className="text-[#c9c3b7] text-base font-light max-w-xl mx-auto mb-10 leading-relaxed">
              {language === 'hi'
                ? 'व्हाट्सएप पर संदेश भेजें, या मरहटल शोरूम पधारें — हम आपकी संपूर्ण पसंद और सही फिटिंग ढूंढने में मदद करेंगे।'
                : 'Send us a query on WhatsApp, or drop by our showroom at Marhatal — we look forward to dressing you.'}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href={STORE_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#f4efe6] hover:bg-[#c8a44d] text-[#0d0d0d] px-8 py-3.5 rounded-full text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'hi' ? 'व्हाट्सएप पर पूछें' : 'Enquire on WhatsApp'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://maps.google.com/?q=Marhatal+Jabalpur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-[#f4efe6]/35 hover:border-[#c8a44d] text-[#f4efe6] px-8 py-3.5 rounded-full text-xs font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:-translate-y-0.5"
              >
                <MapPin className="w-4 h-4 text-[#c8a44d]" />
                <span>{language === 'hi' ? 'गूगल मैप्स नेविगेशन' : 'Get Directions'}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0a0a0a] pt-20 pb-12 px-6 sm:px-12 text-[#c9c3b7] text-sm">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#f4efe6]/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col tracking-[0.24em] font-serif text-2xl text-[#f4efe6] font-medium leading-tight">
              <span>ABOUT US</span>
              <span className="font-sans text-[10px] tracking-[0.35em] text-[#c8a44d] uppercase font-normal">
                {language === 'hi' ? 'पुरुष और बच्चों का स्टोर' : "The Men's & Kids Store"}
              </span>
            </div>
            <p className="text-[#c9c3b7] font-light max-w-sm text-sm leading-relaxed">
              {language === 'hi'
                ? '2011 से जबलपुर का विश्वसनीय पुरुष और बच्चों के फैशन का ठिकाना। उचित दाम, बेहतरीन फैब्रिक।'
                : 'Jabalpur\'s trusted destination for bespoke menswear and boys celebration wear since 2011.'}
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={STORE_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-[#f4efe6]/15 hover:border-[#c8a44d] hover:bg-[#c8a44d] hover:text-[#0d0d0d] flex items-center justify-center transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/aboutus_jabalpur"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#f4efe6]/15 hover:border-[#c8a44d] hover:bg-[#c8a44d] hover:text-[#0d0d0d] flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#f4efe6]/15 hover:border-[#c8a44d] hover:bg-[#c8a44d] hover:text-[#0d0d0d] flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3 font-sans text-xs uppercase tracking-[0.2em]">
            <h4 className="text-[#c8a44d] font-semibold text-[11px] mb-4">
              {language === 'hi' ? 'संग्रह' : 'Collections'}
            </h4>
            <p><a href="#men" className="hover:text-[#f4efe6] transition-colors">{language === 'hi' ? 'पुरुष संग्रह' : "Men's Edit"}</a></p>
            <p><a href="#kids" className="hover:text-[#f4efe6] transition-colors">{language === 'hi' ? 'बच्चों के कपड़े' : "Kids' Edit"}</a></p>
            <p><a href="#occasion" className="hover:text-[#f4efe6] transition-colors">{language === 'hi' ? 'अवसर व शादी' : 'Occasionwear'}</a></p>
            <p><a href="#gallery" className="hover:text-[#f4efe6] transition-colors">{language === 'hi' ? 'लुकबुक गैलरी' : 'Lookbook'}</a></p>
          </div>

          {/* Store Location */}
          <div className="lg:col-span-3 space-y-2 text-xs">
            <h4 className="text-[#c8a44d] uppercase tracking-[0.2em] font-semibold text-[11px] mb-4">
              {language === 'hi' ? 'शोरूम' : 'Showroom'}
            </h4>
            <p className="text-[#f4efe6] font-light">{STORE_ADDRESS_EN}</p>
            <p className="text-[#c9c3b7]/70 pt-1">{STORE_HOURS_EN}</p>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2 space-y-2 text-xs">
            <h4 className="text-[#c8a44d] uppercase tracking-[0.2em] font-semibold text-[11px] mb-4">
              {language === 'hi' ? 'संपर्क' : 'Connect'}
            </h4>
            <p>
              <a href={`tel:${STORE_PHONE}`} className="hover:text-[#c8a44d] transition-colors font-sans">
                {STORE_PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <a href={STORE_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#c8a44d] transition-colors">
                WhatsApp Us
              </a>
            </p>
            <p>
              <a href="https://instagram.com/aboutus_jabalpur" target="_blank" rel="noopener noreferrer" className="hover:text-[#c8a44d] transition-colors">
                @aboutus_jabalpur
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-[1440px] mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#c9c3b7]/60 font-sans">
          <span>
            © {new Date().getFullYear()} About Us — The Men&apos;s &amp; Kids Store, Jabalpur. All rights reserved.
          </span>
          <span className="text-[#c8a44d]/80">
            {language === 'hi' ? 'उत्कृष्टता और विश्वास के साथ' : 'Crafted with care · Marhatal, Jabalpur'}
          </span>
        </div>
      </footer>

      {/* Floating WhatsApp Action with Ripple Pulse */}
      <a
        href={STORE_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct chat on WhatsApp with About Us Showroom"
        className="wa-pulse fixed bottom-6 right-6 z-[800] w-14 h-14 rounded-full bg-[#25D366] text-[#0d0d0d] flex items-center justify-center transition-transform hover:scale-110 shadow-2xl group"
      >
        <MessageCircle className="w-7 h-7 text-[#0d0d0d]" />
        <span className="absolute right-16 bg-[#0d0d0d]/90 text-[#f4efe6] text-[11px] font-sans uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#f4efe6]/15 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {language === 'hi' ? 'व्हाट्सएप चैट करें' : 'Chat with Stylist'}
        </span>
      </a>

      {/* Lightbox Lookbook Modal */}
      <LightboxModal
        item={selectedLookbookItem}
        language={language}
        onClose={() => setSelectedLookbookItem(null)}
      />

      {/* VIP Fitting / Consultation Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        language={language}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </div>
  );
}
