import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf, Search, Plus, User, Moon, Sun, LogOut, Menu, X, Bell, Globe, Sparkles, Flower2 } from 'lucide-react';

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
    <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-900/95' : 'bg-white/90'} backdrop-blur-xl shadow-lg border-b ${darkMode ? 'border-gray-700' : 'border-green-100/50'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 🌿 로고 - 자연스러운 느낌 */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
            >
              {/* 나뭇잎 장식 */}
              <div className="relative flex items-center">
                <Leaf className="w-7 h-7 text-green-600 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <Flower2 className="w-4 h-4 text-pink-400 absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
              
              {/* 앱 이름 - 자연스러운 서체 */}
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-black leading-none" 
                    style={{ 
                      fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif",
                      letterSpacing: '-0.02em',
                      background: 'linear-gradient(135deg, #059669, #16a34a, #84cc16)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                  레시피 숲
                </h1>
                <span className="text-[9px] text-green-600/70 font-bold tracking-wider leading-none mt-0.5"
                      style={{ fontFamily: "'Pretendard', sans-serif" }}>
                  RECIPE FOREST
                </span>
              </div>
            </button>
          </div>

          {/* 🔍 검색 바 (데스크톱) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 nature-input rounded-2xl text-sm font-medium ${
                  darkMode 
                    ? 'bg-gray-800/70 text-gray-100 border-gray-600' 
                    : 'bg-white/80 text-gray-800 border-green-200'
                } placeholder:text-gray-400`}
              />
            </div>
          </div>

          {/* 우측 메뉴 */}
          <div className="flex items-center gap-3">
            {/* 🌐 언어 전환 버튼 */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-green-50 text-gray-700'
              }`}
              title={i18n.language === 'ko' ? 'Switch to English' : '한국어로 전환'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold">
                {i18n.language === 'ko' ? 'EN' : 'KO'}
              </span>
            </button>

            {/* 🌙 다크모드 토글 */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'hover:bg-gray-800 text-yellow-400' 
                  : 'hover:bg-amber-50 text-gray-600'
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <>
                {/* ➕ 레시피 등록 버튼 */}
                <button
                  onClick={() => onNavigate('create')}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 btn-primary text-white rounded-2xl font-bold text-sm shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  {t('header.addRecipe')}
                </button>

                {/* 🔔 알림 버튼 */}
                <button className={`relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'hover:bg-gray-800 text-gray-300' 
                    : 'hover:bg-orange-50 text-gray-600'
                }`}>
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></span>
                </button>
                
                {/* 👤 사용자 메뉴 */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-2 p-2 rounded-xl transition-all duration-300 ${
                      darkMode 
                        ? 'hover:bg-gray-800' 
                        : 'hover:bg-green-50'
                    }`}
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className={`hidden md:block text-sm font-bold ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {user.nickname || user.username}
                    </span>
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {showUserMenu && (
                    <div className={`absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl py-2 border backdrop-blur-xl ${
                      darkMode 
                        ? 'bg-gray-800/95 border-gray-700' 
                        : 'bg-white/95 border-green-100'
                    } fade-in`}>
                      <button
                        onClick={() => {
                          onNavigate('profile');
                          setShowUserMenu(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-3 ${
                          darkMode 
                            ? 'text-gray-200 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-green-50'
                        }`}
                      >
                        <User className="w-4 h-4" />
                        {t('header.profile')}
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('my-recipes');
                          setShowUserMenu(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-3 ${
                          darkMode 
                            ? 'text-gray-200 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-green-50'
                        }`}
                      >
                        <Leaf className="w-4 h-4" />
                        {t('header.myRecipes')}
                      </button>
                      <hr className={`my-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                      <button
                        onClick={() => {
                          onLogout();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('header.logout')}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-6 py-2.5 btn-primary text-white rounded-2xl font-bold text-sm shadow-lg"
              >
                {t('header.login')}
              </button>
            )}

            {/* 📱 모바일 메뉴 버튼 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-green-50 text-gray-700'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 📱 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            darkMode ? 'border-gray-700' : 'border-green-100'
          } fade-in`}>
            {/* 모바일 검색 */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('header.searchPlaceholderMobile')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl nature-input ${
                    darkMode 
                      ? 'bg-gray-800/70 text-gray-100 border-gray-600' 
                      : 'bg-white/80 text-gray-800 border-green-200'
                  }`}
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
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left font-medium rounded-xl transition-colors ${
                    darkMode 
                      ? 'text-gray-200 hover:bg-gray-800' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <Plus className="w-5 h-5 text-green-600" />
                  {t('header.addRecipe')}
                </button>
                <button
                  onClick={() => {
                    onNavigate('my-recipes');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left font-medium rounded-xl transition-colors ${
                    darkMode 
                      ? 'text-gray-200 hover:bg-gray-800' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <Leaf className="w-5 h-5 text-green-600" />
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
