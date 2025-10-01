# 🎯 리팩토링 완료 가이드

## ✅ 완료된 작업

### 1. API 구조화 완료
- ✅ `client/src/api/` - 모든 API 호출이 서비스 함수로 통합
- ✅ 자동 헤더/토큰 관리
- ✅ 통일된 에러 처리

### 2. react-i18next 적용 완료
- ✅ `client/src/utils/i18n.js` - react-i18next 설정
- ✅ `client/src/locales/ko/*.json` - 한국어 리소스 (완전히 보완됨)
- ✅ `client/src/locales/en/*.json` - 영어 리소스

### 3. 업데이트된 컴포넌트
- ✅ `LoginPage.jsx` - react-i18next 적용
- ✅ `HomePage.jsx` - react-i18next 적용
- ✅ `MyRecipesPage.jsx` - react-i18next 적용
- ✅ `RecipeCard.jsx` - react-i18next 적용
- ✅ `LanguageSwitcher.jsx` - 언어 전환 UI

### 4. 정리된 파일
- ❌ LoginPageRefactored.jsx (삭제 예정)
- ❌ LoginPageV2.jsx (삭제 예정)
- ❌ HomePageRefactored.jsx (삭제 예정)
- ❌ App-i18n-example.jsx (삭제 예정)
- ❌ i18n-v2.js (삭제 예정)

---

## 🚀 설치 및 적용 (3단계)

### 1단계: 패키지 설치
```bash
cd client
npm install react-i18next i18next i18next-browser-languagedetector
```

### 2단계: App.jsx 수정

`client/src/App.jsx` 파일 **최상단**에 추가:

```javascript
// App.jsx
import './utils/i18n';  // ✅ 맨 위에 추가!

import React, { useState } from 'react';
import LanguageSwitcher from './components/common/LanguageSwitcher';
// ... 나머지 imports

function App() {
  return (
    <div className="App">
      <header>
        <h1>K-Recipe</h1>
        <LanguageSwitcher />  {/* 언어 전환 버튼 */}
      </header>
      {/* ... 나머지 코드 */}
    </div>
  );
}

export default App;
```

### 3단계: 실행
```bash
npm start
```

---

## 📝 아직 업데이트 필요한 컴포넌트

다음 컴포넌트들은 하드코딩된 텍스트가 있습니다. 아래 패턴을 참고하여 업데이트하세요:

### 업데이트 필요
- ⚠️ `RecipeDetail.jsx`
- ⚠️ `RecipeListPage.jsx` 
- ⚠️ `RecipeForm.jsx`

### 업데이트 패턴

#### Before (하드코딩)
```javascript
function MyComponent() {
  return (
    <div>
      <h1>레시피 목록</h1>
      <p>총 {count}개의 레시피</p>
      <button>저장</button>
    </div>
  );
}
```

#### After (react-i18next)
```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation(['recipe', 'common']);
  
  return (
    <div>
      <h1>{t('recipe.allRecipes')}</h1>
      <p>{t('recipe.totalRecipes', { count })}</p>
      <button>{t('common:save')}</button>
    </div>
  );
}
```

---

## 🔧 주요 번역 키 참조

### 자주 사용하는 키

```javascript
// 공통
t('common:loading')                // 로딩 중...
t('common:save')                   // 저장
t('common:cancel')                 // 취소
t('common:delete')                 // 삭제
t('common:edit')                   // 수정
t('common:backToHome')             // 홈으로 돌아가기
t('common:unit.minute')            // 분
t('common:unit.serving')           // 인분

// 레시피
t('recipe.myRecipes')              // 내 레시피
t('recipe.allRecipes')             // 모든 레시피
t('recipe.newRecipe')              // 새 레시피 작성
t('recipe.loadingRecipes')         // 레시피를 불러오고 있어요...
t('recipe.noRecipes')              // 레시피가 없습니다
t('recipe.totalRecipes', { count })// 총 {{count}}개의 레시피

// 폼
t('form.title')                    // 레시피 제목
t('form.description')              // 레시피 설명
t('form.ingredients')              // 재료
t('form.steps')                    // 조리 순서
t('form.addIngredient')            // 재료 추가
t('form.addStep')                  // 단계 추가
t('form.submitButton')             // 등록하기
t('form.updateButton')             // 수정하기

// 상세
t('detail.deleteConfirm')          // 정말로 이 레시피를 삭제하시겠습니까?
t('detail.deleteSuccess')          // 레시피가 삭제되었습니다.
t('detail.likeCount', { count })   // 좋아요 ({{count}})
t('detail.shareButton')            // 공유하기

// 통계
t('stats.totalRecipes')            // 전체 레시피
t('stats.totalLikes')              // 총 좋아요
t('stats.totalViews')              // 총 조회수
```

---

## 🗑️ 삭제할 파일들

다음 파일들은 더 이상 필요없습니다:

```bash
# 삭제 명령
rm client/src/components/auth/LoginPageRefactored.jsx
rm client/src/components/auth/LoginPageV2.jsx
rm client/src/components/recipe/HomePageRefactored.jsx
rm client/src/App-i18n-example.jsx
rm client/src/utils/i18n-v2.js
```

또는 수동으로 삭제하세요.

---

## 📖 리소스 파일 구조

```
client/src/locales/
├── ko/
│   ├── common.json     # 공통 (버튼, 단위, 카테고리 등)
│   ├── auth.json       # 인증 (로그인, 회원가입)
│   ├── recipe.json     # 레시피 (전체 텍스트 완비)
│   └── validation.json # 유효성 검사
└── en/                 # 영어 (동일 구조)
```

### 새로운 텍스트 추가 방법

1. `locales/ko/recipe.json` 또는 `common.json`에 추가:
```json
{
  "myNewKey": "새로운 텍스트"
}
```

2. 컴포넌트에서 사용:
```javascript
t('recipe:myNewKey')  // 또는 t('common:myNewKey')
```

---

## 🎯 체크리스트

### 설치
- [ ] `npm install` 완료
- [ ] `App.jsx`에 `import './utils/i18n'` 추가
- [ ] 헤더에 `<LanguageSwitcher />` 추가

### 테스트
- [ ] 앱 실행 (npm start)
- [ ] 한국어/영어 전환 테스트
- [ ] 모든 페이지 정상 작동 확인

### 정리 (선택사항)
- [ ] v2, Refactored 파일들 삭제
- [ ] 남은 컴포넌트 업데이트

---

## 💡 팁

### 1. 빠른 변환 방법

하드코딩된 텍스트를 찾으려면:
```bash
# VS Code에서 검색 (Ctrl+Shift+F)
"레시피"
"저장"
"삭제"
```

### 2. 파라미터가 있는 텍스트

```javascript
// JSON
{
  "totalRecipes": "총 {{count}}개의 레시피"
}

// 사용
t('recipe:totalRecipes', { count: 5 })
// 결과: "총 5개의 레시피"
```

### 3. 조건부 텍스트

```javascript
{isLogin ? t('auth:login.title') : t('auth:register.title')}
```

---

## 🚀 다음 단계

1. **즉시:** 나머지 컴포넌트 업데이트
2. **선택:** TypeScript 도입
3. **선택:** React Query로 API 캐싱
4. **선택:** 추가 언어 지원 (일본어, 중국어)

---

## 📞 문의

질문이나 문제가 있으면 다음 문서를 참고하세요:
- `INSTALLATION_GUIDE.md` - 설치 가이드
- `REACT_I18NEXT_GUIDE.md` - react-i18next 상세 가이드
- `REFACTORING_GUIDE.md` - API 리팩토링 가이드

---

**축하합니다! 🎉**

이제 깔끔하고 유지보수하기 쉬운 구조가 완성되었습니다!
