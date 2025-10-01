/**
 * API 클라이언트
 * 모든 HTTP 요청을 처리하는 공통 fetch 클라이언트입니다.
 */

import { API_CONFIG, HTTP_STATUS } from './config';

/**
 * 로컬 스토리지 토큰 관리
 */
export const tokenManager = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),
  isAuthenticated: () => !!localStorage.getItem('token'),
};

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * 응답 처리 헬퍼
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  // 성공 응답
  if (response.ok) {
    // No Content 응답
    if (response.status === HTTP_STATUS.NO_CONTENT) {
      return null;
    }
    
    // JSON 응답
    if (isJson) {
      return await response.json();
    }
    
    // 텍스트 응답
    return await response.text();
  }
  
  // 에러 응답 처리
  let errorData;
  try {
    errorData = isJson ? await response.json() : await response.text();
  } catch (e) {
    errorData = '알 수 없는 오류가 발생했습니다.';
  }
  
  const errorMessage = typeof errorData === 'object' 
    ? (errorData.error || errorData.message || '요청 실패')
    : errorData;
  
  throw new ApiError(errorMessage, response.status, errorData);
};

/**
 * 요청 헤더 생성
 */
const buildHeaders = (customHeaders = {}) => {
  const headers = { ...API_CONFIG.DEFAULT_HEADERS };
  
  // 인증 토큰 추가
  const token = tokenManager.getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  // 커스텀 헤더 병합 (Content-Type이 명시적으로 null이면 제거)
  Object.keys(customHeaders).forEach(key => {
    if (customHeaders[key] === null) {
      delete headers[key];
    } else {
      headers[key] = customHeaders[key];
    }
  });
  
  return headers;
};

/**
 * URL 파라미터 빌더
 */
export const buildQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }
  
  const searchParams = new URLSearchParams();
  
  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, value);
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * 공통 API 요청 함수
 * 
 * @param {string} endpoint - API 엔드포인트 (예: '/recipes')
 * @param {Object} options - fetch 옵션
 * @param {string} options.method - HTTP 메서드 (GET, POST, PUT, DELETE 등)
 * @param {Object} options.headers - 추가 헤더
 * @param {Object|FormData} options.body - 요청 바디
 * @param {Object} options.params - URL 쿼리 파라미터
 * @returns {Promise} 응답 데이터
 */
export const apiClient = async (endpoint, options = {}) => {
  const {
    method = 'GET',
    headers: customHeaders = {},
    body,
    params,
    timeout = API_CONFIG.TIMEOUT,
    ...restOptions
  } = options;
  
  // URL 생성
  const queryString = buildQueryString(params);
  const url = `${API_CONFIG.BASE_URL}${endpoint}${queryString}`;
  
  // 요청 헤더 구성
  const headers = buildHeaders(customHeaders);
  
  // 요청 바디 처리
  let processedBody;
  if (body instanceof FormData) {
    // FormData는 그대로 전송 (Content-Type 자동 설정)
    processedBody = body;
    delete headers['Content-Type']; // 브라우저가 자동으로 설정하도록
  } else if (body) {
    processedBody = JSON.stringify(body);
  }
  
  // fetch 옵션 구성
  const fetchOptions = {
    method,
    headers,
    body: processedBody,
    ...API_CONFIG.CORS_CONFIG,
    ...restOptions,
  };
  
  // 타임아웃 설정
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  fetchOptions.signal = controller.signal;
  
  try {
    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);
    return await handleResponse(response);
  } catch (error) {
    clearTimeout(timeoutId);
    
    // 네트워크 에러 또는 타임아웃
    if (error.name === 'AbortError') {
      throw new ApiError('요청 시간이 초과되었습니다.', 0, null);
    }
    
    // API 에러는 그대로 전파
    if (error instanceof ApiError) {
      throw error;
    }
    
    // 기타 네트워크 에러
    throw new ApiError('네트워크 오류가 발생했습니다.', 0, error);
  }
};

/**
 * HTTP 메서드별 헬퍼 함수
 */
export const get = (endpoint, options = {}) => {
  return apiClient(endpoint, { ...options, method: 'GET' });
};

export const post = (endpoint, body, options = {}) => {
  return apiClient(endpoint, { ...options, method: 'POST', body });
};

export const put = (endpoint, body, options = {}) => {
  return apiClient(endpoint, { ...options, method: 'PUT', body });
};

export const patch = (endpoint, body, options = {}) => {
  return apiClient(endpoint, { ...options, method: 'PATCH', body });
};

export const del = (endpoint, options = {}) => {
  return apiClient(endpoint, { ...options, method: 'DELETE' });
};

/**
 * 파일 업로드 헬퍼
 */
export const uploadFile = (endpoint, file, additionalData = {}) => {
  const formData = new FormData();
  formData.append('file', file);
  
  // 추가 데이터가 있으면 FormData에 추가
  Object.keys(additionalData).forEach(key => {
    formData.append(key, additionalData[key]);
  });
  
  return post(endpoint, formData);
};
