/**
 * LoginPage - 레시피 숲 테마
 * 자연스러운 로그인/회원가입 경험
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TreePine, Eye, EyeOff, Mail, User, Lock, Sparkles, Leaf, Wind } from 'lucide-react';
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
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* 🌿 배경 장식 요소 */}
      <div className="absolute top-20 left-10 opacity-20 animate-bounce" style={{ animationDuration: '4s' }}>
        <Leaf className="w-16 h-16 text-green-400 rotate-12" />
      </div>
      <div className="absolute bottom-32 right-20 opacity-20 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
        <Wind className="w-12 h-12 text-emerald-400" />
      </div>
      <div className="absolute top-1/3 right-10 opacity-10 animate-pulse">
        <TreePine className="w-24 h-24 text-green-500" />
      </div>

      <div className="w-full max-w-md fade-in relative z-10">
        <div className="glass-morphism rounded-3xl shadow-2xl p-8 border-2 border-green-200">
          {/* 🌲 헤더 */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 blur-2xl opacity-30 animate-pulse"></div>
              <TreePine className="w-16 h-16 text-green-600 bounce-animation relative" />
              <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 sparkle" />
            </div>
            <h1 className="text-4xl font-black text-gradient mb-2">
              레시피 숲
            </h1>
            <p className="text-sm text-green-600 font-bold">Recipe Forest</p>
          </div>
          
          <h2 className="text-2xl font-black text-gray-800 mb-6 text-center">
            {isLogin ? (
              <>
                <span className="text-green-600">🌿</span> {t('login.welcomeBack')}
              </>
            ) : (
              <>
                <span className="text-green-600">🌱</span> {t('register.welcomeNew')}
              </>
            )}
          </h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl text-sm animate-pulse">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                {error}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 사용자명 */}
            <div className="relative group">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5 group-hover:scale-110 transition-transform" />
              <input
                type="text"
                placeholder={isLogin ? t('login.usernamePlaceholder') : t('register.usernamePlaceholder')}
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full pl-12 pr-4 py-4 nature-input rounded-2xl font-medium transition-all"
                required
                disabled={loading}
              />
            </div>
            
            {/* 회원가입 전용 필드 */}
            {!isLogin && (
              <>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5 group-hover:scale-110 transition-transform" />
                  <input
                    type="email"
                    placeholder={t('register.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 nature-input rounded-2xl font-medium transition-all"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5 group-hover:scale-110 transition-transform" />
                  <input
                    type="text"
                    placeholder={t('register.nicknamePlaceholder')}
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    className="w-full pl-12 pr-4 py-4 nature-input rounded-2xl font-medium transition-all"
                    required
                    disabled={loading}
                  />
                </div>
              </>
            )}
            
            {/* 비밀번호 */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5 group-hover:scale-110 transition-transform" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={isLogin ? t('login.passwordPlaceholder') : t('register.passwordPlaceholder')}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-12 pr-14 py-4 nature-input rounded-2xl font-medium transition-all"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-all hover:scale-110"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 btn-primary text-white rounded-2xl font-black text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="relative inline-block mr-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                  {t('login.processing')}
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Leaf className="w-5 h-5" />
                  {isLogin ? t('login.loginButton') : t('register.registerButton')}
                </span>
              )}
            </button>
          </form>
          
          {/* 전환 버튼 */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-600 hover:text-green-600 transition-colors font-bold"
              disabled={loading}
            >
              {isLogin ? (
                <>
                  {t('login.noAccount')}{' '}
                  <span className="text-green-600 font-black">{t('login.goToRegister')}</span>
                </>
              ) : (
                <>
                  {t('register.hasAccount')}{' '}
                  <span className="text-green-600 font-black">{t('register.goToLogin')}</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* 하단 설명 */}
        <div className="mt-6 text-center glass-morphism rounded-2xl p-4 border border-green-200">
          <p className="text-gray-700 text-sm font-medium flex items-center justify-center gap-2">
            <Leaf className="w-4 h-4 text-green-600" />
            자연의 맛을 담은 레시피, 숲처럼 풍성한 요리의 세계
            <Leaf className="w-4 h-4 text-green-600 rotate-180" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
