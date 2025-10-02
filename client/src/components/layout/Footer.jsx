import React from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf, Github, Mail, Heart, Sprout, Flower2, Instagram, Facebook, Twitter, Sparkles } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 text-white mt-20">
      {/* 🌿 상단 곡선 디자인 */}
      <div className="w-full h-16 bg-gradient-bg relative">
        <svg 
          className="absolute bottom-0 w-full h-16" 
          viewBox="0 0 1200 80" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,40 Q300,80 600,40 T1200,40 L1200,80 L0,80 Z" 
            fill="url(#footerGradient)"
          />
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="50%" stopColor="#065f46" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 🌲 브랜드 섹션 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex items-center">
                <Leaf className="w-8 h-8 text-green-400" />
                <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
                <Flower2 className="w-4 h-4 text-pink-300 absolute -bottom-1 -left-1 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl" 
                      style={{ 
                        fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif",
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(to right, #86efac, #d9f99d, #86efac)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                  레시피 숲
                </span>
                <span className="text-[10px] text-green-300/80 font-bold tracking-wider leading-none"
                      style={{ fontFamily: "'Pretendard', sans-serif" }}>
                  RECIPE FOREST
                </span>
              </div>
            </div>
            
            <p className="text-green-100/90 mb-6 leading-relaxed text-sm">
              🌿 {t('footer.description')}
            </p>
            
            <p className="text-green-200/70 text-sm mb-6 italic">
              "함께 만들고, 함께 나누는 요리 이야기"
            </p>
            
            {/* 소셜 미디어 */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-green-100" />
              </a>
              <a
                href="mailto:contact@recipeforest.com"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-green-100" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-green-100" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-green-100" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-green-100" />
              </a>
            </div>
          </div>

          {/* 🍴 서비스 링크 */}
          <div>
            <h3 className="font-bold text-green-200 mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              {t('footer.service')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-green-100/80 hover:text-green-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  {t('footer.findRecipes')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-green-100/80 hover:text-green-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  {t('footer.popularRecipes')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-green-100/80 hover:text-green-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  {t('footer.cookingTips')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-green-100/80 hover:text-green-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  {t('footer.community')}
                </a>
              </li>
            </ul>
          </div>

          {/* 💬 지원 섹션 */}
          <div>
            <h3 className="font-bold text-green-200 mb-4 flex items-center gap-2">
              <Flower2 className="w-5 h-5" />
              {t('footer.support')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-green-100/80 hover:text-green-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  {t('footer.help')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-green-100/80 hover:text-green-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-green-100/80 hover:text-green-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-green-100/80 hover:text-green-300 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></span>
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="border-t border-green-700/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-green-200/70 text-center md:text-left">
              <p className="flex items-center gap-2 justify-center md:justify-start mb-1">
                <span>© 2025 레시피 숲 (Recipe Forest)</span>
                <span className="hidden md:inline">•</span>
                <span>{t('footer.copyright')}</span>
              </p>
              <p className="text-xs text-green-300/50 italic">
                함께 만들고, 함께 나누는 요리 이야기
              </p>
            </div>
            
            <div className="flex items-center text-sm text-green-200/80">
              <span>{t('footer.madeWith')}</span>
              <Heart className="w-4 h-4 text-red-400 mx-1.5 animate-pulse" />
              <span>{t('footer.by')}</span>
              <Leaf className="w-4 h-4 text-green-400 ml-1.5" />
            </div>
          </div>
        </div>

        {/* 장식 요소 */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-3 text-xs text-green-300/40">
            <Sprout className="w-3 h-3 animate-pulse" />
            <span>당신의 요리가 꽃피는 곳</span>
            <Flower2 className="w-3 h-3 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
