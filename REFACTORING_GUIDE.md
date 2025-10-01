# API 및 다국어 리팩토링 가이드

## 📁 새로운 프로젝트 구조

```
client/src/
├── api/                          # API 관련 모듈
│   ├── config.js                # API 설정 (BASE_URL, ENDPOINTS 등)
│   ├── client.js                # 공통 fetch 클라이언트
│   ├── services/                # 도메인별 서비스
│   │   ├── authService.js       # 인증 관련 API
│   │   ├── recipeService.js     # 레시피 관련 API
│   │   └── userService.js       # 사용자 관련 API
│   └── index.js                 # API 모듈 진입점
├── locales/                     # 다국어 리소스
│   ├── ko/                      # 한국어
│   │   ├── common.json          # 공통 텍스트
│   │   ├── auth.json            # 인증 관련
│   │   ├── recipe.json          # 레시피 관련
│   │   └── validation.json      # 유효성 검사 메시지
│   └── en/                      # 영어
│       ├── common.json
│       ├── auth.json
│       ├── recipe.json
│       └── validation.json
└── utils/
    ├── api.js                   # 기존 API (하위 호환용)
    ├── i18n.js                  # 다국어 헬퍼
    └── constants.js             # 상수 관리
```

---

## 🔧 API 사용법

### 1. 기본 API 호출

```javascript
import { get, post, put, del } from '../api';

// GET 요청
const data = await get('/recipes', { params: { page: 0, size: 12 } });

// POST 요청
const result = await post('/recipes', { title: '김치찌개', category: '한식' });

// PUT 요청
const updated = await put('/recipes/1', { title: '수정된 제목' });

// DELETE 요청
await del('/recipes/1');
```

### 2. 서비스 함수 사용 (권장)

```javascript
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from '../api';

// 레시피 목록 조회
const recipes = await getRecipes({
  page: 0,
  size: 12,
  search: '김치',
  category: '한식',
  difficulty: '초급',
  sortBy: 'recent'
});

// 레시피 생성
const newRecipe = await createRecipe({
  title: '김치찌개',
  description: '맛있는 김치찌개',
  category: '한식',
  difficulty: '초급',
  cookingTime: 30,
  ingredients: ['김치', '돼지고기', '두부'],
  steps: ['1단계', '2단계']
});

// 레시피 수정
const updated = await updateRecipe(recipeId, updatedData);

// 레시피 삭제
await deleteRecipe(recipeId);
```

### 3. 인증 관련

```javascript
import { login, register, logout, isAuthenticated } from '../api';

// 로그인
const response = await login({ username: 'user1', password: 'pass123' });
console.log(response.user); // 사용자 정보
// 토큰은 자동으로 localStorage에 저장됨

// 회원가입
const response = await register({
  username: 'newuser',
  password: 'pass123',
  email: 'user@example.com',
  nickname: '닉네임'
});

// 로그아웃
await logout(); // 토큰 자동 삭제

// 인증 상태 확인
if (isAuthenticated()) {
  console.log('로그인 상태');
}
```

### 4. 에러 처리

```javascript
import { getRecipes, ApiError } from '../api';

try {
  const recipes = await getRecipes({ page: 0 });
  console.log(recipes);
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API 에러:', error.message);
    console.error('상태 코드:', error.status);
    console.error('에러 데이터:', error.data);
  } else {
    console.error('네트워크 에러:', error.message);
  }
}
```

### 5. 파일 업로드

```javascript
import { uploadFile } from '../api';

const handleFileUpload = async (file) => {
  try {
    const response = await uploadFile('/recipes/upload', file, {
      title: '레시피 제목',
      category: '한식'
    });
    console.log('업로드 성공:', response);
  } catch (error) {
    console.error('업로드 실패:', error.message);
  }
};
```

---

## 🌍 다국어 사용법

### 1. 기본 사용

```javascript
import { t } from '../utils/i18n';

// 간단한 텍스트
const appName = t('common.appName'); // "K-Recipe"
const welcome = t('common.welcome'); // "환영합니다"

// 중첩된 키
const loginTitle = t('auth.login.title'); // "로그인"
const registerButton = t('auth.register.registerButton'); // "회원가입"
```

### 2. 파라미터 치환

```javascript
import { t } from '../utils/i18n';

// 파라미터가 있는 텍스트
const message = t('validation.fileTooLarge', { maxSize: 5 });
// "파일 크기가 너무 큽니다 (최대: 5MB)"
```

### 3. 언어 변경

```javascript
import { setLanguage, getCurrentLanguage } from '../utils/i18n';

// 현재 언어 확인
console.log(getCurrentLanguage()); // "ko"

// 언어 변경
setLanguage('en'); // 영어로 변경
setLanguage('ko'); // 한국어로 변경
```

### 4. 컴포넌트에서 사용 예제

```javascript
import React from 'react';
import { t } from '../../utils/i18n';

const MyComponent = () => {
  return (
    <div>
      <h1>{t('recipe.recipe.title')}</h1>
      <p>{t('recipe.recipe.description')}</p>
      <button>{t('common.save')}</button>
      <button>{t('common.cancel')}</button>
    </div>
  );
};
```

---

## 📝 리소스 키 구조

### common.json (공통)
- `common.appName` - 앱 이름
- `common.loading` - 로딩 중
- `common.error` - 오류
- `common.save` - 저장
- `common.cancel` - 취소
- `common.category.*` - 카테고리 목록
- `common.difficulty.*` - 난이도 목록
- `common.sort.*` - 정렬 옵션

### auth.json (인증)
- `auth.login.*` - 로그인 관련
- `auth.register.*` - 회원가입 관련
- `auth.logout.*` - 로그아웃 관련
- `auth.profile.*` - 프로필 관련

### recipe.json (레시피)
- `recipe.recipe.*` - 레시피 일반
- `recipe.form.*` - 레시피 폼
- `recipe.detail.*` - 레시피 상세
- `recipe.stats.*` - 통계
- `recipe.hero.*` - 히어로 섹션
- `recipe.messages.*` - 메시지

### validation.json (유효성 검사)
- `validation.required` - 필수 항목
- `validation.invalidEmail` - 잘못된 이메일
- `validation.*TooShort` - 너무 짧음
- `validation.*TooLong` - 너무 김

---

## 🔄 기존 코드 마이그레이션

### Before (기존 방식)

```javascript
// 기존 API 호출
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8085/api';
const response = await fetch(`${apiUrl}/recipes?page=${page}`);
const data = await response.json();

// 하드코딩된 텍스트
<h1>맛있는 한국 요리 레시피</h1>
<button>로그인</button>
```

### After (리팩토링 후)

```javascript
// 새로운 API 서비스
import { getRecipes } from '../api';
import { t } from '../utils/i18n';

const recipes = await getRecipes({ page: 0 });

// 다국어 처리
<h1>{t('recipe.hero.mainTitle')}</h1>
<button>{t('auth.login.loginButton')}</button>
```

---

## 📚 참고 파일

리팩토링 예제:
- `src/components/auth/LoginPageRefactored.jsx` - 로그인 페이지 리팩토링 예제
- `src/components/recipe/HomePageRefactored.jsx` - 홈페이지 리팩토링 예제

API 문서:
- `src/api/config.js` - API 엔드포인트 정의
- `src/api/client.js` - API 클라이언트 구현
- `src/api/services/` - 각 도메인별 서비스

---

## ✅ 마이그레이션 체크리스트

1. [ ] API 호출을 서비스 함수로 교체
2. [ ] 하드코딩된 URL을 API_ENDPOINTS로 교체
3. [ ] 하드코딩된 텍스트를 t() 함수로 교체
4. [ ] 상수를 constants.js로 이동
5. [ ] 에러 처리를 ApiError로 통일
6. [ ] 토큰 관리를 tokenManager로 통일

---

## 🎯 장점

### API 구조화
- ✅ 중복 코드 제거
- ✅ 일관된 에러 처리
- ✅ 타입 안전성 향상 (TypeScript 전환 시 유리)
- ✅ 테스트 용이성
- ✅ 유지보수 편의성

### 다국어 지원
- ✅ 쉬운 언어 추가
- ✅ 중앙화된 텍스트 관리
- ✅ 번역 누락 방지
- ✅ 다국어 서비스 확장 용이

---

## 🚀 다음 단계

1. 기존 컴포넌트를 점진적으로 리팩토링
2. 추가 언어 지원 (일본어, 중국어 등)
3. TypeScript 도입 고려
4. React Query 도입으로 캐싱 및 상태 관리 개선
5. 컴포넌트 라이브러리와 통합 (Storybook 등)
