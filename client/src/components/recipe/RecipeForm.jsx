import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, Upload, Clock, Users, BarChart, Tag, ChefHat, Save, Eye } from 'lucide-react';
import { apiRequest, CATEGORIES, DIFFICULTIES } from '../../utils/api';

const RecipeForm = ({ setCurrentPage, recipeId = null, user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '한식',
    cookingTime: 30,
    servings: 2,
    difficulty: '중급',
    imageUrl: '',
    ingredients: [''],
    steps: [''],
    tags: []
  });
  
  const [loading, setLoading] = useState(false);
  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentTag, setCurrentTag] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  // 수정 모드일 때 기존 레시피 데이터 로드
  useEffect(() => {
    if (recipeId) {
      loadRecipeData();
    }
  }, [recipeId]);

  const loadRecipeData = async () => {
    setLoadingRecipe(true);
    try {
      const recipe = await apiRequest(`/recipes/${recipeId}`);
      setFormData({
        title: recipe.title || '',
        description: recipe.description || '',
        category: recipe.category || '한식',
        cookingTime: recipe.cookingTime || 30,
        servings: recipe.servings || 2,
        difficulty: recipe.difficulty || '중급',
        imageUrl: recipe.imageUrl || '',
        ingredients: recipe.ingredients && recipe.ingredients.length > 0 ? recipe.ingredients : [''],
        steps: recipe.steps && recipe.steps.length > 0 ? recipe.steps : [''],
        tags: recipe.tags || []
      });
    } catch (error) {
      alert('레시피 데이터를 불러오는데 실패했습니다: ' + error.message);
      setCurrentPage('home');
    } finally {
      setLoadingRecipe(false);
    }
  };

  // 폼 유효성 검사
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '레시피 제목을 입력해주세요.';
    }
    
    if (formData.ingredients.filter(ing => ing.trim()).length === 0) {
      newErrors.ingredients = '최소 1개 이상의 재료를 입력해주세요.';
    }
    
    if (formData.steps.filter(step => step.trim()).length === 0) {
      newErrors.steps = '최소 1개 이상의 조리 단계를 입력해주세요.';
    }
    
    if (formData.cookingTime < 1 || formData.cookingTime > 1440) {
      newErrors.cookingTime = '조리 시간은 1분에서 1440분 사이여야 합니다.';
    }
    
    if (formData.servings < 1 || formData.servings > 20) {
      newErrors.servings = '인분은 1인분에서 20인분 사이여야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const cleanedData = {
        ...formData,
        ingredients: formData.ingredients.filter(i => i.trim()),
        steps: formData.steps.filter(s => s.trim()),
        tags: formData.tags.filter(t => t.trim())
      };

      const endpoint = recipeId ? `/recipes/${recipeId}` : '/recipes';
      const method = recipeId ? 'PUT' : 'POST';

      await apiRequest(endpoint, {
        method,
        body: JSON.stringify(cleanedData)
      });

      alert(recipeId ? '레시피가 수정되었습니다!' : '레시피가 등록되었습니다!');
      setCurrentPage('home');
    } catch (error) {
      alert('저장 실패: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 재료 관리
  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      setFormData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index)
      }));
    }
  };

  // 조리 단계 관리
  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, '']
    }));
  };

  const updateStep = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const removeStep = (index) => {
    if (formData.steps.length > 1) {
      setFormData(prev => ({
        ...prev,
        steps: prev.steps.filter((_, i) => i !== index)
      }));
    }
  };

  // 태그 관리
  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // 미리보기 모드
  const PreviewComponent = () => (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
            {formData.category}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            {formData.difficulty}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.title || '레시피 제목'}</h1>
        <p className="text-gray-600">{formData.description || '레시피 설명'}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">조리시간</p>
          <p className="font-bold">{formData.cookingTime}분</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">인분</p>
          <p className="font-bold">{formData.servings}인분</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <BarChart className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">난이도</p>
          <p className="font-bold">{formData.difficulty}</p>
        </div>
      </div>

      {formData.ingredients.filter(ing => ing.trim()).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">재료</h2>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-2">
              {formData.ingredients.filter(ing => ing.trim()).map((ingredient, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  {ingredient}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {formData.steps.filter(step => step.trim()).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">조리 순서</h2>
          <div className="space-y-3">
            {formData.steps.filter(step => step.trim()).map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.tags.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3">태그</h3>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen gradient-bg">
      {loadingRecipe ? (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">레시피 데이터를 불러오고 있어요...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            홈으로 돌아가기
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                previewMode 
                  ? 'bg-gray-200 text-gray-700' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              {previewMode ? '편집 모드' : '미리보기'}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {previewMode ? (
            <PreviewComponent />
          ) : (
            <div className="glass-morphism rounded-3xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-8">
                <ChefHat className="w-8 h-8 text-orange-500" />
                <h1 className="text-3xl font-bold text-gray-800">
                  {recipeId ? '레시피 수정' : '새 레시피 등록'}
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 기본 정보 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* 레시피 제목 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        레시피 제목 *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                          errors.title ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="예: 김치찌개"
                        required
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                      )}
                    </div>

                    {/* 설명 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        레시피 설명
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        rows="4"
                        placeholder="이 레시피에 대한 간단한 설명을 적어주세요"
                      />
                    </div>

                    {/* 이미지 URL */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        이미지 URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                          placeholder="https://example.com/image.jpg"
                        />
                        <button
                          type="button"
                          className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                          <Upload className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                      {formData.imageUrl && (
                        <div className="mt-3">
                          <img 
                            src={formData.imageUrl} 
                            alt="미리보기" 
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* 카테고리 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        카테고리 *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        required
                      >
                        {CATEGORIES.filter(cat => cat !== '전체').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* 난이도 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        난이도 *
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        required
                      >
                        {DIFFICULTIES.map(diff => (
                          <option key={diff} value={diff}>{diff}</option>
                        ))}
                      </select>
                    </div>

                    {/* 조리시간과 인분 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          조리시간 (분) *
                        </label>
                        <input
                          type="number"
                          value={formData.cookingTime}
                          onChange={(e) => setFormData({...formData, cookingTime: parseInt(e.target.value) || 0})}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                            errors.cookingTime ? 'border-red-300' : 'border-gray-200'
                          }`}
                          min="1"
                          max="1440"
                          required
                        />
                        {errors.cookingTime && (
                          <p className="text-red-500 text-sm mt-1">{errors.cookingTime}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          인분 *
                        </label>
                        <input
                          type="number"
                          value={formData.servings}
                          onChange={(e) => setFormData({...formData, servings: parseInt(e.target.value) || 0})}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                            errors.servings ? 'border-red-300' : 'border-gray-200'
                          }`}
                          min="1"
                          max="20"
                          required
                        />
                        {errors.servings && (
                          <p className="text-red-500 text-sm mt-1">{errors.servings}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 재료 */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-semibold text-gray-700">재료 *</label>
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      재료 추가
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => updateIngredient(index, e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                          placeholder="예: 돼지고기 300g"
                        />
                        {formData.ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="px-3 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {errors.ingredients && (
                    <p className="text-red-500 text-sm mt-2">{errors.ingredients}</p>
                  )}
                </div>

                {/* 조리 순서 */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-semibold text-gray-700">조리 순서 *</label>
                    <button
                      type="button"
                      onClick={addStep}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      단계 추가
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.steps.map((step, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <textarea
                          value={step}
                          onChange={(e) => updateStep(index, e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                          rows="2"
                          placeholder="조리 과정을 자세히 설명해주세요"
                        />
                        {formData.steps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeStep(index)}
                            className="px-3 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {errors.steps && (
                    <p className="text-red-500 text-sm mt-2">{errors.steps}</p>
                  )}
                </div>

                {/* 태그 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    태그 (선택사항)
                  </label>
                  
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      placeholder="태그를 입력하고 엔터 또는 추가 버튼을 눌러주세요"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      disabled={!currentTag.trim()}
                      className="px-4 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Tag className="w-4 h-4" />
                      추가
                    </button>
                  </div>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 제출 버튼 */}
                <div className="flex gap-4 justify-center pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentPage('home')}
                    className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 btn-primary text-white rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        저장 중...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {recipeId ? '수정하기' : '등록하기'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  );
};

export default RecipeForm;
