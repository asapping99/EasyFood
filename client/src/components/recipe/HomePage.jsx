import React, { useState, useEffect } from 'react';
import { ChefHat, Eye, Heart, Clock, Users, BarChart, Star, TrendingUp, Award, Filter } from 'lucide-react';
import { CATEGORIES } from '../../utils/api';
import RecipeCard from '../recipe/RecipeCard';

const HomePage = ({ 
  recipes, 
  loading, 
  searchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  onRecipeClick,
  user 
}) => {
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalLikes: 0,
    totalViews: 0,
    totalCategories: 0
  });

  useEffect(() => {
    if (recipes.length > 0) {
      setStats({
        totalRecipes: recipes.length,
        totalLikes: recipes.reduce((sum, recipe) => sum + (recipe.likeCount || 0), 0),
        totalViews: recipes.reduce((sum, recipe) => sum + (recipe.viewCount || 0), 0),
        totalCategories: CATEGORIES.length - 1 // '전체' 제외
      });
    }
  }, [recipes]);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const heroSection = () => (
    <div className="relative overflow-hidden">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-pink-100"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center fade-in">
          <div className="mb-8">
            <ChefHat className="w-20 h-20 text-orange-500 mx-auto mb-4 bounce-animation" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            맛있는 <span className="text-gradient">한국 요리</span> 레시피
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            집에서 쉽게 만들 수 있는 다양한 한국 요리를 발견하고, 
            나만의 특별한 레시피를 공유해보세요
          </p>
          
          {!user && (
            <div className="space-y-4">
              <button className="px-8 py-4 btn-primary text-white rounded-2xl font-bold text-lg mr-4">
                지금 시작하기
              </button>
              <button className="px-8 py-4 bg-white/70 backdrop-blur border border-gray-200 text-gray-700 rounded-2xl font-bold text-lg hover:bg-white transition-all">
                인기 레시피 보기
              </button>
            </div>
          )}

          {user && (
            <div className="bg-white/70 backdrop-blur rounded-2xl p-6 max-w-md mx-auto border border-gray-200">
              <p className="text-gray-700 mb-3">
                안녕하세요, <span className="font-bold text-orange-600">{user.nickname || user.username}</span>님! 👋
              </p>
              <p className="text-sm text-gray-600">
                오늘은 어떤 요리에 도전해보실까요?
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
          <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200">
            <ChefHat className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.totalRecipes}</p>
            <p className="text-gray-600 text-sm">전체 레시피</p>
          </div>
          <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.totalLikes}</p>
            <p className="text-gray-600 text-sm">총 좋아요</p>
          </div>
          <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200">
            <Eye className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.totalViews}</p>
            <p className="text-gray-600 text-sm">총 조회수</p>
          </div>
          <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200">
            <Award className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.totalCategories}</p>
            <p className="text-gray-600 text-sm">카테고리</p>
          </div>
        </div>
      </div>
    </div>
  );

  const categorySection = () => (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mr-4">카테고리별 탐색</h2>
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
              {selectedCategory === '전체' ? '모든 레시피' : `${selectedCategory} 레시피`}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? `"${searchTerm}" 검색 결과 ` : ''}
              총 <span className="font-semibold text-orange-600">{filteredRecipes.length}</span>개의 레시피
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>최신순</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">맛있는 레시피를 불러오고 있어요...</p>
            </div>
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => onRecipeClick(recipe)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="glass-morphism rounded-3xl p-12 max-w-md mx-auto border border-gray-200">
              <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-500 mb-2">레시피가 없습니다</h4>
              <p className="text-gray-400 mb-6">
                {searchTerm ? (
                  <>검색 조건을 변경하거나<br />다른 키워드로 시도해보세요</>
                ) : (
                  <>첫 번째 레시피를 등록하고<br />요리 여행을 시작해보세요!</>
                )}
              </p>
              {user && !searchTerm && (
                <button className="px-6 py-3 btn-primary text-white rounded-xl font-semibold">
                  첫 레시피 등록하기
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
