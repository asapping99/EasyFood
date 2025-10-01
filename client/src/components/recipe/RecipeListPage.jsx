/**
 * RecipeListPage - react-i18next 적용
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X, Sliders } from 'lucide-react';
import { getRecipes } from '../../api';
import { CATEGORIES, DIFFICULTIES } from '../../utils/constants';

const RecipeListPage = ({ 
  onRecipeClick, 
  onNavigate, 
  user 
}) => {
  const { t } = useTranslation(['recipe', 'common']);
  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t('common:category.all'));
  const [selectedDifficulty, setSelectedDifficulty] = useState(t('common:difficulty.all'));
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

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

  useEffect(() => {
    setRecipes([]);
    setPage(0);
    setHasMore(true);
  }, [selectedCategory, selectedDifficulty, sortBy, searchTerm]);

  useEffect(() => {
    fetchRecipes();
  }, [page, selectedCategory, selectedDifficulty, sortBy]);

  const fetchRecipes = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const options = {
        page,
        size: 12,
      };
      
      if (searchTerm && searchTerm.trim()) {
        options.search = searchTerm.trim();
      }
      if (selectedCategory && selectedCategory !== t('common:category.all')) {
        options.category = selectedCategory;
      }
      if (selectedDifficulty && selectedDifficulty !== t('common:difficulty.all')) {
        options.difficulty = selectedDifficulty;
      }
      if (sortBy && sortBy !== 'recent') {
        options.sortBy = sortBy;
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

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    setRecipes([]);
    setHasMore(true);
    fetchRecipes();
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(t('common:category.all'));
    setSelectedDifficulty(t('common:difficulty.all'));
    setSortBy('recent');
    setPage(0);
    setRecipes([]);
    setHasMore(true);
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
                  placeholder={t('recipe.searchPlaceholder')}
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
                <span>{showFilters ? t('recipe.hideFilters') : t('recipe.showFilters')}</span>
              </button>
              
              {(selectedCategory !== t('common:category.all') || selectedDifficulty !== t('common:difficulty.all') || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="text-orange-600 hover:text-orange-700 font-semibold"
                >
                  {t('recipe.resetFilters')}
                </button>
              )}
            </div>

            {/* 필터 옵션 */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                {/* 카테고리 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.category')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[t('common:category.all'), ...CATEGORIES.filter(c => c !== '전체')].map(category => (
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
                    {t('form.difficulty')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[t('common:difficulty.all'), ...DIFFICULTIES].map(difficulty => (
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
                    {t('common:filter')}
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
                      {t('common:sort.recent')}
                    </button>
                    <button
                      onClick={() => setSortBy('popular')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        sortBy === 'popular'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      {t('common:sort.popular')}
                    </button>
                    <button
                      onClick={() => setSortBy('likes')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        sortBy === 'likes'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      {t('common:sort.likes')}
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
            {searchTerm && `"${searchTerm}" ${t('recipe.searchResults')} - `}
            {t('recipe.recipeCount', { count: recipes.length })}
            {hasMore && <span className="text-gray-400 ml-1">{t('recipe.moreRecipesAvailable')}</span>}
          </p>
        </div>

        {/* 레시피 목록 */}
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
                const isLastElement = recipes.length === index + 1;
                return (
                  <div
                    key={recipe.id}
                    ref={isLastElement ? lastRecipeElementRef : null}
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
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span>⏱️ {recipe.cookingTime}{t('common:unit.minute')}</span>
                        <span>👁️ {recipe.viewCount || 0}</span>
                        <span>❤️ {recipe.likeCount || 0}</span>
                      </div>
                      {recipe.authorNickname && (
                        <div className="text-xs text-gray-400">
                          {t('detail.by')} {recipe.authorNickname || recipe.authorUsername}
                        </div>
                      )}
                    </div>
                  </div>
                );
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
              <p className="text-xl font-bold text-gray-500 mb-2">{t('recipe.noRecipes')}</p>
              <p className="text-gray-400 mb-6">
                {t('messages.changeSearchTerm')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeListPage;
