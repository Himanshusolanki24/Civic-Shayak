import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  // Navbar
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.why': { en: 'Why Civic Sahayak Is Different', hi: 'Civic Sahayak अलग क्यों है' },
  'nav.how': { en: 'How It Helps', hi: 'यह कैसे मदद करता है' },
  'nav.schemes': { en: 'Scheme Matcher', hi: 'योजना खोजक' },
  'nav.cta': { en: 'Try Civic Sahayak', hi: 'Civic Sahayak आज़माएं' },

  // Hero
  'hero.badge': { en: 'Making Government Accessible', hi: 'सरकार को सुलभ बनाना' },
  'hero.headline': { en: 'Government services exist — but they are hard to access.', hi: 'सरकारी सेवाएं मौजूद हैं — लेकिन उन तक पहुंचना कठिन है।' },
  'hero.subheadline': { en: 'Civic Sahayak simplifies schemes, notices, and eligibility into clear, human language.', hi: 'Civic Sahayak योजनाओं, नोटिस और पात्रता को सरल, मानवीय भाषा में समझाता है।' },
  'hero.cta.primary': { en: 'Chat with Civic Sahayak', hi: 'Civic Sahayak से बात करें' },
  'hero.cta.secondary': { en: 'Check My Eligibility', hi: 'मेरी पात्रता जांचें' },
  'hero.trust.free': { en: '100% Free to Use', hi: '100% मुफ्त उपयोग' },
  'hero.trust.language': { en: 'Works in Hindi & English', hi: 'हिंदी और अंग्रेजी में काम करता है' },
  'hero.trust.login': { en: 'No Login Required', hi: 'लॉगिन की आवश्यकता नहीं' },

  // Transformation Card
  'transform.before': { en: 'Confused citizen with paperwork pile', hi: 'कागज़ी कार्रवाई से परेशान नागरिक' },
  'transform.after': { en: 'Happy citizen with digital approvals', hi: 'डिजिटल मंज़ूरी से खुश नागरिक' },
  'transform.stat': { en: 'Saved 24 hours of paperwork', hi: '24 घंटे की कागज़ी कार्रवाई बची' },

  // Problem Section
  'problem.title': { en: 'Government services exist, but they are hard to access', hi: 'सरकारी सेवाएं मौजूद हैं, लेकिन उन तक पहुंचना कठिन है' },
  'problem.fragmented': { en: 'Fragmented portals', hi: 'बिखरे हुए पोर्टल' },
  'problem.fragmented.desc': { en: 'Dozens of different websites with no clear navigation', hi: 'दर्जनों अलग-अलग वेबसाइटें बिना स्पष्ट मार्गदर्शन के' },
  'problem.complex': { en: 'Complex language', hi: 'जटिल भाषा' },
  'problem.complex.desc': { en: 'Legal jargon that confuses rather than clarifies', hi: 'कानूनी शब्दावली जो समझाने की जगह भ्रमित करती है' },
  'problem.eligibility': { en: 'No eligibility clarity', hi: 'पात्रता की स्पष्टता नहीं' },
  'problem.eligibility.desc': { en: 'Hours spent guessing if you even qualify', hi: 'यह अनुमान लगाने में घंटे बिताना कि आप योग्य हैं या नहीं' },

  // Why Different Section
  'why.title': { en: 'Why Civic Sahayak Is Different', hi: 'Civic Sahayak अलग क्यों है' },
  'why.explain.title': { en: 'Explain-like-I\'m-5 Clarity', hi: '5 साल के बच्चे जैसी सरलता' },
  'why.explain.desc': { en: 'We break down complex government language into simple, everyday words anyone can understand.', hi: 'हम जटिल सरकारी भाषा को सरल, रोज़मर्रा के शब्दों में समझाते हैं।' },
  'why.rules.title': { en: 'Rule-Based Eligibility', hi: 'नियम-आधारित पात्रता' },
  'why.rules.desc': { en: 'No black-box AI guessing. Clear rules determine your eligibility with transparency.', hi: 'कोई ब्लैक-बॉक्स AI अनुमान नहीं। स्पष्ट नियम पारदर्शिता के साथ पात्रता निर्धारित करते हैं।' },
  'why.official.title': { en: 'Works with Official Portals', hi: 'आधिकारिक पोर्टलों के साथ काम करता है' },
  'why.official.desc': { en: 'We guide you to the right government website — we never replace official services.', hi: 'हम आपको सही सरकारी वेबसाइट तक ले जाते हैं — आधिकारिक सेवाओं की जगह नहीं लेते।' },
  'why.privacy.title': { en: 'Privacy-First Design', hi: 'गोपनीयता-प्रथम डिज़ाइन' },
  'why.privacy.desc': { en: 'Your data stays with you. We don\'t store personal information or track you.', hi: 'आपका डेटा आपके पास रहता है। हम व्यक्तिगत जानकारी संग्रहीत या ट्रैक नहीं करते।' },

  // How It Helps Section
  'how.title': { en: 'How Civic Sahayak Helps', hi: 'Civic Sahayak कैसे मदद करता है' },
  'how.step1.title': { en: 'Chat or Upload', hi: 'चैट करें या अपलोड करें' },
  'how.step1.desc': { en: 'Ask a question in your language or upload a confusing government document.', hi: 'अपनी भाषा में सवाल पूछें या कोई भ्रमित करने वाला सरकारी दस्तावेज़ अपलोड करें।' },
  'how.step2.title': { en: 'Language Simplified', hi: 'भाषा सरल की गई' },
  'how.step2.desc': { en: 'We translate legal jargon into clear, human words you can actually understand.', hi: 'हम कानूनी शब्दावली को स्पष्ट, मानवीय शब्दों में बदलते हैं।' },
  'how.step3.title': { en: 'Eligibility Matched', hi: 'पात्रता मिलान' },
  'how.step3.desc': { en: 'Based on your profile, we show you exactly which schemes you qualify for.', hi: 'आपकी प्रोफाइल के आधार पर, हम दिखाते हैं कि आप किन योजनाओं के लिए योग्य हैं।' },
  'how.step4.title': { en: 'Guided to Official Portal', hi: 'आधिकारिक पोर्टल पर मार्गदर्शन' },
  'how.step4.desc': { en: 'We link you directly to the correct government page to complete your application.', hi: 'हम आपको सीधे सही सरकारी पेज से जोड़ते हैं ताकि आप आवेदन पूरा कर सकें।' },

  // Scheme Matcher
  'schemes.title': { en: 'Find Schemes You Qualify For', hi: 'उन योजनाओं को खोजें जिनके लिए आप योग्य हैं' },
  'schemes.subtitle': { en: 'Answer a few questions to discover government schemes tailored to your profile.', hi: 'अपनी प्रोफ़ाइल के अनुसार सरकारी योजनाएं खोजने के लिए कुछ प्रश्नों के उत्तर दें।' },
  'schemes.state': { en: 'State', hi: 'राज्य' },
  'schemes.state.placeholder': { en: 'Select your state', hi: 'अपना राज्य चुनें' },
  'schemes.income': { en: 'Annual Income Range', hi: 'वार्षिक आय सीमा' },
  'schemes.income.placeholder': { en: 'Select income range', hi: 'आय सीमा चुनें' },
  'schemes.occupation': { en: 'Occupation', hi: 'व्यवसाय' },
  'schemes.occupation.placeholder': { en: 'Select occupation', hi: 'व्यवसाय चुनें' },
  'schemes.age': { en: 'Age Group', hi: 'आयु वर्ग' },
  'schemes.age.placeholder': { en: 'Select age group', hi: 'आयु वर्ग चुनें' },
  'schemes.cta': { en: 'Find Schemes', hi: 'योजनाएं खोजें' },
  'schemes.results': { en: 'Matching Schemes', hi: 'मिलती-जुलती योजनाएं' },
  'schemes.benefit': { en: 'Benefit', hi: 'लाभ' },
  'schemes.apply': { en: 'Apply on Official Portal', hi: 'आधिकारिक पोर्टल पर आवेदन करें' },

  // Chat
  'chat.placeholder': { en: 'Ask about any government scheme...', hi: 'किसी भी सरकारी योजना के बारे में पूछें...' },
  'chat.welcome': { en: 'Hello! I\'m Civic Sahayak. How can I help you understand government services today?', hi: 'नमस्ते! मैं Civic Sahayak हूं। आज मैं सरकारी सेवाओं को समझने में आपकी कैसे मदद कर सकता हूं?' },

  // Footer
  'footer.about.title': { en: 'About Civic Sahayak', hi: 'Civic Sahayak के बारे में' },
  'footer.about.mission': { en: 'Mission', hi: 'मिशन' },
  'footer.about.vision': { en: 'Vision', hi: 'विज़न' },
  'footer.transparency.title': { en: 'Transparency & Trust', hi: 'पारदर्शिता और विश्वास' },
  'footer.transparency.data': { en: 'Data Usage', hi: 'डेटा उपयोग' },
  'footer.transparency.privacy': { en: 'Privacy-First Approach', hi: 'गोपनीयता-प्रथम दृष्टिकोण' },
  'footer.disclaimer': { en: 'Civic Sahayak does not replace official government platforms. Always verify information on government websites.', hi: 'Civic Sahayak आधिकारिक सरकारी प्लेटफार्मों की जगह नहीं लेता। हमेशा सरकारी वेबसाइटों पर जानकारी सत्यापित करें।' },
  'footer.language.title': { en: 'Language Support', hi: 'भाषा समर्थन' },
  'footer.contact.title': { en: 'Contact & Support', hi: 'संपर्क और सहायता' },
  'footer.contact.email': { en: 'Email', hi: 'ईमेल' },
  'footer.contact.feedback': { en: 'Feedback', hi: 'प्रतिक्रिया' },
  'footer.copyright': { en: '2024 Civic Sahayak. Built for India.', hi: '2024 Civic Sahayak. भारत के लिए निर्मित।' },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('civic-language');
    return (saved as Language) || 'en';
  });

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'hi' : 'en';
      localStorage.setItem('civic-language', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      if (!translation) return key;
      return translation[language];
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
