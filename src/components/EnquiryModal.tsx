import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, MessageCircle } from 'lucide-react';
import { Language, AppointmentFormData } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  language,
  onClose,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    occasion: 'Groom Sherwani & Wedding',
    preferredDate: '',
    preferredTime: '12:00 PM - 02:00 PM',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const text = encodeURIComponent(
      `Hello About Us Jabalpur, I would like to book a showroom visit / trial.\n\n` +
      `• Name: ${formData.fullName}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Category/Occasion: ${formData.occasion}\n` +
      `• Date: ${formData.preferredDate || 'Upcoming weekend'}\n` +
      `• Time: ${formData.preferredTime}\n` +
      (formData.notes ? `• Notes: ${formData.notes}` : '')
    );

    // Open WhatsApp in a new tab after submission
    setTimeout(() => {
      window.open(`https://wa.me/919713102229?text=${text}`, '_blank');
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-[9990] bg-[#171916]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-[#292B27] border border-[#B49A68]/30 rounded p-6 sm:p-8 shadow-2xl text-[#F3F0E8]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#DED6C8] hover:text-[#F3F0E8] p-2 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#263D32] border border-[#B49A68] flex items-center justify-center text-[#B49A68]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F3F0E8]">
              {language === 'hi' ? 'ट्रायल अनुरोध प्राप्त हुआ!' : 'Visit Request Scheduled!'}
            </h3>
            <p className="text-sm text-[#DED6C8] max-w-md mx-auto font-light font-sans">
              {language === 'hi'
                ? 'हमारा स्टोर प्रतिनिधि आपके नंबर पर पुष्टि के लिए संपर्क करेगा। आप व्हाट्सएप पर भी तुरंत बात कर सकते हैं।'
                : 'Our showroom stylist will confirm your appointment shortly. You are also redirected to WhatsApp.'}
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded border border-[#B49A68]/40 text-xs uppercase tracking-[0.2em] font-sans hover:bg-[#F3F0E8]/10 transition-colors"
              >
                {language === 'hi' ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#B49A68] font-sans font-medium mb-1.5">
              <Calendar className="w-4 h-4 text-[#B49A68]" />
              <span>{language === 'hi' ? 'शोरूम अपॉइंटमेंट' : 'Showroom Consultation'}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F3F0E8] mb-2 font-normal">
              {language === 'hi' ? 'व्यक्तिगत ट्रायल व कंसल्टेशन' : 'Book a VIP Fitting Trial'}
            </h3>
            <p className="text-xs text-[#DED6C8] font-light mb-6 font-sans">
              {language === 'hi'
                ? 'शादी की शेरवानी, त्योहार कुर्ते, या बच्चों के खास परिधानों के चयन के लिए हमारे मरहटल स्टोर में समय आरक्षित करें।'
                : 'Reserve dedicated styling assistance for wedding sherwanis, festive family sets, or boys formalwear at Marhatal.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#DED6C8] uppercase tracking-wider text-[10px] mb-1.5 font-medium">
                    {language === 'hi' ? 'पूरा नाम' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full bg-[#171916] border border-[#B49A68]/30 rounded px-3 py-2.5 text-sm text-[#F3F0E8] focus:border-[#B49A68] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#DED6C8] uppercase tracking-wider text-[10px] mb-1.5 font-medium">
                    {language === 'hi' ? 'मोबाइल नंबर' : 'Phone / WhatsApp'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#171916] border border-[#B49A68]/30 rounded px-3 py-2.5 text-sm text-[#F3F0E8] focus:border-[#B49A68] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#DED6C8] uppercase tracking-wider text-[10px] mb-1.5 font-medium">
                    {language === 'hi' ? 'संग्रह / अवसर' : 'Occasion / Category'}
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-[#171916] border border-[#B49A68]/30 rounded px-3 py-2.5 text-sm text-[#F3F0E8] focus:border-[#B49A68] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Groom Sherwani & Wedding">The Groom Sherwani (Wedding)</option>
                    <option value="Festive & Sangeet Kurtas">Festive & Sangeet Kurtas</option>
                    <option value="Boys & Kids Celebration Wear">Kids & Boys Celebration Wear</option>
                    <option value="Indo-Western & Modern Drape">Indo-Western Fusion Drape</option>
                    <option value="Casualwear & Denim Staples">Casual Linen & Denim Staples</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#DED6C8] uppercase tracking-wider text-[10px] mb-1.5 font-medium">
                    {language === 'hi' ? 'पसंदीदा समय' : 'Time Slot'}
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#171916] border border-[#B49A68]/30 rounded px-3 py-2.5 text-sm text-[#F3F0E8] focus:border-[#B49A68] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="11:00 AM - 01:00 PM">Morning (11:00 AM - 01:00 PM)</option>
                    <option value="01:00 PM - 04:00 PM">Afternoon (01:00 PM - 04:00 PM)</option>
                    <option value="04:00 PM - 07:00 PM">Evening (04:00 PM - 07:00 PM)</option>
                    <option value="07:00 PM - 09:30 PM">Night (07:00 PM - 09:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#DED6C8] uppercase tracking-wider text-[10px] mb-1.5 font-medium">
                  {language === 'hi' ? 'पसंदीदा तारीख (वैकल्पिक)' : 'Preferred Date (Optional)'}
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-[#171916] border border-[#B49A68]/30 rounded px-3 py-2 text-sm text-[#F3F0E8] focus:border-[#B49A68] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#DED6C8] uppercase tracking-wider text-[10px] mb-1.5 font-medium">
                  {language === 'hi' ? 'विशेष आवश्यकता या टिप्पणी' : 'Special Notes / Preferences'}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Looking for father & son matching ethnic sets for wedding..."
                  className="w-full bg-[#171916] border border-[#B49A68]/30 rounded px-3 py-2 text-sm text-[#F3F0E8] focus:border-[#B49A68] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#263D32] hover:bg-[#2e4a3d] border border-[#B49A68]/40 text-[#F3F0E8] py-3 rounded text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 shadow-md hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 text-[#B49A68]" />
                  <span>{language === 'hi' ? 'व्हाट्सएप पर अपॉइंटमेंट भेजें' : 'Send Request via WhatsApp'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
