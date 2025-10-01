/**
 * HomePage - react-i18next 버전
 * 새로운 API 서비스 + react-i18next 다국어 지원
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChefHat, Eye, Heart, Clock, Users, BarChart, Star, TrendingUp, Award, Filter } from 'lucide-react';
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

  const heroSection = () => (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-pink-100"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center fade-in">
          <div className="mb-8">
            <ChefHat className="w-20 h-20 text-orange-500 mx-auto mb-4 bounce-animation" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            <span className="text-gradient">{t('hero.mainTitle')}</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('hero.mainDescription')}
          </p>
          
          {!user && (
            <div className="space-y-4">
              <button 
                onClick={() => onNavigate('login')}
                className="px-8 py-4 btn-primary text-white rounded-2xl font-bold text-lg mr-4 hover:shadow-xl transition-all">
                {t('hero.startNow')}
              </button>
              <button 
                onClick={() => {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white/70 backdrop-blur border border-gray-200 text-gray-700 rounded-2xl font-bold text-lg hover:bg-white transition-all">
                {t('hero.viewPopular')}
              </button>
            </div>
          )}

          {user && (
            <div className="bg-white/70 backdrop-blur rounded-2xl p-6 max-w-md mx-auto border border-gray-200">
              <p className="text-gray-700 mb-3">
                {t('hero.greeting')}, <span className="font-bold text-orange-600">{user.nickname || user.username}</span>{t('hero.greetingMessage')}
              </p>
              <p className="text-sm text-gray-600">
                {t('hero.todayQuestion')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const statsSection = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
            <ChefHat className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.totalRecipes}</p>
            <p className="text-gray-600 text-sm">{t('stats.totalRecipes')}</p>
          </div>
          <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.totalLikes}</p>
            <p className="text-gray-600 text-sm">{t('stats.totalLikes')}</p>
          </div>
          <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
            <Eye className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.totalViews}</p>
            <p className="text-gray-600 text-sm">{t('stats.totalViews')}</p>
          </div>
          <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
            <Award className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.totalCategories}</p>
            <p className="text-gray-600 text-sm">{t('stats.totalCategories')}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const categorySection = () => (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mr-4">{t('recipe.filterByCategory')}</h2>
          <Filter className="w-6 h-6 text-orange-500" />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === category 
                  ? 'btn-primary text-white shadow-lg scale-105' 
                  : 'bg-white/70 border border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const recipesSection = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {selectedCategory === t('common:category.all') ? t('recipe.allRecipes') : `${selectedCategory} ${t('recipe.title')}`}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? `"${searchTerm}" ${t('recipe.searchResults')} ` : ''}
              <span className="font-semibold text-orange-600">{recipes.length}</span>개의 {t('recipe.title')}
              {hasMore && <span className="text-gray-400 ml-1">({t('recipe.loadingMore')})</span>}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>{t('common:sort.recent')}</span>
          </div>
        </div>

        {loading && recipes.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('recipe.loadingRecipes')}</p>
            </div>
          </div>
        ) : recipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            
            {loading && recipes.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">{t('recipe.loadingMore')}</p>
                </div>
              </div>
            )}
            
            {!hasMore && recipes.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-gray-500">{t('recipe.allLoaded')}</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="glass-morphism rounded-3xl p-12 max-w-md mx-auto border border-gray-200">
              <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-500 mb-2">{t('recipe.noRecipes')}</h4>
              <p className="text-gray-400 mb-6">
                {searchTerm ? (
                  t('messages.changeSearchTerm')
                ) : selectedCategory !== t('common:category.all') ? (
                  t('messages.changeCategory')
                ) : (
                  t('recipe.createFirstRecipe')
                )}
              </p>
              {user && !searchTerm && (
                <button 
                  onClick={() => onNavigate('create')}
                  className="px-6 py-3 btn-primary text-white rounded-xl font-semibold"
                >
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
    <div className="min-h-screen gradient-bg">
      {heroSection()}
      {statsSection()}
      {categorySection()}
      {recipesSection()}
    </div>
  );
};

export default HomePage;
