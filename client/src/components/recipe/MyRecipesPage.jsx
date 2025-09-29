import React, { useState, useEffect } from 'react';
import { ChefHat, Plus, Edit, Trash2, Eye, Heart, Clock, Users } from 'lucide-react';
import RecipeCard from './RecipeCard';

const MyRecipesPage = ({ user, onNavigate, onRecipeClick }) => {
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
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:8080/api'}/recipes/user/${user.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMyRecipes(data.content || data || []);
      } else {
        console.error('내 레시피 로드 실패');
        setError('레시피를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('내 레시피 로드 오류:', error);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm('정말로 이 레시피를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:8080/api'}/recipes/${recipeId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        alert('레시피가 삭제되었습니다.');
        fetchMyRecipes(); // 목록 새로고침
      } else {
        alert('레시피 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('레시피 삭제 오류:', error);
      alert('레시피 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">레시피를 불러오고 있어요...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              내 레시피
            </h1>
            <p className="text-gray-600">
              총 <span className="font-semibold text-orange-600">{myRecipes.length}</span>개의 레시피를 등록했어요
            </p>
          </div>
          
          <button
            onClick={() => onNavigate('create')}
            className="px-6 py-3 btn-primary text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            새 레시피 작성
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* 레시피 목록 */}
        {myRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myRecipes.map(recipe => (
              <div key={recipe.id} className="relative">
                <RecipeCard
                  recipe={recipe}
                  onClick={() => onRecipeClick(recipe)}
                />
                
                {/* 관리 버튼 */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('edit', recipe.id);
                    }}
                    className="p-2 bg-white/90 backdrop-blur rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-md"
                    title="수정"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(recipe.id);
                    }}
                    className="p-2 bg-white/90 backdrop-blur rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-md"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="glass-morphism rounded-3xl p-12 border border-gray-200 max-w-md mx-auto">
              <ChefHat className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-3">
                아직 등록한 레시피가 없습니다
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                첫 번째 레시피를 등록하고<br />
                당신만의 요리 여행을 시작해보세요!
              </p>
              
              <button
                onClick={() => onNavigate('create')}
                className="px-8 py-4 btn-primary text-white rounded-xl font-semibold flex items-center gap-2 mx-auto hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                첫 레시피 등록하기
              </button>
            </div>
          </div>
        )}

        {/* 통계 정보 */}
        {myRecipes.length > 0 && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200">
              <ChefHat className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <p className="text-2xl font-bold text-gray-800">{myRecipes.length}</p>
              <p className="text-gray-600 text-sm">등록한 레시피</p>
            </div>
            <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <p className="text-2xl font-bold text-gray-800">
                {myRecipes.reduce((sum, r) => sum + (r.likeCount || 0), 0)}
              </p>
              <p className="text-gray-600 text-sm">받은 좋아요</p>
            </div>
            <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200">
              <Eye className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <p className="text-2xl font-bold text-gray-800">
                {myRecipes.reduce((sum, r) => sum + (r.viewCount || 0), 0)}
              </p>
              <p className="text-gray-600 text-sm">총 조회수</p>
            </div>
            <div className="glass-morphism rounded-2xl p-6 text-center border border-gray-200">
              <Clock className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(myRecipes.reduce((sum, r) => sum + (r.cookingTime || 0), 0) / myRecipes.length)}
              </p>
              <p className="text-gray-600 text-sm">평균 조리시간(분)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipesPage;
