/**
 * react-i18next 설정
 * 
 * 필요한 패키지:
 * npm install react-i18next i18next i18next-browser-languagedetector
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 한국어 리소스
import koCommon from '../locales/ko/common.json';
import koAuth from '../locales/ko/auth.json';
import koRecipe from '../locales/ko/recipe.json';
import koValidation from '../locales/ko/validation.json';

// 영어 리소스
import enCommon from '../locales/en/common.json';
import enAuth from '../locales/en/auth.json';
import enRecipe from '../locales/en/recipe.json';
import enValidation from '../locales/en/validation.json';

// 리소스 번들
const resources = {
  ko: {
    common: koCommon,
    auth: koAuth,
    recipe: koRecipe,
    validation: koValidation,
  },
  en: {
    common: enCommon,
    auth: enAuth,
    recipe: enRecipe,
    validation: enValidation,
  },
};

i18n
  // 언어 감지 플러그인
  .use(LanguageDetector)
  // react-i18next 초기화
  .use(initReactI18next)
  // 초기화
  .init({
    resources,
    fallbackLng: 'ko', // 기본 언어
    defaultNS: 'common', // 기본 네임스페이스
    ns: ['common', 'auth', 'recipe', 'validation'], // 사용할 네임스페이스
    
    // 언어 감지 설정
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    // 보간(interpolation) 설정
    interpolation: {
      escapeValue: false, // React는 기본적으로 XSS 방지
    },
    
    // 디버그 모드 (개발 환경에서만)
    debug: process.env.NODE_ENV === 'development',
    
    // 리액트 설정
    react: {
      useSuspense: false, // Suspense 사용 안 함
    },
  });

export default i18n;
