/**
 * 사용자 서비스
 * 사용자 프로필 관련 API를 관리합니다.
 */

import { get, put, post } from '../client';
import { API_ENDPOINTS } from '../config';

/**
 * 사용자 프로필 조회
 * @param {number} id - 사용자 ID
 * @returns {Promise<Object>} 사용자 정보
 */
export const getUserProfile = async (id) => {
  return await get(API_ENDPOINTS.USERS.PROFILE(id));
};

/**
 * 사용자 프로필 수정
 * @param {number} id - 사용자 ID
 * @param {Object} profileData - 수정할 프로필 데이터
 * @returns {Promise<Object>} 수정된 사용자 정보
 */
export const updateUserProfile = async (id, profileData) => {
  return await put(API_ENDPOINTS.USERS.UPDATE_PROFILE(id), profileData);
};

/**
 * 비밀번호 변경
 * @param {Object} passwordData - 비밀번호 변경 데이터
 * @param {string} passwordData.currentPassword - 현재 비밀번호
 * @param {string} passwordData.newPassword - 새 비밀번호
 * @returns {Promise<Object>} 변경 결과
 */
export const changePassword = async (passwordData) => {
  return await post(API_ENDPOINTS.USERS.CHANGE_PASSWORD, passwordData);
};
