import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChefHat, Search, Plus, User, Moon, Sun, LogOut, Menu, X, Bell, Globe } from 'lucide-react';

const Header = ({ 
  user, 
  darkMode, 
  setDarkMode, 
  searchTerm, 
  setSearchTerm, 
  mobileMenuOpen, 
  setMobileMenuOpen,
  onLogout,
  onNavigate 
}) => {
  const { t, i18n } = useTranslation('common');
  const [showUserMenu, setShowUserMenu] = useState(false);

  // 언어 전환 함수
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white/80'} backdrop-blur-lg shadow-lg border-b border-gray-200/50`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 group"
            >
              <ChefHat className="w-8 h-8 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
              <h1 className="text-xl font-bold text-gradient">
                {t('appName')}
              </h1>
            </button>
          </div>

          {/* 검색 바 (데스크톱) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* 우측 메뉴 */}
          <div className="flex items-center gap-4">
            {/* 언어 전환 버튼 */}
            <button
              onClick={toggleLanguage}
              className="flex flex-row items-center p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              title={i18n.language === 'ko' ? 'Switch to English' : '한국어로 전환'}
            >
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="ml-1 text-xs font-medium text-gray-600">
                {i18n.language === 'ko' ? 'EN' : 'KO'}
              </span>
            </button>

            {/* 다크모드 토글 */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {user ? (
              <>
                {/* 레시피 등록 버튼 */}
                <button
                  onClick={() => onNavigate('create')}
                  className="hidden md:flex items-center gap-2 px-4 py-2.5 btn-primary text-white rounded-xl font-semibold text-sm"
                >
                  <Plus className="w-4 h-4" />
                  {t('header.addRecipe')}
                </button>

                {/* 알림 버튼 */}
                <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {/* 사용자 메뉴 */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user.nickname || user.username}
                    </span>
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 glass-morphism rounded-xl shadow-lg py-2 border border-gray-200/50">
                      <button
                        onClick={() => {
                          onNavigate('profile');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4 inline mr-2" />
                        {t('header.profile')}
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('my-recipes');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <ChefHat className="w-4 h-4 inline mr-2" />
                        {t('header.myRecipes')}
                      </button>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={() => {
                          onLogout();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        {t('header.logout')}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-6 py-2.5 btn-primary text-white rounded-xl font-semibold text-sm"
              >
                {t('header.login')}
              </button>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 fade-in">
            {/* 모바일 검색 */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('header.searchPlaceholderMobile')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* 모바일 메뉴 항목 */}
            {user && (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onNavigate('create');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Plus className="w-5 h-5 text-orange-500" />
                  {t('header.addRecipe')}
                </button>
                <button
                  onClick={() => {
                    onNavigate('my-recipes');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <ChefHat className="w-5 h-5 text-orange-500" />
                  {t('header.myRecipes')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
