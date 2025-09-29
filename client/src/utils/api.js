// API 기본 설정
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// API 헬퍼 함수
export const apiRequest = async (endpoint, options = {}) => {
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
    credentials: 'include', // 쿠키 포함
    mode: 'cors', // CORS 모드 명시
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '요청 실패' }));
    throw new Error(error.error || error.message || '요청 실패');
  }
  
  return response.json();
};

// 토큰 관리
export const tokenManager = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),
  isAuthenticated: () => !!localStorage.getItem('token')
};

// 날짜 포맷터
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 시간 포맷터
export const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes}분`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}시간 ${remainingMinutes}분` : `${hours}시간`;
};

// 카테고리 목록
export const CATEGORIES = ['전체', '한식', '중식', '일식', '양식', '디저트', '음료'];

// 난이도 목록
export const DIFFICULTIES = ['초급', '중급', '고급'];

// 기본 레시피 이미지
export const DEFAULT_RECIPE_IMAGE = '/images/default-recipe.jpg';

// 로딩 지연 함수
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
