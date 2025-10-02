/**
 * HomePage - 레시피 숲 테마 (개선 버전)
 * 자연과 함께하는 요리의 세계
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf, Eye, Heart, Clock, Users, Star, TrendingUp, Award, Filter, Sparkles, Wind, Flower2 } from 'lucide-react';
import { getRecipes, getRecipeStats } from '../../api';
import { CATEGORIES } from '../../utils/constants';
import RecipeCard from './RecipeCard';

const HomePage = ({ 
  onRecipeClick,
  onNavigate,
  user,
  selectedCategory,
  setSelectedCategory,
  searchTerm
}) => {
  const { t } = useTranslation(['recipe', 'common']);
  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalLikes: 0,
    totalViews: 0,
    totalCategories: CATEGORIES.length - 1
  });
  
  const observer = useRef();
  const lastRecipeElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // 카테고리나 검색어 변경 시 초기화
  useEffect(() => {
    setRecipes([]);
    setPage(0);
    setHasMore(true);
  }, [selectedCategory, searchTerm]);

  // 레시피 로드
  useEffect(() => {
    fetchRecipes();
  }, [page, selectedCategory, searchTerm]);

  // 통계 로드
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchRecipes = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const options = {
        page,
        size: 12,
      };
      
      if (selectedCategory && selectedCategory !== t('common:category.all')) {
        options.category = selectedCategory;
      }
      
      if (searchTerm && searchTerm.trim()) {
        options.search = searchTerm.trim();
      }
      
      const data = await getRecipes(options);
      
      if (page === 0) {
        setRecipes(data.content || []);
      } else {
        setRecipes(prev => [...prev, ...(data.content || [])]);
      }
      
      setHasMore(!data.last && (data.content || []).length > 0);
    } catch (error) {
      console.error(t('messages.loadFailed'), error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await getRecipeStats();
      setStats({
        ...statsData,
        totalCategories: CATEGORIES.length - 1
      });
    } catch (error) {
      console.error('통계 로드 오류:', error);
    }
  };

  // 🌲 히어로 섹션 - 배경 이미지 버전 (개선)
  const heroSection = () => (
    <div className="relative overflow-hidden h-screen min-h-[600px]">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/home_bg.png')`,
          backgroundPosition: 'center center',
        }}
      >
        {/* 그라데이션 오버레이 - 텍스트 가독성 향상 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
        
        {/* 추가 오버레이 - 중앙 밝게 */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-green-900/10"></div>
      </div>
      
      {/* 떠다니는 나뭇잎 효과 */}
      <div className="absolute top-20 left-10 animate-bounce opacity-20" style={{ animationDuration: '3s' }}>
        <Leaf className="w-8 h-8 text-white rotate-12 drop-shadow-lg" />
      </div>
      <div className="absolute top-40 right-20 animate-bounce opacity-20" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <Flower2 className="w-6 h-6 text-white -rotate-12 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-32 left-1/4 animate-bounce opacity-15" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
        <Wind className="w-7 h-7 text-white drop-shadow-lg" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-bounce opacity-15" style={{ animationDuration: '6s', animationDelay: '1.5s' }}>
        <Sparkles className="w-5 h-5 text-amber-200 drop-shadow-lg" />
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center fade-in max-w-4xl">
          {/* 장식 나뭇잎 - 상단 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Leaf className="w-10 h-10 text-green-300 opacity-60 rotate-12 animate-pulse" />
            <Sparkles className="w-8 h-8 text-amber-300 opacity-70 sparkle" />
            <Leaf className="w-10 h-10 text-green-300 opacity-60 -rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* 타이틀 - 자연스러운 서체 느낌 */}
          <h1 className="mb-6 drop-shadow-2xl">
            <span className="block text-7xl md:text-9xl font-black text-white tracking-tight leading-none" 
                  style={{ 
                    fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif",
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.1)'
                  }}>
              레시피 숲
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-white font-bold mb-8 drop-shadow-lg tracking-wide" 
             style={{ 
               fontFamily: "'Pretendard', sans-serif",
               letterSpacing: '0.1em'
             }}>
            Recipe Forest
          </p>
          
          {/* 개선된 설명 문구 - 더 포괄적이고 따뜻한 느낌 */}
          <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium px-4"
             style={{ 
               textShadow: '0 2px 10px rgba(0,0,0,0.5)'
             }}>
            <span className="block mb-3">🌿 함께 만들고, 함께 나누는 요리 이야기</span>
            <span className="block text-lg md:text-xl opacity-90">
              당신의 요리가 꽃피는 곳, 매일의 식탁을 풍요롭게
            </span>
          </p>
          
          {/* CTA 버튼 */}
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => onNavigate('login')}
                className="group px-12 py-5 bg-white text-green-700 rounded-2xl font-black text-lg shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all backdrop-blur-sm border-2 border-white/50"
              >
                <span className="flex items-center gap-3">
                  <Leaf className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  시작하기
                  <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }}
                className="px-12 py-5 backdrop-blur-md bg-white/20 border-2 border-white/60 text-white rounded-2xl font-black text-lg hover:bg-white/30 transition-all shadow-xl hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  <Eye className="w-6 h-6" />
                  둘러보기
                </span>
              </button>
            </div>
          )}

          {/* 로그인한 사용자 환영 메시지 */}
          {user && (
            <div className="backdrop-blur-xl bg-white/95 rounded-3xl p-8 max-w-xl mx-auto border-2 border-white/70 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-7 h-7 text-amber-500 animate-pulse" />
                <p className="text-2xl font-black text-gray-800">
                  환영합니다, <span className="text-gradient">{user.nickname || user.username}</span>님! 🌿
                </p>
              </div>
              <p className="text-gray-700 mb-5 text-lg font-medium">
                오늘은 어떤 맛있는 이야기를 만들어볼까요?
              </p>
              <button
                onClick={() => onNavigate('create')}
                className="px-8 py-4 btn-primary text-white rounded-2xl font-black shadow-lg inline-flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <Leaf className="w-5 h-5" />
                나만의 레시피 등록하기
              </button>
            </div>
          )}

          {/* 장식 나뭇잎 - 하단 */}
          <div className="flex items-center justify-center gap-4 mt-12 opacity-60">
            <Flower2 className="w-6 h-6 text-pink-300 animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
            <Leaf className="w-6 h-6 text-green-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
            <Flower2 className="w-6 h-6 text-pink-300 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* 스크롤 다운 인디케이터 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/80 rounded-full animate-pulse"></div>
            </div>
            <p className="text-white text-xs mt-2 font-medium">Scroll</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 📊 통계 섹션
  const statsSection = () => (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-800 mb-3 flex items-center justify-center gap-3">
            <Leaf className="w-8 h-8 text-green-600" />
            레시피 숲의 이야기
          </h2>
          <p className="text-gray-600 text-lg">함께 만들어가는 풍성한 요리 정원</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* 총 레시피 수 */}
          <div className="glass-morphism rounded-3xl p-8 text-center border-2 border-green-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="mb-4 relative inline-block">
              <div className="absolute inset-0 bg-green-500 blur-xl opacity-20"></div>
              <Leaf className="w-12 h-12 text-green-600 mx-auto relative" />
            </div>
            <p className="text-4xl md:text-5xl font-black text-gray-800 mb-2">{stats.totalRecipes}</p>
            <p className="text-gray-600 font-bold text-sm">{t('stats.totalRecipes')}</p>
          </div>

          {/* 총 좋아요 */}
          <div className="glass-morphism rounded-3xl p-8 text-center border-2 border-red-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="mb-4 relative inline-block">
              <div className="absolute inset-0 bg-red-500 blur-xl opacity-20"></div>
              <Heart className="w-12 h-12 text-red-500 mx-auto relative" />
            </div>
            <p className="text-4xl md:text-5xl font-black text-gray-800 mb-2">{stats.totalLikes}</p>
            <p className="text-gray-600 font-bold text-sm">{t('stats.totalLikes')}</p>
          </div>

          {/* 총 조회수 */}
          <div className="glass-morphism rounded-3xl p-8 text-center border-2 border-blue-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="mb-4 relative inline-block">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20"></div>
              <Eye className="w-12 h-12 text-blue-500 mx-auto relative" />
            </div>
            <p className="text-4xl md:text-5xl font-black text-gray-800 mb-2">{stats.totalViews}</p>
            <p className="text-gray-600 font-bold text-sm">{t('stats.totalViews')}</p>
          </div>

          {/* 카테고리 수 */}
          <div className="glass-morphism rounded-3xl p-8 text-center border-2 border-amber-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="mb-4 relative inline-block">
              <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20"></div>
              <Award className="w-12 h-12 text-amber-500 mx-auto relative" />
            </div>
            <p className="text-4xl md:text-5xl font-black text-gray-800 mb-2">{stats.totalCategories}</p>
            <p className="text-gray-600 font-bold text-sm">{t('stats.totalCategories')}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 🏷️ 카테고리 필터 섹션
  const categorySection = () => (
    <div className="py-12 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8 gap-3">
          <Filter className="w-7 h-7 text-green-600" />
          <h2 className="text-3xl font-black text-gray-800">{t('recipe.filterByCategory')}</h2>
          <Leaf className="w-7 h-7 text-green-600" />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                selectedCategory === category 
                  ? 'btn-primary text-white shadow-xl scale-110' 
                  : 'glass-morphism border-2 border-green-200 text-gray-700 hover:bg-green-50 hover:border-green-400 hover:text-green-700 hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // 📚 레시피 목록 섹션
  const recipesSection = () => (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div>
            <h3 className="text-4xl font-black text-gray-800 mb-3 flex items-center gap-3">
              <Leaf className="w-8 h-8 text-green-600" />
              {selectedCategory === t('common:category.all') ? t('recipe.allRecipes') : `${selectedCategory} ${t('recipe.title')}`}
            </h3>
            <p className="text-gray-600 text-lg">
              {searchTerm && <span className="font-bold text-green-600">"{searchTerm}"</span>}
              {searchTerm && ' 검색 결과 • '}
              <span className="font-black text-green-600">{recipes.length}</span>개의 레시피
              {hasMore && <span className="text-gray-400 ml-2 text-sm">({t('recipe.loadingMore')})</span>}
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 glass-morphism rounded-xl border border-green-200">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="font-bold text-sm text-gray-700">{t('common:sort.recent')}</span>
          </div>
        </div>

        {/* 로딩 상태 */}
        {loading && recipes.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <Leaf className="w-6 h-6 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-gray-600 font-bold text-lg">{t('recipe.loadingRecipes')}</p>
              <p className="text-gray-400 text-sm mt-2">숲에서 맛있는 이야기를 가져오는 중...</p>
            </div>
          </div>
        ) : recipes.length > 0 ? (
          <>
            {/* 레시피 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {recipes.map((recipe, index) => {
                if (recipes.length === index + 1) {
                  return (
                    <div ref={lastRecipeElementRef} key={recipe.id}>
                      <RecipeCard
                        recipe={recipe}
                        onClick={() => onRecipeClick(recipe)}
                      />
                    </div>
                  );
                } else {
                  return (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onClick={() => onRecipeClick(recipe)}
                    />
                  );
                }
              })}
            </div>
            
            {/* 추가 로딩 */}
            {loading && recipes.length > 0 && (
              <div className="flex justify-center mt-16">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                    <Leaf className="w-5 h-5 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-gray-600 font-bold">{t('recipe.loadingMore')}</p>
                </div>
              </div>
            )}
            
            {/* 모든 레시피 로드 완료 */}
            {!hasMore && recipes.length > 0 && (
              <div className="text-center mt-16">
                <div className="inline-flex items-center gap-2 px-6 py-3 glass-morphism rounded-2xl border-2 border-green-200">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <p className="text-gray-600 font-bold">{t('recipe.allLoaded')}</p>
                  <Leaf className="w-5 h-5 text-green-600 rotate-180" />
                </div>
              </div>
            )}
          </>
        ) : (
          /* 레시피 없음 */
          <div className="text-center py-20">
            <div className="glass-morphism rounded-3xl p-16 max-w-lg mx-auto border-2 border-green-200">
              <div className="mb-6 relative inline-block">
                <Leaf className="w-20 h-20 text-gray-300 mx-auto" />
                <Wind className="w-8 h-8 text-gray-200 absolute -top-2 -right-2" />
              </div>
              <h4 className="text-2xl font-black text-gray-500 mb-3">{t('recipe.noRecipes')}</h4>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {searchTerm ? (
                  <>
                    <span className="font-bold">"{searchTerm}"</span>와 관련된 레시피를 찾을 수 없습니다.<br />
                    다른 검색어로 시도해보세요! 🔍
                  </>
                ) : selectedCategory !== t('common:category.all') ? (
                  <>
                    <span className="font-bold">{selectedCategory}</span> 카테고리에<br />
                    아직 레시피가 없습니다. 🌱
                  </>
                ) : (
                  '아직 등록된 레시피가 없습니다.<br />첫 번째 레시피를 등록해보세요! 🌿'
                )}
              </p>
              {user && !searchTerm && (
                <button 
                  onClick={() => onNavigate('create')}
                  className="px-8 py-4 btn-primary text-white rounded-2xl font-black shadow-lg inline-flex items-center gap-2"
                >
                  <Leaf className="w-5 h-5" />
                  {t('recipe.registerFirstRecipe')}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {heroSection()}
      {statsSection()}
      {categorySection()}
      {recipesSection()}
    </div>
  );
};

export default HomePage;
