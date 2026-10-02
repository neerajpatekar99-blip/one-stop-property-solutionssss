"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "properties": "Properties",
        "gallery": "Gallery",
        "new_projects": "New Projects",
        "plotted_developments": "Plotted Developments",
        "services": "Services",
        "about": "About",
        "contact": "Contact",
        "free_consultation": "Free Consultation"
      },
      "hero": {
        "badge": "Kamothe's Most Trusted Partner · Since 2014",
        "title_part1": "Find Your Perfect",
        "home": "Home",
        "title_part2": "in Navi Mumbai",
        "sub": "500+ verified properties. Expert guidance from Sachin Bhoir. Zero brokerage surprises — your dream home is one call away.",
        "buy": "Buy Property",
        "rent": "Rent Property",
        "search_placeholder": "Sector 5, Kamothe, Kharghar...",
        "search_btn": "Search"
      }
    }
  },
  hi: {
    translation: {
      "nav": {
        "home": "होम",
        "properties": "प्रॉपर्टीज",
        "gallery": "गैलरी",
        "new_projects": "नए प्रोजेक्ट्स",
        "plotted_developments": "Plotted Developments",
        "services": "सेवाएं",
        "about": "हमारे बारे में",
        "contact": "संपर्क करें",
        "free_consultation": "फ्री परामर्श"
      },
      "hero": {
        "badge": "कामोठे का सबसे भरोसेमंद साथी · 2014 से",
        "title_part1": "नवी मुंबई में अपना",
        "home": "आदर्श घर",
        "title_part2": "खोजें",
        "sub": "500+ सत्यापित संपत्तियां। सचिन भोईर से विशेषज्ञ मार्गदर्शन। शून्य ब्रोकरेज सरप्राइज — आपका सपनों का घर बस एक कॉल की दूरी पर है।",
        "buy": "खरीदें",
        "rent": "किराया",
        "search_placeholder": "सेक्टर 5, कामोठे, खारघर...",
        "search_btn": "खोजें"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
