/**
 * 애플리케이션 상수 관리
 */

/**
 * 카테고리 목록
 */
export const CATEGORIES = ['전체', '한식', '중식', '일식', '양식', '디저트', '음료'];

/**
 * 난이도 목록
 */
export const DIFFICULTIES = ['초급', '중급', '고급'];

/**
 * 기본 레시피 이미지
 */
export const DEFAULT_RECIPE_IMAGE = '/images/default-recipe.jpg';

/**
 * 페이지 크기 옵션
 */
export const PAGE_SIZES = {
  SMALL: 6,
  MEDIUM: 12,
  LARGE: 24,
  XLARGE: 48,
};

/**
 * 정렬 옵션
 */
export const SORT_OPTIONS = {
  RECENT: 'recent',
  POPULAR: 'popular',
  LIKES: 'likes',
  VIEWS: 'views',
};

/**
 * 파일 업로드 제한
 */
export const FILE_LIMITS = {
  MAX_SIZE_MB: 5,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
};

/**
 * 유효성 검사 규칙
 */
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 50,
    PATTERN: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
  },
  NICKNAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  RECIPE_TITLE: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  RECIPE_DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
  },
};

/**
 * 로컬 스토리지 키
 */
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  LANGUAGE: 'app_language',
  THEME: 'app_theme',
};

/**
 * 날짜 포맷
 */
export const DATE_FORMATS = {
  FULL: 'YYYY-MM-DD HH:mm:ss',
  DATE_ONLY: 'YYYY-MM-DD',
  TIME_ONLY: 'HH:mm',
  DISPLAY: 'YYYY년 MM월 DD일',
};
