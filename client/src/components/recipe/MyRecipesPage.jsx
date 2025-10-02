/**
 * MyRecipesPage - 레시피 숲 테마
 * 나만의 레시피 정원
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf, Plus, Edit, Trash2, Eye, Heart, Clock, TreePine, Sparkles, Award } from 'lucide-react';
import { getMyRecipes, deleteRecipe } from '../../api';
import RecipeCard from './RecipeCard';

const MyRecipesPage = ({ user, onNavigate, onRecipeClick }) => {
  const { t } = useTranslation(['recipe', 'common']);
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchMyRecipes();
    }
  }, [user]);

  const fetchMyRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyRecipes();
      setMyRecipes(data.content || data || []);
    } catch (error) {
      console.error(t('messages.loadFailed'), error);
      setError(t('messages.loadDataFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm(t('detail.deleteConfirm'))) {
      return;
    }

    try {
      await deleteRecipe(recipeId);
      alert(t('detail.deleteSuccess'));
      fetchMyRecipes();
    } catch (error) {
      console.error(t('messages.deleteFailed'), error);
      alert(t('messages.deleteFailed'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <Leaf className="w-6 h-6 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-gray-700 font-bold text-lg">{t('recipe.loadingRecipes')}</p>
              <p className="text-gray-500 text-sm mt-2">나의 레시피 정원을 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* 🌿 헤더 */}
        <div className="glass-morphism rounded-3xl p-8 mb-8 border-2 border-green-200 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 blur-xl opacity-30"></div>
                <TreePine className="w-12 h-12 text-green-600 relative" />
                <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 sparkle" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-2 flex items-center gap-2">
                  {t('recipe.myRecipes')}
                  <span className="text-2xl">🌳</span>
                </h1>
                <p className="text-gray-600 font-bold">
                  <span className="text-green-600 font-black text-xl">{myRecipes.length}</span>개의 레시피가 자라고 있어요
                </p>
              </div>
            </div>
            
            <button
              onClick={() => onNavigate('create')}
              className="px-6 py-3.5 btn-primary text-white rounded-2xl font-black flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              {t('recipe.newRecipe')}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6 font-bold">
            {error}
          </div>
        )}

        {/* 📚 레시피 목록 */}
        {myRecipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {myRecipes.map(recipe => (
                <div key={recipe.id} className="relative group">
                  <RecipeCard
                    recipe={recipe}
                    onClick={() => onRecipeClick(recipe)}
                  />
                  
                  {/* 관리 버튼 */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('edit', recipe.id);
                      }}
                      className="p-2.5 glass-morphism border-2 border-blue-200 rounded-xl hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all shadow-lg hover:scale-110"
                      title={t('common:edit')}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(recipe.id);
                      }}
                      className="p-2.5 glass-morphism border-2 border-red-200 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-lg hover:scale-110"
                      title={t('common:delete')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 📊 통계 정보 */}
            <div className="glass-morphism rounded-3xl p-8 border-2 border-green-200 shadow-xl">
              <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                나의 레시피 통계
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 hover:scale-105 transition-transform duration-300">
                  <div className="mb-3 relative inline-block">
                    <div className="absolute inset-0 bg-green-500 blur-xl opacity-20"></div>
                    <TreePine className="w-10 h-10 text-green-600 mx-auto relative" />
                  </div>
                  <p className="text-3xl font-black text-gray-800 mb-1">{myRecipes.length}</p>
                  <p className="text-gray-600 font-bold text-sm">{t('stats.registeredRecipes')}</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border-2 border-red-200 hover:scale-105 transition-transform duration-300">
                  <div className="mb-3 relative inline-block">
                    <div className="absolute inset-0 bg-red-500 blur-xl opacity-20"></div>
                    <Heart className="w-10 h-10 text-red-500 mx-auto relative" />
                  </div>
                  <p className="text-3xl font-black text-gray-800 mb-1">
                    {myRecipes.reduce((sum, r) => sum + (r.likeCount || 0), 0)}
                  </p>
                  <p className="text-gray-600 font-bold text-sm">{t('stats.receivedLikes')}</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200 hover:scale-105 transition-transform duration-300">
                  <div className="mb-3 relative inline-block">
                    <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20"></div>
                    <Eye className="w-10 h-10 text-blue-500 mx-auto relative" />
                  </div>
                  <p className="text-3xl font-black text-gray-800 mb-1">
                    {myRecipes.reduce((sum, r) => sum + (r.viewCount || 0), 0)}
                  </p>
                  <p className="text-gray-600 font-bold text-sm">{t('stats.totalViews')}</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-200 hover:scale-105 transition-transform duration-300">
                  <div className="mb-3 relative inline-block">
                    <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20"></div>
                    <Clock className="w-10 h-10 text-amber-600 mx-auto relative" />
                  </div>
                  <p className="text-3xl font-black text-gray-800 mb-1">
                    {myRecipes.length > 0 
                      ? Math.round(myRecipes.reduce((sum, r) => sum + (r.cookingTime || 0), 0) / myRecipes.length)
                      : 0
                    }분
                  </p>
                  <p className="text-gray-600 font-bold text-sm">{t('stats.averageCookingTime')}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* 빈 상태 */
          <div className="text-center py-20">
            <div className="glass-morphism rounded-3xl p-16 border-2 border-green-200 max-w-2xl mx-auto shadow-xl">
              <div className="mb-6 relative inline-block">
                <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 animate-pulse"></div>
                <TreePine className="w-24 h-24 text-gray-300 mx-auto relative" />
                <Leaf className="w-10 h-10 text-green-300 absolute -top-2 -right-2 animate-bounce" />
              </div>
              <h2 className="text-3xl font-black text-gray-600 mb-4">
                {t('recipe.noRecipesYet')}
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed text-lg">
                🌱 첫 번째 레시피를 심어보세요!<br />
                당신만의 레시피 정원이 자라날 거예요
              </p>
              
              <button
                onClick={() => onNavigate('create')}
                className="px-10 py-4 btn-primary text-white rounded-2xl font-black text-lg flex items-center gap-2 mx-auto shadow-2xl hover:scale-105 transition-all"
              >
                <Plus className="w-6 h-6" />
                {t('recipe.registerFirstRecipe')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipesPage;
