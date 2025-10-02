/**
 * RecipeDetail - 레시피 숲 테마
 * 자연 속에서 레시피를 즐기는 느낌
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, Users, BarChart, Leaf, Heart, Edit, Trash2, Eye, Share2, Star, Sparkles, TreePine, Wind } from 'lucide-react';
import { getRecipeById, deleteRecipe, likeRecipe } from '../../api';
import { formatDate } from '../../utils/api';
import { usePageTitle } from '../../hooks/usePageTitle';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';

const RecipeDetail = ({ recipeId, setCurrentPage, user, onNavigate }) => {
  const { t } = useTranslation(['recipe', 'common']);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  // 페이지 타이틀 동적 변경
  usePageTitle('recipeDetail', recipe?.title);

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  const fetchRecipe = async () => {
    try {
      const data = await getRecipeById(recipeId);
      setRecipe(data);
    } catch (error) {
      console.error(t('messages.loadFailed'), error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(t('detail.deleteConfirm'))) return;
    
    try {
      await deleteRecipe(recipeId);
      alert(t('detail.deleteSuccess'));
      setCurrentPage('home');
    } catch (error) {
      alert(t('detail.deleteFailed') + ': ' + error.message);
    }
  };

  const handleLike = async () => {
    try {
      const data = await likeRecipe(recipeId);
      setRecipe(prev => ({ ...prev, likeCount: data.likeCount }));
      setLiked(!liked);
    } catch (error) {
      alert(t('detail.loginRequired'));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('공유 취소');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('detail.shareMessage'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex justify-center items-center">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <Leaf className="w-6 h-6 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600 font-bold">{t('recipe.loadingRecipes')}</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen gradient-bg flex justify-center items-center">
        <div className="text-center glass-morphism rounded-3xl p-12 max-w-md border-2 border-green-200">
          <TreePine className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-500 mb-4">{t('detail.notFound')}</h2>
          <button
            onClick={() => setCurrentPage('home')}
            className="px-6 py-3 btn-primary text-white rounded-xl font-bold"
          >
            {t('common:backToHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* 🔙 뒤로가기 버튼 */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 mb-6 px-4 py-2 glass-morphism rounded-xl border border-green-200 text-gray-700 hover:text-green-700 hover:border-green-400 transition-all hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">{t('common:backToList')}</span>
        </button>

        <div className="max-w-5xl mx-auto">
          {/* 🎨 레시피 헤더 */}
          <div className="glass-morphism rounded-3xl shadow-2xl p-8 mb-8 border-2 border-green-200">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* 이미지 */}
              <div className="lg:w-1/2">
                <div className="aspect-video bg-gradient-to-br from-green-200 via-emerald-200 to-lime-200 rounded-2xl overflow-hidden shadow-lg relative group">
                  {recipe.imageUrl ? (
                    <>
                      <img 
                        src={getImageUrl(recipe.imageUrl)} 
                        alt={recipe.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="relative">
                        <Leaf className="w-24 h-24 text-white/40" />
                        <Sparkles className="w-10 h-10 text-amber-300/40 absolute -top-2 -right-2" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 정보 */}
              <div className="lg:w-1/2">
                <div className="mb-4 flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-xl text-sm font-bold border border-green-200">
                    {recipe.category}
                  </span>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 rounded-xl text-sm font-bold border border-amber-200">
                    {recipe.difficulty}
                  </span>
                </div>

                <h1 className="text-4xl font-black text-gray-800 mb-4 leading-tight">{recipe.title}</h1>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{recipe.description}</p>

                {/* 👤 작성자 정보 */}
                {recipe.author && (
                  <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-lg">
                        {recipe.author.nickname?.[0] || recipe.author.username?.[0] || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-black text-gray-800">
                        {recipe.author.nickname || recipe.author.username}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">
                        {formatDate(recipe.createdAt)}
                      </p>
                    </div>
                  </div>
                )}

                {/* 🎯 액션 버튼들 */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all shadow-lg hover:scale-105 ${
                      liked 
                        ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white' 
                        : 'glass-morphism border-2 border-red-200 text-gray-700 hover:bg-red-50 hover:border-red-300'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-white' : ''}`} />
                    {t('detail.likeCount', { count: recipe.likeCount || 0 })}
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-3 glass-morphism border-2 border-blue-200 text-gray-700 rounded-2xl font-bold hover:bg-blue-50 hover:border-blue-300 transition-all shadow-lg hover:scale-105"
                  >
                    <Share2 className="w-5 h-5" />
                    {t('detail.shareButton')}
                  </button>

                  {user && user.id === recipe.author?.id && (
                    <>
                      <button
                        onClick={() => onNavigate('edit', recipeId)}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:scale-105"
                      >
                        <Edit className="w-5 h-5" />
                        {t('detail.editButton')}
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-2xl font-bold hover:from-red-600 hover:to-rose-600 transition-all shadow-lg hover:scale-105"
                      >
                        <Trash2 className="w-5 h-5" />
                        {t('detail.deleteButton')}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 📊 요리 정보 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-morphism rounded-2xl p-6 text-center border-2 border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mb-3 relative inline-block">
                <div className="absolute inset-0 bg-green-500 blur-xl opacity-20"></div>
                <Clock className="w-8 h-8 text-green-600 mx-auto relative" />
              </div>
              <p className="text-sm text-gray-600 font-bold mb-1">{t('detail.cookingTime')}</p>
              <p className="font-black text-2xl text-gray-800">{recipe.cookingTime}{t('common:unit.minute')}</p>
            </div>
            <div className="glass-morphism rounded-2xl p-6 text-center border-2 border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mb-3 relative inline-block">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20"></div>
                <Users className="w-8 h-8 text-blue-600 mx-auto relative" />
              </div>
              <p className="text-sm text-gray-600 font-bold mb-1">{t('detail.servings')}</p>
              <p className="font-black text-2xl text-gray-800">{recipe.servings}{t('common:unit.serving')}</p>
            </div>
            <div className="glass-morphism rounded-2xl p-6 text-center border-2 border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mb-3 relative inline-block">
                <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20"></div>
                <BarChart className="w-8 h-8 text-amber-600 mx-auto relative" />
              </div>
              <p className="text-sm text-gray-600 font-bold mb-1">{t('detail.difficulty')}</p>
              <p className="font-black text-2xl text-gray-800">{recipe.difficulty}</p>
            </div>
            <div className="glass-morphism rounded-2xl p-6 text-center border-2 border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mb-3 relative inline-block">
                <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20"></div>
                <Eye className="w-8 h-8 text-purple-600 mx-auto relative" />
              </div>
              <p className="text-sm text-gray-600 font-bold mb-1">{t('detail.viewCount')}</p>
              <p className="font-black text-2xl text-gray-800">{recipe.viewCount || 0}</p>
            </div>
          </div>

          {/* 🥗 재료 */}
          <div className="glass-morphism rounded-3xl shadow-xl p-8 mb-8 border-2 border-green-200">
            <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
              <Leaf className="w-8 h-8 text-green-600" />
              {t('detail.ingredients')}
            </h2>
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 rounded-2xl p-6 border border-green-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recipe.ingredients?.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 glass-morphism rounded-xl border border-green-200 hover:scale-105 transition-transform duration-300">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 📝 조리 순서 */}
          <div className="glass-morphism rounded-3xl shadow-xl p-8 mb-8 border-2 border-green-200">
            <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
              <Star className="w-8 h-8 text-amber-500" />
              {t('detail.steps')}
            </h2>
            <div className="space-y-5">
              {recipe.steps?.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div className="flex-1 p-5 bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl border border-green-200 group-hover:shadow-lg transition-all duration-300">
                    <p className="text-gray-700 leading-relaxed font-medium">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🏷️ 태그 */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="glass-morphism rounded-3xl shadow-xl p-8 border-2 border-green-200">
              <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                <Wind className="w-6 h-6 text-green-600" />
                {t('form.relatedTags')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {recipe.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-xl text-sm font-bold border border-green-200 hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
