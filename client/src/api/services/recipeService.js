/**
 * 레시피 서비스
 * 레시피 관련 모든 API를 관리합니다.
 */

import { get, post, put, del } from '../client';
import { API_ENDPOINTS } from '../config';

/**
 * 레시피 목록 조회
 * @param {Object} options - 검색 및 필터 옵션
 * @param {number} options.page - 페이지 번호 (기본값: 0)
 * @param {number} options.size - 페이지 크기 (기본값: 12)
 * @param {string} options.search - 검색어
 * @param {string} options.category - 카테고리 필터
 * @param {string} options.difficulty - 난이도 필터
 * @param {string} options.sortBy - 정렬 기준 (recent, popular, likes)
 * @returns {Promise<Object>} 페이징된 레시피 목록
 */
export const getRecipes = async (options = {}) => {
  const {
    page = 0,
    size = 12,
    search,
    category,
    difficulty,
    sortBy,
  } = options;
  
  const params = { page, size };
  
  if (search && search.trim()) {
    params.search = search.trim();
  }
  if (category && category !== '전체') {
    params.category = category;
  }
  if (difficulty && difficulty !== '전체') {
    params.difficulty = difficulty;
  }
  if (sortBy && sortBy !== 'recent') {
    params.sortBy = sortBy;
  }
  
  return await get(API_ENDPOINTS.RECIPES.LIST, { params });
};

/**
 * 레시피 상세 조회
 * @param {number} id - 레시피 ID
 * @returns {Promise<Object>} 레시피 상세 정보
 */
export const getRecipeById = async (id) => {
  return await get(API_ENDPOINTS.RECIPES.DETAIL(id));
};

/**
 * 내 레시피 목록 조회
 * @param {Object} options - 페이징 옵션
 * @param {number} options.page - 페이지 번호
 * @param {number} options.size - 페이지 크기
 * @returns {Promise<Object>} 내 레시피 목록
 */
export const getMyRecipes = async (options = {}) => {
  const { page = 0, size = 12 } = options;
  return await get(API_ENDPOINTS.RECIPES.MY_RECIPES, { 
    params: { page, size } 
  });
};

/**
 * 레시피 생성
 * @param {Object} recipeData - 레시피 데이터
 * @returns {Promise<Object>} 생성된 레시피
 */
export const createRecipe = async (recipeData) => {
  return await post(API_ENDPOINTS.RECIPES.CREATE, recipeData);
};

/**
 * 레시피 수정
 * @param {number} id - 레시피 ID
 * @param {Object} recipeData - 수정할 레시피 데이터
 * @returns {Promise<Object>} 수정된 레시피
 */
export const updateRecipe = async (id, recipeData) => {
  return await put(API_ENDPOINTS.RECIPES.UPDATE(id), recipeData);
};

/**
 * 레시피 삭제
 * @param {number} id - 레시피 ID
 * @returns {Promise<void>}
 */
export const deleteRecipe = async (id) => {
  return await del(API_ENDPOINTS.RECIPES.DELETE(id));
};

/**
 * 레시피 좋아요
 * @param {number} id - 레시피 ID
 * @returns {Promise<Object>} 업데이트된 좋아요 정보
 */
export const likeRecipe = async (id) => {
  return await post(API_ENDPOINTS.RECIPES.LIKE(id));
};

/**
 * 레시피 좋아요 취소
 * @param {number} id - 레시피 ID
 * @returns {Promise<Object>} 업데이트된 좋아요 정보
 */
export const unlikeRecipe = async (id) => {
  return await post(API_ENDPOINTS.RECIPES.UNLIKE(id));
};

/**
 * 레시피 조회수 증가
 * @param {number} id - 레시피 ID
 * @returns {Promise<Object>} 업데이트된 조회수 정보
 */
export const incrementRecipeView = async (id) => {
  return await post(API_ENDPOINTS.RECIPES.VIEW(id));
};

/**
 * 레시피 통계 조회 (전체 레시피 기반)
 * @returns {Promise<Object>} 레시피 통계
 */
export const getRecipeStats = async () => {
  try {
    const response = await get(API_ENDPOINTS.RECIPES.LIST, {
      params: { size: 1000 }
    });
    
    const allRecipes = response.content || [];
    
    return {
      totalRecipes: response.totalElements || allRecipes.length,
      totalLikes: allRecipes.reduce((sum, recipe) => sum + (recipe.likeCount || 0), 0),
      totalViews: allRecipes.reduce((sum, recipe) => sum + (recipe.viewCount || 0), 0),
    };
  } catch (error) {
    console.error('통계 조회 실패:', error);
    return {
      totalRecipes: 0,
      totalLikes: 0,
      totalViews: 0,
    };
  }
};
