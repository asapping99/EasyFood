/**
 * API 설정 파일
 * 모든 API 관련 설정을 중앙에서 관리합니다.
 */

export const API_CONFIG = {
  // 기본 URL
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8085/api',
  
  // 타임아웃 설정 (밀리초)
  TIMEOUT: 30000,
  
  // 기본 헤더
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // CORS 설정
  CORS_CONFIG: {
    credentials: 'include',
    mode: 'cors',
  },
};

/**
 * API 엔드포인트 정의
 */
export const API_ENDPOINTS = {
  // 인증 관련
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // 레시피 관련
  RECIPES: {
    LIST: '/recipes',
    DETAIL: (id) => `/recipes/${id}`,
    CREATE: '/recipes',
    UPDATE: (id) => `/recipes/${id}`,
    DELETE: (id) => `/recipes/${id}`,
    MY_RECIPES: '/recipes/my',
    LIKE: (id) => `/recipes/${id}/like`,
    UNLIKE: (id) => `/recipes/${id}/unlike`,
    VIEW: (id) => `/recipes/${id}/view`,
  },
  
  // 사용자 관련
  USERS: {
    PROFILE: (id) => `/users/${id}`,
    UPDATE_PROFILE: (id) => `/users/${id}`,
    CHANGE_PASSWORD: '/users/password',
  },
  
  // 댓글 관련
  COMMENTS: {
    LIST: (recipeId) => `/recipes/${recipeId}/comments`,
    CREATE: (recipeId) => `/recipes/${recipeId}/comments`,
    UPDATE: (recipeId, commentId) => `/recipes/${recipeId}/comments/${commentId}`,
    DELETE: (recipeId, commentId) => `/recipes/${recipeId}/comments/${commentId}`,
  },
};

/**
 * HTTP 메서드
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

/**
 * 상태 코드
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
