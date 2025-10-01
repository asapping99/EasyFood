/**
 * 언어 전환 컴포넌트
 * react-i18next 사용
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

/**
 * 드롭다운 스타일 언어 전환기
 */
const LanguageSwitcher = ({ className = '' }) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className={`relative group ${className}`}>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur border border-gray-200 rounded-lg hover:bg-white transition-all"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
      </button>

      {/* 드롭다운 메뉴 */}
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
              i18n.language === lang.code ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700'
            } ${
              lang.code === languages[0].code ? 'rounded-t-lg' : ''
            } ${
              lang.code === languages[languages.length - 1].code ? 'rounded-b-lg' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;

/**
 * 간단한 토글 스타일 언어 전환기
 */
export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur border border-gray-200 rounded-lg hover:bg-white hover:shadow-md transition-all"
      title="언어 변경 / Change Language"
    >
      <Globe className="w-4 h-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">
        {i18n.language === 'ko' ? '🇰🇷' : '🇺🇸'}
      </span>
    </button>
  );
};

/**
 * 컴팩트 버전 (아이콘만)
 */
export const LanguageIcon = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 bg-white/70 backdrop-blur border border-gray-200 rounded-lg hover:bg-white hover:shadow-md transition-all"
      title={i18n.language === 'ko' ? 'Change to English' : '한국어로 변경'}
    >
      <Globe className="w-5 h-5 text-gray-600" />
    </button>
  );
};
