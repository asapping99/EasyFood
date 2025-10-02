/**
 * 파일 업로드 API 서비스
 */

import { post, del } from '../client';

/**
 * 이미지 파일 업로드
 * 
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<Object>} 업로드 결과 (fileUrl 포함)
 */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  // Content-Type을 null로 설정하여 브라우저가 자동으로 multipart/form-data로 설정하도록 함
  return await post('/files/upload/image', formData, {
    headers: {
      'Content-Type': null
    }
  });
};

/**
 * 파일 삭제
 * 
 * @param {string} fileUrl - 삭제할 파일의 URL
 * @returns {Promise<Object>} 삭제 결과
 */
export const deleteFile = async (fileUrl) => {
  return await del('/files/delete', {
    params: { fileUrl }
  });
};

/**
 * 이미지 파일 유효성 검사
 * 
 * @param {File} file - 검사할 파일
 * @param {number} maxSizeMB - 최대 파일 크기 (MB)
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateImageFile = (file, maxSizeMB = 10) => {
  // 파일 존재 확인
  if (!file) {
    return { valid: false, error: '파일을 선택해주세요.' };
  }

  // 파일 타입 확인
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: '이미지 파일만 업로드 가능합니다. (jpg, png, gif, webp)' };
  }

  // 파일 크기 확인
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { valid: false, error: `파일 크기는 ${maxSizeMB}MB 이하여야 합니다.` };
  }

  return { valid: true, error: null };
};

/**
 * 이미지 파일을 Base64로 변환 (미리보기용)
 * 
 * @param {File} file - 변환할 이미지 파일
 * @returns {Promise<string>} Base64 데이터 URL
 */
export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
