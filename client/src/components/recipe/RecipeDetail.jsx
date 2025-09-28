import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, BarChart, BookOpen, Heart, Edit, Trash2, Eye, Share2, Star } from 'lucide-react';
import { apiRequest, formatDate } from '../../utils/api';

const RecipeDetail = ({ recipeId, setCurrentPage, user, onNavigate }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  const fetchRecipe = async () => {
    try {
      const data = await apiRequest(`/recipes/${recipeId}`);
      setRecipe(data);
    } catch (error) {
      console.error('레시피 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 레시피를 삭제하시겠습니까?')) return;
    
    try {
      await apiRequest(`/recipes/${recipeId}`, { method: 'DELETE' });
      alert('레시피가 삭제되었습니다.');
      setCurrentPage('home');
    } catch (error) {
      alert('삭제 실패: ' + error.message);
    }
  };

  const handleLike = async () => {
    try {
      const data = await apiRequest(`/recipes/${recipeId}/like`, { method: 'POST' });
      setRecipe(prev => ({ ...prev, likeCount: data.likeCount }));
      setLiked(!liked);
    } catch (error) {
      alert('로그인이 필요합니다.');
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
      // 폴백: 클립보드에 복사
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">레시피를 불러오고 있어요...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen gradient-bg flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">레시피를 찾을 수 없습니다</h2>
          <button
            onClick={() => setCurrentPage('home')}
            className="px-6 py-3 btn-primary text-white rounded-xl font-semibold"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-orange-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          목록으로 돌아가기
        </button>

        <div className="max-w-4xl mx-auto">
          {/* 레시피 헤더 */}
          <div className="glass-morphism rounded-3xl shadow-xl p-8 mb-8 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* 이미지 */}
              <div className="lg:w-1/2">
                <div className="aspect-video bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl overflow-hidden">
                  {recipe.imageUrl ? (
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-24 h-24 text-white/50" />
                    </div>
                  )}
                </div>
              </div>

              {/* 정보 */}
              <div className="lg:w-1/2">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                    {recipe.category}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{recipe.description}</p>

                {/* 작성자 정보 */}
                {recipe.author && (
                  <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {recipe.author.nickname?.[0] || recipe.author.username?.[0] || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {recipe.author.nickname || recipe.author.username}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(recipe.createdAt)}
                      </p>
                    </div>
                  </div>
                )}

                {/* 액션 버튼들 */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                      liked 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-200'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    좋아요 ({recipe.likeCount || 0})
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-200 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    공유하기
                  </button>

                  {user && user.id === recipe.author?.id && (
                    <>
                      <button
                        onClick={() => onNavigate('edit', recipeId)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                        수정
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 요리 정보 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-morphism rounded-xl p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">조리시간</p>
              <p className="font-bold text-lg">{recipe.cookingTime}분</p>
            </div>
            <div className="glass-morphism rounded-xl p-4 text-center border border-gray-200">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">인분</p>
              <p className="font-bold text-lg">{recipe.servings}인분</p>
            </div>
            <div className="glass-morphism rounded-xl p-4 text-center border border-gray-200">
              <BarChart className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">난이도</p>
              <p className="font-bold text-lg">{recipe.difficulty}</p>
            </div>
            <div className="glass-morphism rounded-xl p-4 text-center border border-gray-200">
              <Eye className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">조회수</p>
              <p className="font-bold text-lg">{recipe.viewCount || 0}</p>
            </div>
          </div>

          {/* 재료 */}
          <div className="glass-morphism rounded-3xl shadow-xl p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-500" />
              필요한 재료
            </h2>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.ingredients?.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/70 rounded-xl">
                    <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 조리 순서 */}
          <div className="glass-morphism rounded-3xl shadow-xl p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-orange-500" />
              조리 순서
            </h2>
            <div className="space-y-4">
              {recipe.steps?.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 태그 */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="glass-morphism rounded-3xl shadow-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">관련 태그</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-medium"
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
