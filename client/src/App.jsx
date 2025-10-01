import React, { useState, useEffect } from 'react';
import './styles/globals.css';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoginPage from './components/auth/LoginPage';
import HomePage from './components/recipe/HomePage';
import RecipeDetail from './components/recipe/RecipeDetail';
import RecipeForm from './components/recipe/RecipeForm';
import MyRecipesPage from './components/recipe/MyRecipesPage';

// Utils
import { apiRequest, tokenManager } from './utils/api';
import './utils/i18n';

const App = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 페이지 로드 시 인증 확인
  useEffect(() => {
    checkAuth();
  }, []);

  // 다크모드 초기화
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // 다크모드 저장
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 인증 확인
  const checkAuth = async () => {
    const token = tokenManager.getToken();
    if (token) {
      try {
        const userData = await apiRequest('/auth/me');
        setUser(userData);
      } catch (error) {
        console.error('인증 확인 실패:', error);
        tokenManager.removeToken();
      }
    }
  };

  // 로그아웃
  const handleLogout = () => {
    tokenManager.removeToken();
    setUser(null);
    setCurrentPage('home');
    setMobileMenuOpen(false);
  };

  // 레시피 클릭 핸들러
  const handleRecipeClick = (recipe) => {
    setSelectedRecipeId(recipe.id);
    setCurrentPage('detail');
  };

  // 네비게이션 핸들러
  const handleNavigate = (page, recipeId = null) => {
    setCurrentPage(page);
    if (recipeId) {
      setSelectedRecipeId(recipeId);
    }
    setMobileMenuOpen(false);
  };

  // 로그인이 필요한 페이지 체크
  const requiresAuth = ['create', 'edit', 'profile', 'my-recipes'];
  const shouldShowLogin = !user && (currentPage === 'login' || requiresAuth.includes(currentPage));

  if (shouldShowLogin) {
    return <LoginPage setUser={setUser} setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'gradient-bg'}`}>
      {/* 헤더 */}
      <Header
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      {/* 메인 콘텐츠 */}
      <main className="min-h-screen">
        {currentPage === 'home' && (
          <HomePage
            onRecipeClick={handleRecipeClick}
            onNavigate={handleNavigate}
            user={user}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchTerm={searchTerm}
          />
        )}

        {currentPage === 'detail' && selectedRecipeId && (
          <RecipeDetail
            recipeId={selectedRecipeId}
            setCurrentPage={setCurrentPage}
            user={user}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'create' && (
          <RecipeForm 
            setCurrentPage={setCurrentPage} 
            user={user}
          />
        )}

        {currentPage === 'edit' && selectedRecipeId && user && (
          <RecipeForm 
            setCurrentPage={setCurrentPage} 
            recipeId={selectedRecipeId}
            user={user}
          />
        )}

        {currentPage === 'profile' && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto glass-morphism rounded-3xl p-8 border border-gray-200">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">프로필</h1>
              
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {user?.nickname?.[0] || user?.username?.[0] || 'U'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user?.nickname || user?.username}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-2">가입일</h3>
                  <p className="text-gray-600">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ko-KR') : '정보 없음'}
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-800 mb-2">역할</h3>
                  <p className="text-gray-600">{user?.role === 'USER' ? '일반 사용자' : user?.role}</p>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setCurrentPage('home')}
                  className="px-6 py-3 btn-primary text-white rounded-xl font-semibold"
                >
                  홈으로 돌아가기
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'my-recipes' && (
          <MyRecipesPage
            user={user}
            onNavigate={handleNavigate}
            onRecipeClick={handleRecipeClick}
          />
        )}
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default App;
