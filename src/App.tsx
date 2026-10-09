import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Instagram,
  Facebook,
  Calendar,
  Sparkles,
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'casual' | 'ethnic' | 'kids' | 'wedding'>('all');
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
    <div className="min-h-screen bg-[#171916] text-[#F3F0E8] selection:bg-[#B49A68] selection:text-[#171916] relative font-sans">
      {/* Branded Introduction Screen (Section 8) */}
      <Preloader language={language} />

      {/* Restrained Desktop Custom Cursor (Section 14) */}
      <CustomCursor />

      {/* Scroll Progress Bar with Antique Brass Gradient */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#B49A68] via-[#DED6C8] to-[#263D32] z-[999] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Navigation Bar (Section 7) */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
      />

      <main>
        {/* ================= HOMEPAGE HERO (Section 9) ================= */}
        {/* Background: Ink Black #171916, Asymmetrical Editorial Composition */}
        <section
          id="home"
          className="relative min-h-[88svh] lg:min-h-[94svh] flex items-center px-6 sm:px-12 lg:px-16 py-16 lg:py-24 overflow-hidden bg-[#171916] border-b border-[#B49A68]/20"
        >
          {/* Asymmetrical Editorial Fashion Visual (occupying ~60-70% visual field on desktop) */}
          <div className="absolute inset-0 lg:left-[36%] z-0 overflow-hidden pointer-events-none">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=2400&q=80"
              alt="Contemporary Indian Menswear & Occasionwear"
              className="w-full h-full object-cover object-[center_28%] filter brightness-[0.45] lg:brightness-[0.55] contrast-[1.08] saturate-[0.88]"
            />
            {/* Soft dark vignetting creating high text legibility on the left column */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#171916] via-[#171916]/80 to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#171916]/75 via-[#171916]/45 to-[#171916] lg:hidden" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto w-full">
            <div className="max-w-2xl lg:max-w-xl">
              {/* Category / Location Kicker */}
              <div className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#B49A68] mb-6 font-medium">
                <span className="w-8 h-[1px] bg-[#B49A68]" />
                <span>{language === 'hi' ? 'जबलपुर · स्थापना 2011' : 'JABALPUR · EST. 2011'}</span>
              </div>

              {/* The Central Creative Headline: "YOUR STYLE. YOUR MOMENT." */}
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] leading-[1.0] text-[#F3F0E8] font-normal tracking-tight mb-8">
                {language === 'hi' ? (
                  <>
                    आपकी स्टाइल।<br />
                    <span className="italic text-[#B49A68]">आपका पल।</span>
                  </>
                ) : (
                  <>
                    YOUR STYLE.<br />
                    <span className="italic text-[#B49A68]">YOUR MOMENT.</span>
                  </>
                )}
              </h1>

              {/* Supporting Copy */}
              <p className="text-[#DED6C8] text-base sm:text-lg font-light leading-relaxed max-w-lg mb-10 font-sans">
                {language === 'hi'
                  ? 'अबाउट अस जबलपुर में आधुनिक मेन्स कैज़ुअल फैशन, बच्चों के परिधान और शादी-त्योहारों के खास स्टाइल की तलाश करें।'
                  : 'Discover contemporary men’s fashion, kidswear, and occasion-ready styles at About Us, Jabalpur.'}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#everyday"
                  className="inline-flex items-center gap-3 bg-[#F3F0E8] hover:bg-[#DED6C8] text-[#171916] px-7 py-3.5 rounded text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-200 group"
                >
                  <span>{language === 'hi' ? 'कलेक्शन देखें' : 'EXPLORE COLLECTIONS'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="inline-flex items-center gap-2.5 border border-[#B49A68]/60 hover:border-[#B49A68] text-[#F3F0E8] hover:bg-[#263D32]/30 px-6 py-3.5 rounded text-xs font-sans uppercase tracking-[0.2em] font-medium transition-all duration-200"
                >
                  <Calendar className="w-4 h-4 text-[#B49A68]" />
                  <span>{language === 'hi' ? 'स्टोर विज़िट बुक करें' : 'VISIT OUR STORE'}</span>
                </button>
              </div>

              {/* Three Concept Pillars strip */}
              <div className="mt-14 pt-8 border-t border-[#F3F0E8]/10 flex flex-wrap gap-8 text-[11px] tracking-[0.25em] uppercase text-[#DED6C8]/80 font-sans">
                <div>01 — <span className="text-[#F3F0E8] font-medium">EVERYDAY STYLE</span></div>
                <div>02 — <span className="text-[#F3F0E8] font-medium">OCCASION READY</span></div>
                <div>03 — <span className="text-[#F3F0E8] font-medium">FAMILY DRESSING</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MARQUEE EDITORIAL SEPARATOR ================= */}
        <div aria-hidden="true" className="bg-[#171916] border-b border-[#B49A68]/20 py-4 overflow-hidden">
          <div className="animate-marquee font-serif text-lg sm:text-xl text-[#DED6C8] tracking-[0.18em]">
            {[1, 2].map((i) => (
              <span key={i} className="flex items-center gap-12 whitespace-nowrap px-6">
                <span>Everyday Style</span>
                <span className="text-[#B49A68] text-xs">✦</span>
                <span>Occasion Ready</span>
                <span className="text-[#B49A68] text-xs">✦</span>
                <span>Family Dressing</span>
                <span className="text-[#B49A68] text-xs">✦</span>
                <span>Sherwanis &amp; Kurtas</span>
                <span className="text-[#B49A68] text-xs">✦</span>
                <span>Linen Shirts &amp; Denim</span>
                <span className="text-[#B49A68] text-xs">✦</span>
                <span>Boys Kidswear</span>
                <span className="text-[#B49A68] text-xs">✦</span>
                <span>Marhatal, Jabalpur</span>
                <span className="text-[#B49A68] text-xs">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ================= SECTION 01 — INTRODUCING THE BRAND (LIGHT SECTION) ================= */}
        {/* Background: Warm Ivory #F3F0E8 */}
        <section className="py-24 lg:py-36 px-6 sm:px-12 lg:px-16 bg-[#F3F0E8] text-[#171916] border-b border-[#B49A68]/20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Text Area with Generous Whitespace */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#263D32] mb-6 font-semibold font-sans">
                  <span className="w-8 h-[1px] bg-[#263D32]" />
                  <span>{language === 'hi' ? 'द सेंट्रल कॉन्सेप्ट' : 'THE PHILOSOPHY'}</span>
                </div>

                <h2 className="font-serif text-4xl sm:text-6xl text-[#171916] font-normal leading-[1.08] tracking-tight mb-8">
                  {language === 'hi' ? (
                    <>
                      शानदार स्टाइल किसी <br />
                      <span className="italic text-[#263D32]">एक मौके के लिए</span> नहीं होती।
                    </>
                  ) : (
                    <>
                      Good style isn’t for <br />
                      <span className="italic text-[#263D32]">one occasion.</span>
                    </>
                  )}
                </h2>

                <p className="text-[#292B27] text-base sm:text-lg font-light leading-relaxed max-w-xl mb-8 font-sans">
                  {language === 'hi'
                    ? 'रोज़मर्रा की पसंदीदा पोशाक से लेकर जीवन के सबसे खास उत्सवों तक — ऐसे परिधान जो हर पल को यादगार बनाते हैं। अबाउट अस में आधुनिक पुरुषों और बच्चों के लिए हर दिन का आत्मविश्वास और शादी-त्योहारों की शान एक ही छत के नीचे मौजूद है।'
                    : 'From everyday favourites to special celebrations, discover looks for the moments that matter. One customer might be shopping for a relaxed linen shirt. Another might be choosing a wedding sherwani. A parent might be dressing their child for festive gatherings.'}
                </p>

                {/* Three Visual Personalities */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#171916]/10 text-xs font-sans">
                  <div>
                    <span className="text-[#B49A68] font-serif text-base block font-normal">01</span>
                    <h4 className="font-semibold text-[#171916] uppercase tracking-wider mt-1 mb-1">
                      {language === 'hi' ? 'एवरीडे स्टाइल' : 'EVERYDAY STYLE'}
                    </h4>
                    <p className="text-[#88867F] font-light leading-snug">
                      {language === 'hi' ? 'रिलैक्स्ड, एनर्जेटिक और युवा आत्मविश्वास।' : 'Contemporary, relaxed, youthful & confident.'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#B49A68] font-serif text-base block font-normal">02</span>
                    <h4 className="font-semibold text-[#171916] uppercase tracking-wider mt-1 mb-1">
                      {language === 'hi' ? 'ऑकेज़न रेडी' : 'OCCASION READY'}
                    </h4>
                    <p className="text-[#88867F] font-light leading-snug">
                      {language === 'hi' ? 'सोफिस्टिकेटेड, सांस्कृतिक और शाही ठाठ।' : 'Polished, expressive & culturally relevant.'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#B49A68] font-serif text-base block font-normal">03</span>
                    <h4 className="font-semibold text-[#171916] uppercase tracking-wider mt-1 mb-1">
                      {language === 'hi' ? 'फैमिली स्टाइल' : 'FAMILY STYLE'}
                    </h4>
                    <p className="text-[#88867F] font-light leading-snug">
                      {language === 'hi' ? 'बच्चों के लिए आरामदायक और सुरुचिपूर्ण।' : 'Warm, approachable & comfortable.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Asymmetrical Overlapping Fashion Editorial Visual */}
              <div className="lg:col-span-5 relative">
                <div
                  data-cursor="view"
                  onClick={() => setSelectedLookbookItem(LOOKBOOK_ITEMS[0])}
                  className="aspect-[3/4] rounded overflow-hidden shadow-2xl bg-[#DED6C8] border border-[#B49A68]/30 cursor-pointer group"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80"
                    alt="Editorial Kurta and Bandhgala Craftsmanship"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                  />
                </div>
                {/* Secondary detail overlay card */}
                <div className="absolute -bottom-6 -left-6 bg-[#263D32] text-[#F3F0E8] p-5 rounded shadow-xl border border-[#B49A68]/30 max-w-[240px] hidden sm:block">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B49A68] block font-sans font-medium mb-1">
                    {language === 'hi' ? 'कलेक्शन झलक' : 'COLLECTION HIGHLIGHT'}
                  </span>
                  <p className="font-serif text-lg leading-tight font-normal">
                    {language === 'hi' ? 'शाही ब्रोकेड और लिनन फिनिश' : 'Bespoke Silk & Crisp Italian Linen'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 02 — MEN'S EVERYDAY STYLE ================= */}
        {/* Background: Soft Sand #DED6C8 */}
        <section id="everyday" className="py-24 lg:py-36 px-6 sm:px-12 lg:px-16 bg-[#DED6C8] text-[#171916] border-b border-[#B49A68]/20">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#263D32] mb-3 font-semibold font-sans">
                  <span className="w-7 h-[1px] bg-[#263D32]" />
                  <span>{language === 'hi' ? 'पुरुष रोज़मर्रा संग्रह' : "01 — MEN'S EVERYDAY STYLE"}</span>
                </span>
                <h2 className="font-serif text-4xl sm:text-6xl text-[#171916] font-normal leading-tight tracking-tight">
                  {language === 'hi' ? (
                    <>
                      हर दिन के लिए <span className="italic text-[#263D32]">तैयार।</span>
                    </>
                  ) : (
                    <>
                      Made for <span className="italic text-[#263D32]">everyday.</span>
                    </>
                  )}
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-[#292B27] text-sm sm:text-base font-light leading-relaxed font-sans">
                  {language === 'hi'
                    ? 'ऐसे कैज़ुअल स्टाइल जो आपकी दैनिक दिनचर्या और सहज व्यक्तित्व में पूरी तरह ढल जाएं। शुद्ध लिनन, जापानी सेल्वेज डेनिम और सुपरसॉफ्ट टी-शर्ट्स।'
                    : 'Explore casual styles that fit your everyday routine. Natural linen shirts, raw denim, and relaxed silhouettes built for effortless comfort.'}
                </p>
              </div>
            </div>

            {/* Dynamic Asymmetrical Layout: Large Image + Text & Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Large Image on Left (7 cols) */}
              <div
                data-cursor="explore"
                onClick={() => {
                  setActiveFilter('casual');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[1]);
                }}
                className="lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] rounded overflow-hidden bg-[#F3F0E8] border border-[#B49A68]/30 shadow-lg cursor-pointer group relative"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80"
                  alt="Men's Casual Wear Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171916]/80 via-transparent to-transparent flex flex-col justify-end p-8 text-[#F3F0E8]">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#B49A68] font-sans font-medium mb-1">
                    {language === 'hi' ? 'आराम और स्टाइल' : 'BREATHABLE & TAILORED'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal">
                    {language === 'hi' ? 'इटैलियन लिनन और हेवीवेट डेनिम' : 'Pure Linen Shirts & Selvedge Denim'}
                  </h3>
                </div>
              </div>

              {/* Smaller Detail Image + Key Categories on Right (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div
                  data-cursor="view"
                  onClick={() => {
                    setActiveFilter('casual');
                    setSelectedLookbookItem(LOOKBOOK_ITEMS[4]);
                  }}
                  className="aspect-[4/3] rounded overflow-hidden bg-[#F3F0E8] border border-[#B49A68]/30 shadow-md cursor-pointer group"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"
                    alt="Linen Button-down Details"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="bg-[#F3F0E8] p-6 rounded border border-[#B49A68]/20">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-[#263D32] font-semibold mb-3 font-sans">
                    {language === 'hi' ? 'कैज़ुअल वॉर्डरोब' : 'CASUAL STAPLES IN-STORE'}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-sans text-[#171916]">
                    <div className="py-1 border-b border-[#171916]/10">01. Crisp Linen Shirts</div>
                    <div className="py-1 border-b border-[#171916]/10">02. Pima Cotton Polos</div>
                    <div className="py-1 border-b border-[#171916]/10">03. Comfort Selvedge Denim</div>
                    <div className="py-1 border-b border-[#171916]/10">04. Tailored Chinos</div>
                  </div>
                  <div className="mt-5">
                    <a
                      href="#gallery"
                      onClick={() => setActiveFilter('casual')}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#171916] hover:text-[#263D32] group"
                    >
                      <span>{language === 'hi' ? 'कैज़ुअल लुक देखें' : 'EXPLORE CASUAL LOOKS'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 03 — OCCASIONWEAR (DARK SECTION) ================= */}
        {/* Background: Ink Black #171916 */}
        <section id="occasion" className="py-24 lg:py-36 px-6 sm:px-12 lg:px-16 bg-[#171916] text-[#F3F0E8] border-b border-[#B49A68]/20">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#B49A68] mb-3 font-semibold font-sans">
                  <span className="w-7 h-[1px] bg-[#B49A68]" />
                  <span>{language === 'hi' ? 'अवसर व उत्सव संग्रह' : '02 — OCCASION READY'}</span>
                </span>
                <h2 className="font-serif text-4xl sm:text-6xl text-[#F3F0E8] font-normal leading-tight tracking-tight">
                  {language === 'hi' ? (
                    <>
                      जब मौका कुछ खास की <br />
                      <span className="italic text-[#B49A68]">मांग करे।</span>
                    </>
                  ) : (
                    <>
                      When the moment <br />
                      <span className="italic text-[#B49A68]">calls for more.</span>
                    </>
                  )}
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-[#DED6C8] text-sm sm:text-base font-light leading-relaxed font-sans">
                  {language === 'hi'
                    ? 'उत्सवों, शादियों और खास पारिवारिक मिलन के लिए एथनिक और अवसर-अनुकूल परिधान। शाही शेरवानी, जरदोज़ी काम और आधुनिक इंडो-वेस्टर्न कट्स।'
                    : 'Discover ethnic and occasion-ready styles for celebrations, weddings, and special gatherings. Regal silhouettes and rich textile craft without excessive ornamentation.'}
                </p>
              </div>
            </div>

            {/* Asymmetrical 3-Card Editorial Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: The Groom Sherwani */}
              <div
                data-cursor="view"
                onClick={() => {
                  setActiveFilter('wedding');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[3]);
                }}
                className="relative aspect-[4/5] rounded overflow-hidden bg-[#292B27] border border-[#B49A68]/40 shadow-xl group cursor-pointer"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                  alt="The Groom Wedding Sherwani"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.78] group-hover:brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171916] via-[#171916]/40 to-transparent p-7 flex flex-col justify-end">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#B49A68] font-sans font-medium mb-1">
                    {language === 'hi' ? 'दूल्हे का संग्रह' : 'THE GROOM EDIT'}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F3F0E8] font-normal mb-2">
                    {language === 'hi' ? 'शाही जरदोज़ी शेरवानी' : 'Imperial Zardozi Sherwanis'}
                  </h3>
                  <p className="text-xs text-[#DED6C8]/80 font-light font-sans">
                    {language === 'hi' ? 'मोती, साफा और मैचिंग दुशाला के साथ पूर्ण सेट।' : 'Intricate embroidery with coordinated safa & stole.'}
                  </p>
                </div>
              </div>

              {/* Card 2: Festive & Guest Looks */}
              <div
                data-cursor="view"
                onClick={() => {
                  setActiveFilter('ethnic');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[7]);
                }}
                className="relative aspect-[4/5] rounded overflow-hidden bg-[#292B27] border border-[#B49A68]/20 shadow-lg group cursor-pointer"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&w=1000&q=80"
                  alt="Festive Kurtas and Nehru Jackets"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.78] group-hover:brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171916] via-[#171916]/40 to-transparent p-7 flex flex-col justify-end">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#B49A68] font-sans font-medium mb-1">
                    {language === 'hi' ? 'त्योहार व मेहमान' : 'WEDDING GUEST & SANGEET'}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F3F0E8] font-normal mb-2">
                    {language === 'hi' ? 'कुर्ता-जैकेट ट्विन सेट' : 'Nehru Jackets & Silk Kurtas'}
                  </h3>
                  <p className="text-xs text-[#DED6C8]/80 font-light font-sans">
                    {language === 'hi' ? 'शादी के मेहमानों और पूजा के लिए हल्के पेस्टल रंग।' : 'Subtle jewel and pastel tones for family celebrations.'}
                  </p>
                </div>
              </div>

              {/* Card 3: Indo-Western Fusion */}
              <div
                data-cursor="view"
                onClick={() => {
                  setActiveFilter('ethnic');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[6]);
                }}
                className="relative aspect-[4/5] rounded overflow-hidden bg-[#292B27] border border-[#B49A68]/20 shadow-lg group cursor-pointer"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1615887110697-a5e0f4c8e0e3?auto=format&fit=crop&w=1000&q=80"
                  alt="Indo-Western Fusion Drape"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.78] group-hover:brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171916] via-[#171916]/40 to-transparent p-7 flex flex-col justify-end">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#B49A68] font-sans font-medium mb-1">
                    {language === 'hi' ? 'मॉडर्न फ्यूज़न' : 'INDO-WESTERN DRAPES'}
                  </span>
                  <h3 className="font-serif text-2xl text-[#F3F0E8] font-normal mb-2">
                    {language === 'hi' ? 'एसिमेट्रिक बंधगला' : 'Asymmetric Bandhgalas'}
                  </h3>
                  <p className="text-xs text-[#DED6C8]/80 font-light font-sans">
                    {language === 'hi' ? 'कॉकटेल और संगीत रातों के लिए आधुनिक स्टाइल।' : 'Contemporary drapes for cocktails & receptions.'}
                  </p>
                </div>
              </div>
            </div>

            {/* In-Store Fitting Callout */}
            <div className="mt-14 pt-8 border-t border-[#F3F0E8]/10 flex flex-wrap justify-between items-center gap-6">
              <div className="text-xs font-sans text-[#DED6C8]">
                <span className="text-[#B49A68] font-medium mr-2">✦</span>
                {language === 'hi'
                  ? 'मरहटल शोरूम में कस्टम फिटिंग, अल्टरेशन और मैचिंग साफा-माला उपलब्ध है।'
                  : 'In-house alterations, bespoke sizing & matching safas available at our Marhatal showroom.'}
              </div>
              <button
                type="button"
                onClick={() => setIsEnquiryModalOpen(true)}
                className="inline-flex items-center gap-2 border border-[#B49A68] hover:bg-[#B49A68] hover:text-[#171916] text-[#F3F0E8] px-5 py-2.5 rounded text-xs font-sans uppercase tracking-[0.18em] transition-all duration-200"
              >
                <span>{language === 'hi' ? 'शेरवानी ट्रायल बुक करें' : 'BOOK SHERWANI TRIAL'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ================= SECTION 04 — KIDSWEAR (LIGHT SECTION) ================= */}
        {/* Background: Warm Ivory #F3F0E8 */}
        <section id="kids" className="py-24 lg:py-36 px-6 sm:px-12 lg:px-16 bg-[#F3F0E8] text-[#171916] border-b border-[#B49A68]/20">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#263D32] mb-3 font-semibold font-sans">
                  <span className="w-7 h-[1px] bg-[#263D32]" />
                  <span>{language === 'hi' ? 'बच्चों का संग्रह' : '03 — FAMILY & KIDS STYLE'}</span>
                </span>
                <h2 className="font-serif text-4xl sm:text-6xl text-[#171916] font-normal leading-tight tracking-tight">
                  {language === 'hi' ? (
                    <>
                      छोटे कपड़े। <span className="italic text-[#263D32]">बड़े पल।</span>
                    </>
                  ) : (
                    <>
                      Little looks. <span className="italic text-[#263D32]">Big moments.</span>
                    </>
                  )}
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-[#292B27] text-sm sm:text-base font-light leading-relaxed font-sans">
                  {language === 'hi'
                    ? 'बच्चों के रोज़मर्रा के रोमांच और खास पारिवारिक उत्सवों के लिए मनमोहक परिधान। 1 से 14 वर्ष के बालकों के लिए आरामदायक कॉटन और उत्सव के खास कुर्ते।'
                    : 'Explore children’s styles for everyday adventures and special occasions. Tailored with skin-friendly linings and comfortable mobility for boys ages 1 to 14.'}
                </p>
              </div>
            </div>

            {/* 2-Column Kidswear Showcase: Everyday Comfort & Celebration Partywear */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Card 1: Kids Everyday Casual (5 cols) */}
              <div
                data-cursor="view"
                onClick={() => {
                  setActiveFilter('kids');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[2]);
                }}
                className="lg:col-span-5 aspect-[4/5] rounded overflow-hidden bg-[#DED6C8] border border-[#B49A68]/30 shadow-md group cursor-pointer relative"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1200&q=80"
                  alt="Kids Casual & Comfort"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171916]/80 via-transparent to-transparent p-7 flex flex-col justify-end text-[#F3F0E8]">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#B49A68] font-sans font-medium mb-1">
                    {language === 'hi' ? 'रोज़मर्रा का आराम' : 'EVERYDAY COMFORT'}
                  </span>
                  <h3 className="font-serif text-2xl font-normal">
                    {language === 'hi' ? 'सॉफ्ट कॉटन टीज़ और शॉर्ट्स' : 'Soft Cottons & Playful Casuals'}
                  </h3>
                </div>
              </div>

              {/* Card 2: Kids Festive & Party Tuxedo (7 cols) */}
              <div
                data-cursor="view"
                onClick={() => {
                  setActiveFilter('kids');
                  setSelectedLookbookItem(LOOKBOOK_ITEMS[5]);
                }}
                className="lg:col-span-7 aspect-[16/11] rounded overflow-hidden bg-[#DED6C8] border border-[#B49A68]/30 shadow-lg group cursor-pointer relative"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1400&q=80"
                  alt="Boys Celebration Tuxedos and Kurtas"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171916]/85 via-transparent to-transparent p-8 flex flex-col justify-end text-[#F3F0E8]">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#B49A68] font-sans font-medium mb-1">
                    {language === 'hi' ? 'त्योहार और पार्टी' : 'FESTIVE & CELEBRATION'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-2">
                    {language === 'hi' ? 'नन्हे राजकुमारों के लिए सूट और कुर्ते' : 'Junior Gentleman Suits & Kurta-Dhoti'}
                  </h3>
                  <p className="text-xs text-[#DED6C8]/80 font-light font-sans max-w-md">
                    {language === 'hi'
                      ? 'पारिवारिक शादियों और जन्मदिन के लिए तैयार थ्री-पीस सूट और मुलायम ब्रोकेड कुर्ते।'
                      : 'Three-piece tailored suits, waistcoats and festive kurta-dhoti sets crafted with skin-gentle linings.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 05 — LATEST LOOKS / GALLERY ================= */}
        {/* Background: Soft Sand #DED6C8 */}
        <section id="gallery" className="py-24 lg:py-36 px-6 sm:px-12 lg:px-16 bg-[#DED6C8] text-[#171916] border-b border-[#B49A68]/20">
          <div className="max-w-[1400px] mx-auto">
            {/* Header & Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
              <div>
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#263D32] mb-3 font-semibold font-sans">
                  <span className="w-7 h-[1px] bg-[#263D32]" />
                  <span>{language === 'hi' ? 'एडिटोरियल गैलरी' : 'CURATED LOOKBOOK'}</span>
                </span>
                <h2 className="font-serif text-4xl sm:text-6xl text-[#171916] font-normal leading-tight tracking-tight">
                  {language === 'hi' ? (
                    <>
                      एक <span className="italic text-[#263D32]">नज़दीकी नज़र।</span>
                    </>
                  ) : (
                    <>
                      A closer <span className="italic text-[#263D32]">look.</span>
                    </>
                  )}
                </h2>
              </div>

              {/* Functional Segmented Filter Controls */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F3F0E8] rounded border border-[#B49A68]/30 text-xs font-sans">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={`px-3.5 py-1.5 rounded transition-all whitespace-nowrap font-medium ${
                    activeFilter === 'all'
                      ? 'bg-[#171916] text-[#F3F0E8] shadow-sm'
                      : 'text-[#88867F] hover:text-[#171916]'
                  }`}
                >
                  {language === 'hi' ? 'सभी' : 'All Looks'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('casual')}
                  className={`px-3.5 py-1.5 rounded transition-all whitespace-nowrap font-medium ${
                    activeFilter === 'casual'
                      ? 'bg-[#171916] text-[#F3F0E8] shadow-sm'
                      : 'text-[#88867F] hover:text-[#171916]'
                  }`}
                >
                  {language === 'hi' ? 'कैज़ुअल' : 'Everyday Casual'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('ethnic')}
                  className={`px-3.5 py-1.5 rounded transition-all whitespace-nowrap font-medium ${
                    activeFilter === 'ethnic'
                      ? 'bg-[#171916] text-[#F3F0E8] shadow-sm'
                      : 'text-[#88867F] hover:text-[#171916]'
                  }`}
                >
                  {language === 'hi' ? 'एथनिक' : 'Ethnicwear'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('kids')}
                  className={`px-3.5 py-1.5 rounded transition-all whitespace-nowrap font-medium ${
                    activeFilter === 'kids'
                      ? 'bg-[#171916] text-[#F3F0E8] shadow-sm'
                      : 'text-[#88867F] hover:text-[#171916]'
                  }`}
                >
                  {language === 'hi' ? 'बच्चे' : 'Kidswear'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('wedding')}
                  className={`px-3.5 py-1.5 rounded transition-all whitespace-nowrap font-medium ${
                    activeFilter === 'wedding'
                      ? 'bg-[#171916] text-[#F3F0E8] shadow-sm'
                      : 'text-[#88867F] hover:text-[#171916]'
                  }`}
                >
                  {language === 'hi' ? 'शेरवानी' : 'Wedding Sherwanis'}
                </button>
              </div>
            </div>

            {/* Varied Editorial Grid with intentional asymmetric scales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredLookbook.map((item, index) => (
                <div
                  key={item.id}
                  data-cursor="view"
                  onClick={() => setSelectedLookbookItem(item)}
                  className={`group relative bg-[#F3F0E8] border border-[#B49A68]/30 rounded overflow-hidden cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1 ${
                    index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                  }`}
                >
                  <div className={`overflow-hidden bg-[#171916] ${index === 0 ? 'aspect-square sm:aspect-[4/3]' : 'aspect-[4/5]'}`}>
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={language === 'hi' ? item.titleHi : item.titleEn}
                      fallbackTitle={language === 'hi' ? item.titleHi : item.titleEn}
                      fallbackCategory={language === 'hi' ? item.categoryHi : item.categoryEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                    />
                  </div>

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171916]/95 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-[#F3F0E8]">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#B49A68] font-sans font-medium block mb-1">
                      {language === 'hi' ? item.categoryHi : item.categoryEn}
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl text-[#F3F0E8] font-normal leading-snug line-clamp-1">
                      {language === 'hi' ? item.titleHi : item.titleEn}
                    </h4>
                    <div className="mt-2 text-xs text-[#DED6C8]/80 flex items-center justify-between font-sans">
                      <span>{language === 'hi' ? item.tagHi : item.tagEn}</span>
                      <span className="text-[#B49A68] group-hover:translate-x-1 transition-transform">
                        {language === 'hi' ? 'विवरण देखें →' : 'View Look →'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 06 — SEASONAL COLLECTION EDIT ================= */}
        {/* Full Bleed Campaign Banner */}
        <section className="relative py-28 lg:py-40 px-6 sm:px-12 lg:px-16 overflow-hidden bg-[#171916] border-b border-[#B49A68]/20">
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=2400&q=80"
              alt="Seasonal Wedding & Festive Campaign"
              className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.1] saturate-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#171916] via-[#171916]/70 to-[#171916]/50" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#B49A68] mb-4 font-semibold font-sans">
                <span className="w-8 h-[1px] bg-[#B49A68]" />
                <span>{language === 'hi' ? 'मौसमी संग्रह' : 'CURRENT CAMPAIGN'}</span>
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl text-[#F3F0E8] font-normal leading-[1.08] tracking-tight mb-6">
                {language === 'hi' ? (
                  <>
                    नया मौसम। <br />
                    <span className="italic text-[#B49A68]">नई संभावनाएं।</span>
                  </>
                ) : (
                  <>
                    New season. <br />
                    <span className="italic text-[#B49A68]">New possibilities.</span>
                  </>
                )}
              </h2>
              <p className="text-[#DED6C8] text-base font-light leading-relaxed mb-8 font-sans">
                {language === 'hi'
                  ? 'आगामी विवाह और उत्सवों के लिए विशेष रूप से चुने गए परिधान अब जबलपुर शोरूम में उपलब्ध हैं। बेस्पोक फिट और उचित दाम।'
                  : 'Curated fresh arrivals for the festive and wedding season now available in Jabalpur. Refined silhouettes that combine tradition with modern ease.'}
              </p>
              <button
                type="button"
                onClick={() => setIsEnquiryModalOpen(true)}
                className="inline-flex items-center gap-2.5 bg-[#F3F0E8] hover:bg-[#DED6C8] text-[#171916] px-7 py-3.5 rounded text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-200"
              >
                <span>{language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'BOOK AN APPOINTMENT'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ================= SECTION 07 — ABOUT THE SHOWROOM (DEEP FOREST SECTION) ================= */}
        {/* Background: Deep Forest #263D32 */}
        <section id="showroom" className="py-24 lg:py-36 px-6 sm:px-12 lg:px-16 bg-[#263D32] text-[#F3F0E8] border-b border-[#B49A68]/20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Authentic Showroom Image */}
              <div className="lg:col-span-5 relative aspect-[4/5] rounded overflow-hidden bg-[#171916] border border-[#B49A68]/30 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80"
                  alt="About Us Showroom Interior in Jabalpur"
                  className="w-full h-full object-cover filter brightness-90"
                />
                <div className="absolute inset-0 border border-[#B49A68]/30 m-4 pointer-events-none" />
                <div className="absolute bottom-6 right-6 bg-[#171916]/95 border border-[#B49A68] text-[#F3F0E8] p-4 rounded text-center">
                  <span className="font-serif text-3xl font-normal block leading-none text-[#B49A68]">2011</span>
                  <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-medium block mt-1">
                    {language === 'hi' ? 'स्थापना वर्ष' : 'ESTABLISHED'}
                  </span>
                </div>
              </div>

              {/* Editorial Copy: Local Trust & Identity */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#B49A68] mb-4 font-semibold font-sans">
                  <span className="w-8 h-[1px] bg-[#B49A68]" />
                  <span>{language === 'hi' ? 'हमारा शोरूम' : 'OUR HERITAGE'}</span>
                </div>

                <h2 className="font-serif text-4xl sm:text-6xl text-[#F3F0E8] font-normal leading-[1.08] tracking-tight mb-8">
                  {language === 'hi' ? (
                    <>
                      जबलपुर का अपना नाम। <br />
                      <span className="italic text-[#B49A68]">आपकी अपनी पहचान।</span>
                    </>
                  ) : (
                    <>
                      A local name. <br />
                      <span className="italic text-[#B49A68]">A style of your own.</span>
                    </>
                  )}
                </h2>

                <div className="space-y-5 text-[#DED6C8] text-base font-light leading-relaxed max-w-xl mb-10 font-sans">
                  <p>
                    {language === 'hi'
                      ? 'अबाउट अस — द मेन्स एंड किड्स स्टोर 2011 से जबलपुर के परिवारों को उनके खास पलों के लिए तैयार कर रहा है। एक युवा की पहली इंटरव्यू शर्ट से लेकर विवाह की भव्य शेरवानी और नन्हे बच्चों के पहले उत्सव तक — हम इस शहर की खुशियों के साक्षी रहे हैं।'
                      : 'About Us brings together men’s fashion, kidswear, and occasion-ready clothing for shoppers in Jabalpur. Established in 2011, our showroom combines current silhouettes, authentic textile craft, and honest prices under one roof at Marhatal.'}
                  </p>
                  <p>
                    {language === 'hi'
                      ? 'हमारा उद्देश्य अंतरराष्ट्रीय ब्रांड का दिखावा करना नहीं, बल्कि जबलपुर के समझदार ग्राहकों को उत्तम गुणवत्ता और सहज स्टाइल उपलब्ध कराना है।'
                      : 'We communicate local familiarity and lasting trust rather than pretending to be an inaccessible runway label. Real fashion for real moments.'}
                  </p>
                </div>

                {/* Trust Proof Metrics */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#F3F0E8]/15 font-sans">
                  {STORE_FEATURES.map((feat) => (
                    <div key={feat.number}>
                      <span className="font-serif text-3xl sm:text-4xl text-[#B49A68] block font-normal leading-none mb-1">
                        {feat.number}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[#F3F0E8] font-medium block mb-1">
                        {language === 'hi' ? feat.titleHi : feat.titleEn}
                      </span>
                      <p className="text-xs text-[#DED6C8]/70 font-light hidden sm:block">
                        {language === 'hi' ? feat.descHi : feat.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 08 — VISIT THE SHOWROOM (LIGHT SECTION) ================= */}
        {/* Background: Warm Ivory #F3F0E8 */}
        <section id="visit" className="py-24 lg:py-36 px-6 sm:px-12 lg:px-16 bg-[#F3F0E8] text-[#171916] border-b border-[#B49A68]/20">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#263D32] mb-3 font-semibold font-sans">
                  <span className="w-7 h-[1px] bg-[#263D32]" />
                  <span>{language === 'hi' ? 'शोरूम विज़िट' : 'FIND US IN JABALPUR'}</span>
                </span>
                <h2 className="font-serif text-4xl sm:text-6xl text-[#171916] font-normal leading-tight tracking-tight">
                  {language === 'hi' ? (
                    <>
                      आपका अगला लुक <br />
                      <span className="italic text-[#263D32]">यहीं से शुरू होता है।</span>
                    </>
                  ) : (
                    <>
                      Your next look <br />
                      <span className="italic text-[#263D32]">starts here.</span>
                    </>
                  )}
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-[#292B27] text-sm sm:text-base font-light leading-relaxed font-sans">
                  {language === 'hi'
                    ? 'शोरूम में पधारें, कपड़ा महसूस करें और हमारे स्टाइलिस्ट्स की मदद से सही फिटिंग का चयन करें।'
                    : 'Step in during store hours or message us on WhatsApp. Feel the natural textures and let our staff assist you.'}
                </p>
              </div>
            </div>

            {/* Editorial 2-Column Location Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Verified Location & Contacts */}
              <div className="lg:col-span-5 bg-[#DED6C8] p-8 sm:p-10 rounded border border-[#B49A68]/30 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4 items-start pb-6 border-b border-[#171916]/10">
                    <div className="w-10 h-10 rounded bg-[#263D32] text-[#F3F0E8] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-[#B49A68]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#263D32] block mb-1 font-semibold font-sans">
                        {language === 'hi' ? 'पता' : 'ADDRESS'}
                      </span>
                      <p className="text-sm sm:text-base text-[#171916] font-normal leading-relaxed">
                        {language === 'hi' ? STORE_ADDRESS_HI : STORE_ADDRESS_EN}
                      </p>
                      <span className="text-xs text-[#88867F] mt-1 block">
                        {language === 'hi' ? 'लैंडमार्क: गुरुद्वारा के पास, टीन पट्टी रोड' : 'Landmark: Beside Gurudwara, Teen Patti Road'}
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start pb-6 border-b border-[#171916]/10">
                    <div className="w-10 h-10 rounded bg-[#263D32] text-[#F3F0E8] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5 text-[#B49A68]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#263D32] block mb-1 font-semibold font-sans">
                        {language === 'hi' ? 'संपर्क' : 'PHONE & WHATSAPP'}
                      </span>
                      <div className="flex items-center gap-3">
                        <a
                          href={`tel:${STORE_PHONE}`}
                          className="text-base sm:text-lg text-[#171916] hover:text-[#263D32] font-semibold transition-colors"
                        >
                          {STORE_PHONE_DISPLAY}
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyPhone}
                          className="p-1.5 text-[#88867F] hover:text-[#171916] transition-colors"
                          title="Copy phone"
                        >
                          {copiedPhone ? <Check className="w-4 h-4 text-[#263D32]" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded bg-[#263D32] text-[#F3F0E8] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-[#B49A68]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#263D32] block mb-1 font-semibold font-sans">
                        {language === 'hi' ? 'शोरूम समय' : 'HOURS'}
                      </span>
                      <p className="text-sm sm:text-base text-[#171916] font-normal">
                        {language === 'hi' ? STORE_HOURS_HI : STORE_HOURS_EN}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick In-Store Trial Action */}
                <div className="pt-8 mt-6 border-t border-[#171916]/10 flex flex-wrap gap-3">
                  <a
                    href={`tel:${STORE_PHONE}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#171916] hover:bg-[#292B27] text-[#F3F0E8] py-3 px-5 rounded text-xs font-sans uppercase tracking-[0.18em] font-semibold transition-all duration-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B49A68]" />
                    <span>{language === 'hi' ? 'कॉल करें' : 'Call Store'}</span>
                  </a>

                  <a
                    href={STORE_WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#263D32] hover:bg-[#2e4a3d] text-[#F3F0E8] py-3 px-5 rounded text-xs font-sans uppercase tracking-[0.18em] font-semibold transition-all duration-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#B49A68]" />
                    <span>{language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsEnquiryModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 border border-[#263D32] text-[#263D32] hover:bg-[#263D32] hover:text-[#F3F0E8] py-3 px-5 rounded text-xs font-sans uppercase tracking-[0.18em] font-semibold transition-all duration-200"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'ट्रायल अपॉइंटमेंट आरक्षित करें' : 'Reserve Trial Fitting'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Google Maps Embed with Clean Framing */}
              <div className="lg:col-span-7 min-h-[380px] rounded overflow-hidden border border-[#B49A68]/30 relative bg-[#DED6C8]">
                <iframe
                  title="About Us Showroom Location — Marhatal, Jabalpur"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[380px] filter saturate-[0.85] contrast-[1.05]"
                  src="https://www.google.com/maps?q=Marhatal%2C%20Jabalpur%2C%20Madhya%20Pradesh&output=embed"
                />
                <div className="absolute top-4 left-4 bg-[#171916]/90 backdrop-blur-sm px-4 py-2 border border-[#B49A68]/30 rounded text-xs text-[#F3F0E8]">
                  <span className="text-[#B49A68] font-semibold">About Us</span> · Marhatal, Jabalpur
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 09 — FINAL CAMPAIGN (DARK SECTION) ================= */}
        {/* Background: Ink Black #171916 */}
        <section className="py-24 lg:py-36 px-6 sm:px-12 lg:px-16 bg-[#171916] text-[#F3F0E8] text-center border-b border-[#B49A68]/20 relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#B49A68] mb-6 font-semibold font-sans">
              <span className="w-8 h-[1px] bg-[#B49A68]" />
              <span>{language === 'hi' ? 'स्वागत है' : 'ABOUT US · JABALPUR'}</span>
              <span className="w-8 h-[1px] bg-[#B49A68]" />
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F3F0E8] font-normal leading-[1.08] tracking-tight mb-6">
              {language === 'hi' ? (
                <>
                  आइए, अपना <span className="italic text-[#B49A68]">लुक तलाशिए।</span>
                </>
              ) : (
                <>
                  Come find <span className="italic text-[#B49A68]">your look.</span>
                </>
              )}
            </h2>

            <p className="text-[#DED6C8] text-base font-light max-w-lg mx-auto mb-10 leading-relaxed font-sans">
              {language === 'hi'
                ? 'अबाउट अस, जबलपुर में नए कलेक्शन का अन्वेषण करें। रोज़मर्रा के स्टाइल से लेकर विवाह के सबसे बड़े दिन तक।'
                : 'Explore the collections at About Us, Jabalpur. From relaxed weekend linen to celebratory wedding sherwanis.'}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href={STORE_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#F3F0E8] hover:bg-[#DED6C8] text-[#171916] px-8 py-3.5 rounded text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-200 group"
              >
                <span>{language === 'hi' ? 'व्हाट्सएप पर पूछें' : 'VISIT ABOUT US'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="https://maps.google.com/?q=Marhatal+Jabalpur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-[#B49A68]/50 hover:border-[#B49A68] text-[#F3F0E8] px-8 py-3.5 rounded text-xs font-sans uppercase tracking-[0.2em] font-medium transition-all duration-200"
              >
                <MapPin className="w-4 h-4 text-[#B49A68]" />
                <span>{language === 'hi' ? 'गूगल मैप्स नेविगेशन' : 'GET DIRECTIONS'}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ================= SECTION 10 — FOOTER ================= */}
      {/* Background: Ink Black #171916 / Warm Charcoal #292B27 */}
      <footer className="bg-[#171916] pt-20 pb-12 px-6 sm:px-12 lg:px-16 text-[#DED6C8] text-sm">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#F3F0E8]/10">
          {/* Brand Wordmark & Descriptor */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col tracking-[0.22em] font-serif text-2xl text-[#F3F0E8] font-normal leading-none">
              <span>ABOUT US</span>
              <span className="font-sans text-[10px] tracking-[0.38em] text-[#B49A68] uppercase font-medium mt-1">
                {language === 'hi' ? 'द मेन्स एंड किड्स स्टोर' : "THE MEN'S & KIDS STORE"}
              </span>
            </div>
            <p className="text-[#DED6C8] font-light max-w-sm text-sm leading-relaxed font-sans">
              {language === 'hi'
                ? 'जबलपुर का विश्वसनीय पुरुष और बच्चों के फैशन का ठिकाना। समकालीन कैज़ुअल, उत्सव और शादी की पोशाकें।'
                : 'Contemporary men’s fashion, kidswear, and occasion-ready dressing in the heart of Jabalpur since 2011.'}
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={STORE_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded border border-[#B49A68]/30 hover:border-[#B49A68] hover:bg-[#263D32] flex items-center justify-center transition-all text-[#F3F0E8]"
              >
                <MessageCircle className="w-4 h-4 text-[#B49A68]" />
              </a>
              <a
                href="https://instagram.com/aboutus_jabalpur"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded border border-[#B49A68]/30 hover:border-[#B49A68] hover:bg-[#263D32] flex items-center justify-center transition-all text-[#F3F0E8]"
              >
                <Instagram className="w-4 h-4 text-[#B49A68]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded border border-[#B49A68]/30 hover:border-[#B49A68] hover:bg-[#263D32] flex items-center justify-center transition-all text-[#F3F0E8]"
              >
                <Facebook className="w-4 h-4 text-[#B49A68]" />
              </a>
            </div>
          </div>

          {/* Directory */}
          <div className="lg:col-span-2 space-y-3 font-sans text-xs uppercase tracking-[0.2em]">
            <h4 className="text-[#B49A68] font-semibold text-[11px] mb-4">
              {language === 'hi' ? 'कलेक्शन' : 'COLLECTIONS'}
            </h4>
            <p><a href="#everyday" className="hover:text-[#F3F0E8] transition-colors">{language === 'hi' ? 'एवरीडे स्टाइल' : 'Everyday Style'}</a></p>
            <p><a href="#occasion" className="hover:text-[#F3F0E8] transition-colors">{language === 'hi' ? 'अवसर व शेरवानी' : 'Occasionwear'}</a></p>
            <p><a href="#kids" className="hover:text-[#F3F0E8] transition-colors">{language === 'hi' ? 'बच्चों के कपड़े' : 'Kidswear'}</a></p>
            <p><a href="#gallery" className="hover:text-[#F3F0E8] transition-colors">{language === 'hi' ? 'एडिटोरियल गैलरी' : 'Lookbook'}</a></p>
          </div>

          {/* Showroom Address */}
          <div className="lg:col-span-3 space-y-2 text-xs font-sans">
            <h4 className="text-[#B49A68] uppercase tracking-[0.2em] font-semibold text-[11px] mb-4">
              {language === 'hi' ? 'शोरूम पता' : 'SHOWROOM'}
            </h4>
            <p className="text-[#F3F0E8] font-light leading-relaxed">{STORE_ADDRESS_EN}</p>
            <p className="text-[#88867F] pt-1">{STORE_HOURS_EN}</p>
          </div>

          {/* Contacts */}
          <div className="lg:col-span-2 space-y-2 text-xs font-sans">
            <h4 className="text-[#B49A68] uppercase tracking-[0.2em] font-semibold text-[11px] mb-4">
              {language === 'hi' ? 'संपर्क' : 'CONNECT'}
            </h4>
            <p>
              <a href={`tel:${STORE_PHONE}`} className="hover:text-[#B49A68] transition-colors font-semibold">
                {STORE_PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <a href={STORE_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#B49A68] transition-colors">
                WhatsApp Us
              </a>
            </p>
            <p>
              <a href="https://instagram.com/aboutus_jabalpur" target="_blank" rel="noopener noreferrer" className="hover:text-[#B49A68] transition-colors">
                @aboutus_jabalpur
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1400px] mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#88867F] font-sans">
          <span>
            © {new Date().getFullYear()} About Us — The Men&apos;s &amp; Kids Store, Jabalpur.
          </span>
          <span className="text-[#B49A68]/80">
            {language === 'hi' ? 'जबलपुर · स्थापना 2011' : 'Jabalpur · Est. 2011'}
          </span>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action with restrained Deep Forest / Green tone */}
      <a
        href={STORE_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Enquiry"
        className="wa-pulse fixed bottom-6 right-6 z-[800] w-13 h-13 rounded-full bg-[#263D32] border border-[#B49A68]/40 text-[#F3F0E8] flex items-center justify-center transition-transform hover:scale-110 shadow-2xl group"
      >
        <MessageCircle className="w-6 h-6 text-[#B49A68]" />
        <span className="absolute right-16 bg-[#171916]/95 text-[#F3F0E8] text-[10px] font-sans uppercase tracking-wider px-3 py-1.5 rounded border border-[#B49A68]/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          {language === 'hi' ? 'व्हाट्सएप चैट' : 'Chat on WhatsApp'}
        </span>
      </a>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedLookbookItem}
        language={language}
        onClose={() => setSelectedLookbookItem(null)}
      />

      {/* Showroom Consultation Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        language={language}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </div>
  );
}
