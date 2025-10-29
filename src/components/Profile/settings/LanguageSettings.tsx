import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Language } from '../../../locales';

export const LanguageSettings = () => {
  const { language, setLanguage, t } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: 'zh-CN', name: t.languages['zh-CN'] },
    { code: 'zh-TW', name: t.languages['zh-TW'] },
    { code: 'en', name: t.languages['en'] },
  ];

  const handleLanguageChange = async (newLang: Language) => {
    setSaving(true);
    await setLanguage(newLang);
    setSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-900">{t.settings.selectLanguage}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            disabled={saving}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              language === lang.code
                ? 'border-purple-600 bg-purple-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-medium ${
                  language === lang.code ? 'text-purple-700' : 'text-gray-700'
                }`}
              >
                {lang.name}
              </span>
              {language === lang.code && (
                <img src="/square-check-big.svg" alt="Selected" className="w-5 h-5" />
              )}
            </div>
          </button>
        ))}

        {showSuccess && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm text-center animate-fade-in">
            {t.settings.languageSaved}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
