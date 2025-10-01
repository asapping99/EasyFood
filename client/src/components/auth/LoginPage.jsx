/**
 * LoginPage - react-i18next 버전
 * 새로운 API 구조 + react-i18next 다국어 지원
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChefHat, Eye, EyeOff, Mail, User, Lock } from 'lucide-react';
import { login, register } from '../../api';

const LoginPage = ({ setUser, setCurrentPage }) => {
  const { t } = useTranslation(['auth', 'common', 'recipe']);
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    nickname: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const credentials = isLogin 
        ? { username: formData.username, password: formData.password }
        : formData;
      
      const response = isLogin 
        ? await login(credentials)
        : await register(credentials);
      
      if (response.user) {
        setUser(response.user);
        setCurrentPage('home');
      }
    } catch (err) {
      setError(err.message || t('common:unknownError'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md fade-in">
        <div className="glass-morphism rounded-3xl shadow-2xl p-8">
          {/* 헤더 */}
          <div className="flex items-center justify-center mb-8">
            <div className="bounce-animation">
              <ChefHat className="w-12 h-12 text-orange-500 mr-3" />
            </div>
            <h1 className="text-3xl font-bold text-gradient">
              {t('common:appName')}
            </h1>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isLogin ? t('login.welcomeBack') : t('register.welcomeNew')}
          </h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm animate-pulse">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                {error}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 사용자명 */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={isLogin ? t('login.usernamePlaceholder') : t('register.usernamePlaceholder')}
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                required
                disabled={loading}
              />
            </div>
            
            {/* 회원가입 전용 필드 */}
            {!isLogin && (
              <>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder={t('register.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('register.nicknamePlaceholder')}
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    required
                    disabled={loading}
                  />
                </div>
              </>
            )}
            
            {/* 비밀번호 */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={isLogin ? t('login.passwordPlaceholder') : t('register.passwordPlaceholder')}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-11 pr-12 py-4 bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 btn-primary text-white rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('login.processing')}
                </div>
              ) : (
                isLogin ? t('login.loginButton') : t('register.registerButton')
              )}
            </button>
          </form>
          
          {/* 전환 버튼 */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-600 hover:text-orange-500 transition-colors font-medium"
              disabled={loading}
            >
              {isLogin ? (
                <>
                  {t('login.noAccount')}{' '}
                  <span className="text-orange-500 font-semibold">{t('login.goToRegister')}</span>
                </>
              ) : (
                <>
                  {t('register.hasAccount')}{' '}
                  <span className="text-orange-500 font-semibold">{t('register.goToLogin')}</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* 하단 설명 */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            🍳 {t('recipe:hero.mainDescription')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
