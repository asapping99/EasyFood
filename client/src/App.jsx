import React, { useState, useEffect } from 'react';
import { ChefHat, Search, Plus, User, Moon, Sun, Home, BookOpen, Heart, LogOut, Menu, X, Clock, Users, BarChart, Edit, Trash2, Eye } from 'lucide-react';

// API 기본 설정
const API_BASE_URL = 'http://localhost:8080/api';

// API 헬퍼 함수
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || '요청 실패');
  }
  
  return response.json();
};

// 로그인 컴포넌트
const LoginPage = ({ setUser, setCurrentPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    nickname: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const data = isLogin 
        ? { username: formData.username, password: formData.password }
        : formData;
      
      const response = await apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setCurrentPage('home');
      }
    } catch (err) {
      setError(err.message || '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="flex items-center justify-center mb-8">
            <ChefHat className="w-12 h-12 text-orange-500 mr-3" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              K-Recipe
            </h1>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isLogin ? '로그인' : '회원가입'}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="사용자명"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                required
                disabled={loading}
              />
            </div>
            
            {!isLogin && (
              <>
                <div>
                  <input
                    type="email"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="닉네임"
                    value={formData.nickname}
                    onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    required
                    disabled={loading}
                  />
                </div>
              </>
            )}
            
            <div>
              <input
                type="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                required
                disabled={loading}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '처리중...' : (isLogin ? '로그인' : '회원가입')}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-600 hover:text-orange-500 transition-colors"
              disabled={loading}
            >
              {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 레시피 카드 컴포넌트
const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
    >
      <div className="h-48 bg-gradient-to-br from-orange-200 to-red-200 relative">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ChefHat className="w-16 h-16 text-white/50" />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-semibold text-orange-600">
          {recipe.category || '기타'}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{recipe.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              {recipe.cookingTime}분
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <Users className="w-4 h-4" />
              {recipe.servings}인분
            </span>
          </div>
          <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
};

// 레시피 상세 보기 컴포넌트
const RecipeDetail = ({ recipeId, setCurrentPage, user }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      alert('로그인이 필요합니다.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return <div className="text-center py-8">레시피를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 text-gray-600 hover:text-orange-500 flex items-center gap-2"
      >
        ← 목록으로
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h1>
          <p className="text-gray-600">{recipe.description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-orange-50 rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">조리시간</p>
            <p className="font-bold">{recipe.cookingTime}분</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">인분</p>
            <p className="font-bold">{recipe.servings}인분</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <BarChart className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">난이도</p>
            <p className="font-bold">{recipe.difficulty}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <BookOpen className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">카테고리</p>
            <p className="font-bold">{recipe.category}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">재료</h2>
          <div className="bg-gray-50 rounded-xl p-4">
            <ul className="grid grid-cols-2 gap-2">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">조리 순서</h2>
          <div className="space-y-3">
            {recipe.steps?.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleLike}
            className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <Heart className="w-5 h-5" />
            좋아요 ({recipe.likeCount || 0})
          </button>
          
          {user && user.id === recipe.author?.id && (
            <>
              <button
                onClick={() => setCurrentPage('edit')}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Edit className="w-5 h-5" />
                수정
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// 레시피 작성/수정 폼 컴포넌트
const RecipeForm = ({ setCurrentPage, recipeId = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '한식',
    cookingTime: 30,
    servings: 2,
    difficulty: '중급',
    ingredients: [''],
    steps: [''],
    tags: []
  });
  const [loading, setLoading] = useState(false);

  const categories = ['한식', '중식', '일식', '양식', '디저트', '음료'];
  const difficulties = ['초급', '중급', '고급'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanedData = {
        ...formData,
        ingredients: formData.ingredients.filter(i => i.trim()),
        steps: formData.steps.filter(s => s.trim())
      };

      const endpoint = recipeId ? `/recipes/${recipeId}` : '/recipes';
      const method = recipeId ? 'PUT' : 'POST';

      await apiRequest(endpoint, {
        method,
        body: JSON.stringify(cleanedData)
      });

      alert(recipeId ? '레시피가 수정되었습니다.' : '레시피가 등록되었습니다.');
      setCurrentPage('home');
    } catch (error) {
      alert('저장 실패: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

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
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

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
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {recipeId ? '레시피 수정' : '새 레시피 등록'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">레시피 이름</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">설명</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">카테고리</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">조리시간(분)</label>
              <input
                type="number"
                value={formData.cookingTime}
                onChange={(e) => setFormData({...formData, cookingTime: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">인분</label>
              <input
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData({...formData, servings: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">난이도</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">재료</label>
            <div className="space-y-2">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="예: 돼지고기 300g"
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                + 재료 추가
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">조리 순서</label>
            <div className="space-y-2">
              {formData.steps.map((step, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mt-3">
                    {index + 1}
                  </div>
                  <textarea
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows="2"
                    placeholder="조리 과정을 설명해주세요"
                  />
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addStep}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                + 단계 추가
              </button>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? '저장 중...' : (recipeId ? '수정하기' : '등록하기')}
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 메인 앱 컴포넌트
const App = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '한식', '중식', '일식', '양식', '디저트', '음료'];

  useEffect(() => {
    checkAuth();
    fetchRecipes();
  }, [selectedCategory]);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await apiRequest('/auth/me');
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  };

  const fetchRecipes = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== '전체') {
        params.append('category', selectedCategory);
      }
      
      const response = await fetch(`${API_BASE_URL}/recipes?${params}`);
      const data = await response.json();
      setRecipes(data.content || []);
    } catch (error) {
      console.error('레시피 로드 실패:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCurrentPage('home');
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipeId(recipe.id);
    setCurrentPage('detail');
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user && currentPage !== 'home') {
    return <LoginPage setUser={setUser} setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
      {/* 네비게이션 바 */}
      <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white/80'} backdrop-blur-lg shadow-lg`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <ChefHat className="w-8 h-8 text-orange-500" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  K-Recipe
                </h1>
              </button>
              
              <div className="hidden md:flex items-center gap-6">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      selectedCategory === cat 
                        ? 'bg-orange-500 text-white' 
                        : 'hover:bg-orange-100 text-gray-700'
                    }`