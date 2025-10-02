import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChefHat, Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-white/60 backdrop-blur border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 섹션 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="w-6 h-6 text-orange-500" />
              <span className="font-bold text-xl text-gradient">{t('appName')}</span>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-600" />
              </a>
              <a
                href="mailto:contact@krecipe.com"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-600" />
              </a>
            </div>
          </div>

          {/* 링크 섹션 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">{t('footer.service')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.findRecipes')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.popularRecipes')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.cookingTips')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.community')}
                </a>
              </li>
            </ul>
          </div>

          {/* 지원 섹션 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.help')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-600 text-center md:text-left mb-4 md:mb-0">
              <p>© 2025 {t('appName')}. {t('footer.copyright')}</p>
              <p>{t('footer.subtitle')}</p>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span>{t('footer.madeWith')}</span>
              <Heart className="w-4 h-4 text-red-500 mx-1" />
              <span>{t('footer.by')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
