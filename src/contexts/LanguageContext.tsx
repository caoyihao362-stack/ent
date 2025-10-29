import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, TranslationKeys } from '../locales';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('movemate_language');
    return (stored as Language) || 'zh-CN';
  });

  useEffect(() => {
    if (user) {
      loadUserLanguagePreference();
    }
  }, [user]);

  const loadUserLanguagePreference = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_preferences')
      .select('language_preference')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!error && data?.language_preference) {
      setLanguageState(data.language_preference as Language);
      localStorage.setItem('movemate_language', data.language_preference);
    }
  };

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('movemate_language', lang);

    if (user) {
      await supabase
        .from('user_preferences')
        .update({ language_preference: lang })
        .eq('user_id', user.id);
    }
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
