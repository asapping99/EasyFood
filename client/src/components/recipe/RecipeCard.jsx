/**
 * RecipeCard - react-i18next 적용
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Users, Eye, Heart, Star, ChefHat } from 'lucide-react';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';

const RecipeCard = ({ recipe, onClick }) => {
  const { t } = useTranslation(['recipe', 'common']);
  
  const getDifficultyColor = (difficulty) => {
    const difficultyMap = {
      [t('common:difficulty.easy')]: 'text-green-600 bg-green-50',
      [t('common:difficulty.medium')]: 'text-yellow-600 bg-yellow-50',
      [t('common:difficulty.hard')]: 'text-red-600 bg-red-50',
      '초급': 'text-green-600 bg-green-50',
      '중급': 'text-yellow-600 bg-yellow-50',
      '고급': 'text-red-600 bg-red-50',
    };
    return difficultyMap[difficulty] || 'text-gray-600 bg-gray-50';
  };

  const getCategoryColor = (category) => {
    const colors = {
      '한식': 'bg-red-100 text-red-700',
      '중식': 'bg-yellow-100 text-yellow-700',
      '일식': 'bg-pink-100 text-pink-700',
      '양식': 'bg-blue-100 text-blue-700',
      '디저트': 'bg-purple-100 text-purple-700',
      '음료': 'bg-green-100 text-green-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer card-hover border border-gray-100"
    >
      {/* 이미지 섹션 */}
      <div className="h-48 bg-gradient-to-br from-orange-200 to-red-200 relative overflow-hidden">
        {recipe.imageUrl ? (
          <img 
            src={getImageUrl(recipe.imageUrl)} 
            alt={recipe.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ChefHat className="w-16 h-16 text-white/50" />
          </div>
        )}
        
        {/* 오버레이 정보 */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(recipe.category)}`}>
            {recipe.category}
          </span>
          <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>

        {/* 좋아요 버튼 */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/90 backdrop-blur rounded-full p-2">
            <Heart className="w-4 h-4 text-red-500" />
          </div>
        </div>
      </div>
      
      {/* 콘텐츠 섹션 */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {recipe.description || t('hero.recipeDescription')}
        </p>
        
        {/* 메타 정보 */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              {recipe.cookingTime}{t('common:unit.minute')}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <Users className="w-4 h-4" />
              {recipe.servings}{t('common:unit.serving')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-gray-500">
              <Eye className="w-4 h-4" />
              {recipe.viewCount || 0}
            </span>
            <span className="flex items-center gap-1 text-red-500">
              <Heart className="w-4 h-4" />
              {recipe.likeCount || 0}
            </span>
          </div>
        </div>

        {/* 작성자 정보 */}
        {recipe.author && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {recipe.author.nickname?.[0] || recipe.author.username?.[0] || 'U'}
                  </span>
                </div>
                <span className="text-xs text-gray-600">
                  {recipe.author.nickname || recipe.author.username}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-gray-500">4.5</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
