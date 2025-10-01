/**
 * 인증 서비스
 * 로그인, 회원가입, 로그아웃 등 인증 관련 API를 관리합니다.
 */

import { post, get } from '../client';
import { API_ENDPOINTS } from '../config';
import { tokenManager } from '../client';

/**
 * 로그인
 * @param {Object} credentials - 로그인 정보
 * @param {string} credentials.username - 사용자명
 * @param {string} credentials.password - 비밀번호
 * @returns {Promise<Object>} 사용자 정보 및 토큰
 */
export const login = async (credentials) => {
  const response = await post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  
  // 토큰 저장
  if (response.token) {
    tokenManager.setToken(response.token);
  }
  
  return response;
};

/**
 * 회원가입
 * @param {Object} userData - 회원 정보
 * @param {string} userData.username - 사용자명
 * @param {string} userData.password - 비밀번호
 * @param {string} userData.email - 이메일
 * @param {string} userData.nickname - 닉네임
 * @returns {Promise<Object>} 사용자 정보 및 토큰
 */
export const register = async (userData) => {
  const response = await post(API_ENDPOINTS.AUTH.REGISTER, userData);
  
  // 토큰 저장
  if (response.token) {
    tokenManager.setToken(response.token);
  }
  
  return response;
};

/**
 * 로그아웃
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await post(API_ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    console.error('로그아웃 요청 실패:', error);
  } finally {
    // 로컬 토큰 제거
    tokenManager.removeToken();
  }
};

/**
 * 토큰 갱신
 * @returns {Promise<Object>} 새로운 토큰
 */
export const refreshToken = async () => {
  const response = await post(API_ENDPOINTS.AUTH.REFRESH);
  
  if (response.token) {
    tokenManager.setToken(response.token);
  }
  
  return response;
};

/**
 * 현재 사용자 프로필 조회
 * @returns {Promise<Object>} 사용자 정보
 */
export const getProfile = async () => {
  return await get(API_ENDPOINTS.AUTH.PROFILE);
};

/**
 * 인증 상태 확인
 * @returns {boolean} 인증 여부
 */
export const isAuthenticated = () => {
  return tokenManager.isAuthenticated();
};
