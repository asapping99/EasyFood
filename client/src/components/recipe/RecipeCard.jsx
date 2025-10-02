/**
 * RecipeCard - 레시피 숲 테마
 * 자연스럽고 따뜻한 느낌의 카드 디자인
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Users, Eye, Heart, Star, Leaf, Sparkles } from 'lucide-react';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';

const RecipeCard = ({ recipe, onClick }) => {
  const { t } = useTranslation(['recipe', 'common']);
  
  const getDifficultyColor = (difficulty) => {
    const difficultyMap = {
      [t('common:difficulty.easy')]: 'text-green-700 bg-green-100/80 border-green-200',
      [t('common:difficulty.medium')]: 'text-amber-700 bg-amber-100/80 border-amber-200',
      [t('common:difficulty.hard')]: 'text-red-700 bg-red-100/80 border-red-200',
      '초급': 'text-green-700 bg-green-100/80 border-green-200',
      '중급': 'text-amber-700 bg-amber-100/80 border-amber-200',
      '고급': 'text-red-700 bg-red-100/80 border-red-200',
    };
    return difficultyMap[difficulty] || 'text-gray-700 bg-gray-100/80 border-gray-200';
  };

  const getCategoryColor = (category) => {
    const colors = {
      '한식': 'bg-gradient-to-br from-red-100 to-rose-100 text-red-700 border-red-200',
      '중식': 'bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-700 border-amber-200',
      '일식': 'bg-gradient-to-br from-pink-100 to-rose-100 text-pink-700 border-pink-200',
      '양식': 'bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-700 border-blue-200',
      '디저트': 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 border-purple-200',
      '음료': 'bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 border-green-200',
    };
    return colors[category] || 'bg-gradient-to-br from-gray-100 to-slate-100 text-gray-700 border-gray-200';
  };

  return (
    <div 
      onClick={onClick}
      className="glass-morphism rounded-3xl overflow-hidden cursor-pointer card-hover border-2 border-green-100 group"
    >
      {/* 🖼️ 이미지 섹션 */}
      <div className="h-52 bg-gradient-to-br from-green-200 via-emerald-200 to-lime-200 relative overflow-hidden">
        {recipe.imageUrl ? (
          <>
            <img 
              src={getImageUrl(recipe.imageUrl)} 
              alt={recipe.title} 
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              onError={handleImageError}
            />
            {/* 이미지 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              <Leaf className="w-20 h-20 text-white/40" />
              <Sparkles className="w-8 h-8 text-amber-300/50 absolute -top-2 -right-2" />
            </div>
          </div>
        )}
        
        {/* 🏷️ 카테고리 & 난이도 배지 */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm border ${getCategoryColor(recipe.category)} shadow-lg`}>
            {recipe.category}
          </span>
          <span className={`px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm border ${getDifficultyColor(recipe.difficulty)} shadow-lg`}>
            {recipe.difficulty}
          </span>
        </div>

        {/* ❤️ 좋아요 표시 */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-full p-2.5 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Heart className={`w-5 h-5 ${recipe.likeCount > 0 ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>
      
      {/* 📝 콘텐츠 섹션 */}
      <div className="p-6">
        <h3 className="font-black text-xl text-gray-800 mb-2 line-clamp-1 group-hover:text-green-700 transition-colors">
          {recipe.title}
        </h3>
        <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
          {recipe.description || '신선한 재료로 만드는 건강한 레시피'}
        </p>
        
        {/* ⏰ 메타 정보 */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-600 font-medium">
              <Clock className="w-4 h-4 text-green-600" />
              {recipe.cookingTime}{t('common:unit.minute')}
            </span>
            <span className="flex items-center gap-1.5 text-gray-600 font-medium">
              <Users className="w-4 h-4 text-green-600" />
              {recipe.servings}{t('common:unit.serving')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-gray-500 font-medium">
              <Eye className="w-4 h-4" />
              {recipe.viewCount || 0}
            </span>
            <span className="flex items-center gap-1 text-red-500 font-bold">
              <Heart className="w-4 h-4" />
              {recipe.likeCount || 0}
            </span>
          </div>
        </div>

        {/* 👤 작성자 정보 */}
        {recipe.author && (
          <div className="pt-4 border-t-2 border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-black">
                    {recipe.author.nickname?.[0] || recipe.author.username?.[0] || 'U'}
                  </span>
                </div>
                <span className="text-sm text-gray-700 font-bold">
                  {recipe.author.nickname || recipe.author.username}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs text-amber-700 font-bold">4.5</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 호버 시 나타나는 효과 */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
        <Leaf className="absolute top-4 right-4 w-12 h-12 text-green-400/20 rotate-12" />
      </div>
    </div>
  );
};

export default RecipeCard;
