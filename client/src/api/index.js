/**
 * API 모듈 진입점
 * 모든 API 서비스를 export합니다.
 */

// 개별 서비스 함수 import (맨 위로 이동)
import * as authService from './services/authService';
import * as recipeService from './services/recipeService';
import * as userService from './services/userService';

// API 클라이언트 및 설정
export { 
  apiClient, 
  tokenManager, 
  ApiError,
  get,
  post,
  put,
  patch,
  del,
  uploadFile,
  buildQueryString,
} from './client';

export { 
  API_CONFIG, 
  API_ENDPOINTS, 
  HTTP_METHODS, 
  HTTP_STATUS 
} from './config';

// 서비스 모듈 (namespace export)
export { authService, recipeService, userService };

// 인증 관련
export const {
  login,
  register,
  logout,
  refreshToken,
  getProfile,
  isAuthenticated,
} = authService;

// 레시피 관련
export const {
  getRecipes,
  getRecipeById,
  getMyRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  likeRecipe,
  unlikeRecipe,
  incrementRecipeView,
  getRecipeStats,
} = recipeService;

// 사용자 관련
export const {
  getUserProfile,
  updateUserProfile,
  changePassword,
} = userService;
