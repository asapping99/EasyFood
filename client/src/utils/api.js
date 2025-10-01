/**
 * API 유틸리티 (Deprecated)
 * 
 * 이 파일은 하위 호환성을 위해 유지됩니다.
 * 새로운 코드는 다음을 사용하세요:
 * - API 호출: import { ... } from '../api'
 * - 상수: import { ... } from './constants'
 * - 다국어: import { t } from './i18n'
 */

// 새로운 API 클라이언트 re-export
export { 
  apiClient as apiRequest,
  tokenManager,
  ApiError,
} from '../api/client';

export { API_CONFIG, API_ENDPOINTS } from '../api/config';

// 상수 re-export
export { 
  CATEGORIES, 
  DIFFICULTIES, 
  DEFAULT_RECIPE_IMAGE 
} from './constants';

// API 기본 URL (하위 호환성)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8085/api';

/**
 * 날짜 포맷터
 * @deprecated 향후 date-fns 또는 dayjs 라이브러리 사용 권장
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * 시간 포맷터
 */
export const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes}분`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}시간 ${remainingMinutes}분` : `${hours}시간`;
};

/**
 * 로딩 지연 함수
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
