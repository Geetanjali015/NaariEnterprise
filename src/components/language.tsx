import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Landing Page
    heroTitle: "Turn Your Talent Into Income with NaariEnterpriese",
    heroSubtitle: "Empower yourself with AI-driven tools to transform your hobbies into profitable businesses",
    getStarted: "Get Started",
    learnMore: "Learn More",
    aboutTitle: "About NaariEnterprise",
    aboutDescription: "NaariEnterprise is designed specifically for Indian women who want to turn their skills and hobbies into sustainable income sources. Our AI-powered platform provides everything you need to start and grow your business.",
    featuresTitle: "Our Features",
    automationTitle: "Smart Automation",
    automationDescription: "AI-powered tools to automate your business processes and save time",
    marketingTitle: "Marketing Made Easy",
    marketingDescription: "Create compelling content and reach your target audience effectively",
    trackingTitle: "Business Tracking",
    trackingDescription: "Monitor your progress and income with detailed analytics",
    testimonialsTitle: "Success Stories",
    // Navigation
    dashboard: "Dashboard",
    brandBuilding: "Brand Building",
    strategy: "Strategy",
    loans: "Loans & Regulations",
    marketing: "Marketing Tools",
    community: "Community",
    settings: "Settings",
    // Auth
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    loginWithGoogle: "Continue with Google",
    loginWithFacebook: "Continue with Facebook",
    // Business Info
    businessDomain: "Business Domain",
    incomeGoal: "Monthly Income Goal (₹)",
    businessMode: "Business Mode",
    timeAvailable: "Time Available (hours/week)",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
  },
  hi: {
    heroTitle: "स्त्रीकमाई के साथ अपनी प्रतिभा को आय में बदलें",
    heroSubtitle: "अपने शौक को लाभदायक व्यवसाय में बदलने के लिए AI-संचालित उपकरणों से खुद को सशक्त बनाएं",
    getStarted: "शुरू करें",
    learnMore: "और जानें",
    aboutTitle: "स्त्रीकमाई के बारे में",
    aboutDescription: "स्त्रीकमाई विशेष रूप से उन भारतीय महिलाओं के लिए डिज़ाइन किया गया है जो अपने कौशल और शौक को स्थायी आय स्रोतों में बदलना चाहती हैं।",
    featuresTitle: "हमारी सुविधाएं",
    automationTitle: "स्मार्ट ऑटोमेशन",
    automationDescription: "अपनी व्यावसायिक प्रक्रियाओं को स्वचालित करने और समय बचाने के लिए AI-संचालित उपकरण",
    marketingTitle: "आसान मार्केटिंग",
    marketingDescription: "आकर्षक सामग्री बनाएं और अपने लक्षित दर्शकों तक प्रभावी रूप से पहुंचें",
    trackingTitle: "व्यवसाय ट्रैकिंग",
    trackingDescription: "विस्तृत विश्लेषण के साथ अपनी प्रगति और आय की निगरानी करें",
    testimonialsTitle: "सफलता की कहानियां",
    dashboard: "डैशबोर्ड",
    brandBuilding: "ब्रांड निर्माण",
    strategy: "रणनीति",
    loans: "ऋण और नियम",
    marketing: "मार्केटिंग टूल्स",
    community: "समुदाय",
    settings: "सेटिंग्स",
    login: "लॉगिन",
    signup: "साइन अप",
    email: "ईमेल",
    password: "पासवर्ड",
    loginWithGoogle: "Google के साथ जारी रखें",
    loginWithFacebook: "Facebook के साथ जारी रखें",
    businessDomain: "व्यवसाय क्षेत्र",
    incomeGoal: "मासिक आय लक्ष्य (₹)",
    businessMode: "व्यवसाय मोड",
    timeAvailable: "उपलब्ध समय (घंटे/सप्ताह)",
    next: "अगला",
    previous: "पिछला",
    submit: "जमा करें",
  },
  ta: {
    heroTitle: "உங்கள் திறமையை ஸ்த்ரீகமாய் மூலம் வருமானமாக மாற்றுங்கள்",
    heroSubtitle: "உங்கள் பொழுதுபோக்குகளை லாபகரமான வணிகங்களாக மாற்ற AI-இயங்கும் கருவிகளால் உங்களை வலுப்படுத்துங்கள்",
    getStarted: "தொடங்குங்கள்",
    learnMore: "மேலும் அறிக",
    aboutTitle: "ஸ்த்ரீகமாய் பற்றி",
    aboutDescription: "ஸ்த்ரீகமாய் குறிப்பாக இந்திய பெண்களுக்காக வடிவமைக்கப்பட்டுள்ளது, அவர்கள் தங்கள் திறமைகளையும் பொழுதுபோக்குகளையும் நிலையான வருமான ஆதாரங்களாக மாற்ற விரும்புகிறார்கள்।",
    featuresTitle: "எங்கள் அம்சங்கள்",
    automationTitle: "ஸ்மார்ட் ஆட்டோமேஷன்",
    automationDescription: "உங்கள் வணிக செயல்முறைகளை தானியங்குபடுத்தவும் நேரத்தை மிச்சப்படுத்தவும் AI-இயங்கும் கருவிகள்",
    marketingTitle: "எளிதான மார்க்கெட்டிங்",
    marketingDescription: "கவர்ச்சிகரமான உள்ளடக்கத்தை உருவாக்கி உங்கள் இலக்கு பார்வையாளர்களை திறம்பட அடையுங்கள்",
    trackingTitle: "வணிக கண்காணிப்பு",
    trackingDescription: "விரிவான பகுப்பாய்வுகளுடன் உங்கள் முன்னேற்றத்தையும் வருமானத்தையும் கண்காணிக்கவும்",
    testimonialsTitle: "வெற்றிக் கதைகள்",
    dashboard: "டாஷ்போர்டு",
    brandBuilding: "பிராண்ட் உருவாக்கம்",
    strategy: "உத்தி",
    loans: "கடன்கள் & விதிகள்",
    marketing: "மார்க்கெட்டிங் கருவிகள்",
    community: "சமூகம்",
    settings: "அமைப்புகள்",
    login: "உள்நுழைய",
    signup: "பதிவு செய்ய",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    loginWithGoogle: "Google உடன் தொடரவும்",
    loginWithFacebook: "Facebook உடன் தொடரவும்",
    businessDomain: "வணிக துறை",
    incomeGoal: "மாதாந்திர வருமான இலக்கு (₹)",
    businessMode: "வணிக முறை",
    timeAvailable: "கிடைக்கும் நேரம் (மணி/வாரம்)",
    next: "அடுத்து",
    previous: "முந்தைய",
    submit: "சமர்ப்பிக்கவும்",
  },
  te: {
    heroTitle: "స్త్రీకమాయితో మీ ప్రతిభను ఆదాయంగా మార్చండి",
    heroSubtitle: "మీ అభిరుచులను లాభదాయకమైన వ్యాపారాలుగా మార్చడానికి AI-శక్తితో కూడిన సాధనలతో మిమ్మల్ని శక్తివంతం చేసుకోండి",
    getStarted: "ప్రారంభించండి",
    learnMore: "మరింత తెలుసుకోండి",
    aboutTitle: "స్త్రీకమాయి గురించి",
    aboutDescription: "స్త్రీకమాయి ప్రత్యేకంగా భారతీయ మహిళల కోసం రూపొందించబడింది, వారు తమ నైపుణ్యాలను మరియు అభిరుచులను స్థిరమైన ఆదాయ వనరులుగా మార్చాలని కోరుకుంటారు.",
    featuresTitle: "మా లక్షణాలు",
    automationTitle: "స్మార్ట్ ఆటోమేషన్",
    automationDescription: "మీ వ్యాపార ప్రక్రియలను ఆటోమేట్ చేయడానికి మరియు సమయాన్ని ఆదా చేయడానికి AI-శక్తితో కూడిన సాధనలు",
    marketingTitle: "సులభమైన మార్కెటింగ్",
    marketingDescription: "ఆకర్షణీయమైన కంటెంట్‌ను సృష్టించండి మరియు మీ లక్ష్య ప్రేక్షకులను సమర్థవంతంగా చేరుకోండి",
    trackingTitle: "వ్యాపార ట్రాకింగ్",
    trackingDescription: "వివరణాత్మక విశ్లేషణలతో మీ పురోగతిని మరియు ఆదాయాన్ని పర్యవేక్షించండి",
    testimonialsTitle: "విజయ గాథలు",
    dashboard: "డాష్‌బోర్డ్",
    brandBuilding: "బ్రాండ్ బిల్డింగ్",
    strategy: "వ్యూహం",
    loans: "రుణాలు & నిబంధనలు",
    marketing: "మార్కెటింగ్ టూల్స్",
    community: "కమ్యూనిటీ",
    settings: "సెట్టింగులు",
    login: "లాగిన్",
    signup: "సైన్ అప్",
    email: "ఇమెయిల్",
    password: "పాస్‌వర్డ్",
    loginWithGoogle: "Google తో కొనసాగించండి",
    loginWithFacebook: "Facebook తో కొనసాగించండి",
    businessDomain: "వ్యాపార డొమైన్",
    incomeGoal: "నెలవారీ ఆదాయ లక్ష్యం (₹)",
    businessMode: "వ్యాపార మోడ్",
    timeAvailable: "అందుబాటులో ఉన్న సమయం (గంటలు/వారం)",
    next: "తదుపరి",
    previous: "మునుపటి",
    submit: "సమర్పించండి",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};