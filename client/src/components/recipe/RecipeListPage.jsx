import React, { useState, useEffect } from 'react';
import { Search, X, Sliders } from 'lucide-react';
import { CATEGORIES, DIFFICULTIES } from '../../utils/api';

const RecipeListPage = ({ 
  onRecipeClick, 
  onNavigate, 
  user 
}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedDifficulty, setSelectedDifficulty] = useState('전체');
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory, selectedDifficulty, sortBy, page]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      if (selectedCategory && selectedCategory !== '전체') {
        params.append('category', selectedCategory);
      }
      if (selectedDifficulty && selectedDifficulty !== '전체') {
        params.append('difficulty', selectedDifficulty);
      }
      if (sortBy && sortBy !== 'recent') {
        params.append('sortBy', sortBy);
      }
      params.append('page', page);
      params.append('size', 12);
      
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8080/api'}/recipes?${params}`);
      if (response.ok) {
        const data = await response.json();
        setRecipes(data.content || []);
        setTotalPages(data.totalPages || 0);
      }
    } catch (error) {
      console.error('레시피 로드 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchRecipes();
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('전체');
    setSelectedDifficulty('전체');
    setSortBy('recent');
    setPage(0);
  };

  return (
    <div className="min-h-screen gradient-bg py-8">
      <div className="container mx-auto px-4">
        {/* 검색 및 필터 헤더 */}
        <div className="mb-8">
          <div className="glass-morphism rounded-2xl p-6 border border-gray-200">
            {/* 검색창 */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="레시피, 재료, 태그로 검색..."
                  className="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* 필터 토글 버튼 */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Sliders className="w-4 h-4" />
                <span>필터 {showFilters ? '숨기기' : '보기'}</span>
              </button>
              
              {(selectedCategory !== '전체' || selectedDifficulty !== '전체' || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="text-orange-600 hover:text-orange-700 font-semibold"
                >
                  필터 초기화
                </button>
              )}
            </div>

            {/* 필터 옵션 */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                {/* 카테고리 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    카테고리
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['전체', ...CATEGORIES.filter(c => c !== '전체')].map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setPage(0);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-orange-500 text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 난이도 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    난이도
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['전체', ...DIFFICULTIES].map(difficulty => (
                      <button
                        key={difficulty}
                        onClick={() => {
                          setSelectedDifficulty(difficulty);
                          setPage(0);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedDifficulty === difficulty
                            ? 'bg-orange-500 text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300'
                        }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 정렬 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    정렬
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSortBy('recent')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        sortBy === 'recent'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      최신순
                    </button>
                    <button
                      onClick={() => setSortBy('popular')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        sortBy === 'popular'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      인기순
                    </button>
                    <button
                      onClick={() => setSortBy('likes')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        sortBy === 'likes'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      좋아요순
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 검색 결과 정보 */}
        <div className="mb-6">
          <p className="text-gray-600">
            {searchTerm && `"${searchTerm}" 검색 결과 - `}
            총 <span className="font-semibold text-orange-600">{recipes.length}</span>개의 레시피
          </p>
        </div>

        {/* 레시피 목록 */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">레시피를 불러오고 있어요...</p>
            </div>
          </div>
        ) : recipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => onRecipeClick(recipe)}
                  className="glass-morphism rounded-2xl overflow-hidden border border-gray-200 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.imageUrl || '/images/default-recipe.jpg'}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold">
                      {recipe.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {recipe.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>⏱️ {recipe.cookingTime}분</span>
                      <span>👁️ {recipe.viewCount || 0}</span>
                      <span>❤️ {recipe.likeCount || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  이전
                </button>
                
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPage(idx)}
                    className={`px-4 py-2 rounded-lg ${
                      page === idx
                        ? 'bg-orange-500 text-white'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page === totalPages - 1}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  다음
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="glass-morphism rounded-3xl p-12 max-w-md mx-auto border border-gray-200">
              <p className="text-xl font-bold text-gray-500 mb-2">레시피가 없습니다</p>
              <p className="text-gray-400 mb-6">
                검색 조건을 변경하거나 다른 키워드로 시도해보세요
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeListPage;
