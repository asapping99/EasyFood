/**
 * 이미지 URL 유틸리티
 * 상대 경로를 전체 URL로 변환
 */

/**
 * 이미지 URL을 전체 경로로 변환
 * 
 * @param {string} imageUrl - 이미지 URL (상대 경로 또는 전체 URL)
 * @returns {string} 전체 이미지 URL
 * 
 * @example
 * getImageUrl('/uploads/2025/1002/uuid.jpg')
 * // => 'http://localhost:8085/uploads/2025/1002/uuid.jpg'
 * 
 * getImageUrl('http://localhost:8085/uploads/2025/1002/uuid.jpg')
 * // => 'http://localhost:8085/uploads/2025/1002/uuid.jpg' (그대로)
 * 
 * getImageUrl('')
 * // => '' (빈 문자열)
 */
export const getImageUrl = (imageUrl) => {
  // 빈 문자열이나 null/undefined인 경우
  if (!imageUrl) {
    return '';
  }

  // 이미 전체 URL인 경우 (http:// 또는 https://로 시작)
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // 상대 경로인 경우 IMAGE_BASE_URL 붙이기
  const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || 'http://localhost:8085';
  
  // 슬래시 처리: baseUrl 끝에 /가 있거나 imageUrl 시작에 /가 없으면 추가
  const normalizedUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  
  return `${baseUrl}${normalizedUrl}`;
};

/**
 * 플레이스홀더 이미지 URL
 */
export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300?text=No+Image';

/**
 * 이미지 로드 에러 처리 핸들러
 * 
 * @param {Event} event - 이미지 로드 에러 이벤트
 * 
 * @example
 * <img src={imageUrl} onError={handleImageError} />
 */
export const handleImageError = (event) => {
  event.target.src = PLACEHOLDER_IMAGE;
  event.target.onerror = null; // 무한 루프 방지
};

/**
 * 이미지 URL이 유효한지 확인
 * 
 * @param {string} imageUrl - 확인할 이미지 URL
 * @returns {boolean} 유효 여부
 */
export const isValidImageUrl = (imageUrl) => {
  if (!imageUrl) return false;
  
  // URL 패턴 확인
  const urlPattern = /^(https?:\/\/|\/)/;
  return urlPattern.test(imageUrl);
};

/**
 * 여러 이미지 URL을 한 번에 변환
 * 
 * @param {Array} items - 이미지 URL이 포함된 객체 배열
 * @param {string} urlKey - 이미지 URL 속성 키 (기본: 'imageUrl')
 * @returns {Array} 변환된 객체 배열
 * 
 * @example
 * const recipes = [
 *   { id: 1, imageUrl: '/uploads/1.jpg' },
 *   { id: 2, imageUrl: '/uploads/2.jpg' }
 * ];
 * const normalized = normalizeImageUrls(recipes);
 */
export const normalizeImageUrls = (items, urlKey = 'imageUrl') => {
  if (!Array.isArray(items)) return items;
  
  return items.map(item => ({
    ...item,
    [urlKey]: getImageUrl(item[urlKey])
  }));
};
