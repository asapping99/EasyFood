# 🚀 react-i18next 적용 가이드

## ✅ 완료된 작업

모든 파일이 **react-i18next**로 업데이트되었습니다!

### 생성/업데이트된 파일
```
✅ client/src/utils/i18n.js                    # react-i18next 설정
✅ client/src/components/auth/LoginPage.jsx     # 업데이트
✅ client/src/components/recipe/HomePage.jsx    # 업데이트
✅ client/src/components/common/LanguageSwitcher.jsx  # 언어 전환 UI
```

---

## 📦 1단계: 패키지 설치

프로젝트 루트의 `client` 폴더로 이동한 후 실행:

```bash
cd client
npm install react-i18next i18next i18next-browser-languagedetector
```

또는 Yarn 사용:

```bash
yarn add react-i18next i18next i18next-browser-languagedetector
```

---

## 🔧 2단계: App.jsx 수정

`client/src/App.jsx` 파일을 열고 **최상단**에 다음 줄을 추가:

```javascript
// App.jsx
import './utils/i18n';  // ✅ 이 줄을 맨 위에 추가!
import React, { useState } from 'react';
// ... 나머지 imports

function App() {
  // ... 기존 코드
}

export default App;
```

**중요:** `import './utils/i18n';`은 **다른 모든 import 보다 먼저** 와야 합니다!

---

## 🎨 3단계: 헤더에 언어 전환 버튼 추가 (선택사항)

App.jsx 또는 Header 컴포넌트에 언어 전환 버튼 추가:

```javascript
import LanguageSwitcher from './components/common/LanguageSwitcher';

function App() {
  return (
    <div className="App">
      {/* 헤더 */}
      <header className="flex justify-between items-center p-4">
        <h1>K-Recipe</h1>
        
        {/* 언어 전환 버튼 추가 */}
        <LanguageSwitcher />
      </header>

      {/* 나머지 컨텐츠 */}
      <main>
        {/* ... */}
      </main>
    </div>
  );
}
```

### 다른 스타일 옵션

```javascript
// 옵션 1: 드롭다운 (기본)
import LanguageSwitcher from './components/common/LanguageSwitcher';
<LanguageSwitcher />

// 옵션 2: 간단한 토글
import { LanguageToggle } from './components/common/LanguageSwitcher';
<LanguageToggle />

// 옵션 3: 아이콘만
import { LanguageIcon } from './components/common/LanguageSwitcher';
<LanguageIcon />
```

---

## ✅ 완료!

이제 앱을 실행하면:

```bash
npm start
```

1. ✅ 모든 텍스트가 다국어로 표시됩니다
2. ✅ 언어 전환 버튼 클릭 시 **즉시 전체 앱이 자동으로 업데이트**됩니다
3. ✅ 선택한 언어는 localStorage에 자동 저장됩니다

---

## 🎯 사용 예제

### 기존 컴포넌트를 변환하는 방법

#### Before (하드코딩)

```javascript
function MyComponent() {
  return (
    <div>
      <h1>맛있는 한국 요리 레시피</h1>
      <button>로그인</button>
      <p>환영합니다!</p>
    </div>
  );
}
```

#### After (react-i18next)

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation(['recipe', 'auth', 'common']);
  
  return (
    <div>
      <h1>{t('hero.mainTitle')}</h1>
      <button>{t('auth:login.loginButton')}</button>
      <p>{t('common:welcome')}</p>
    </div>
  );
}
```

---

## 📚 주요 번역 키

### common (공통)
```javascript
t('common:appName')          // K-Recipe
t('common:welcome')          // 환영합니다
t('common:loading')          // 로딩 중...
t('common:save')             // 저장
t('common:cancel')           // 취소
t('common:category.korean')  // 한식
t('common:difficulty.easy')  // 초급
t('common:sort.recent')      // 최신순
```

### auth (인증)
```javascript
t('auth:login.title')                // 로그인
t('auth:login.welcomeBack')          // 다시 오신 것을 환영합니다!
t('auth:login.loginButton')          // 로그인
t('auth:register.title')             // 회원가입
t('auth:register.registerButton')    // 회원가입
```

### recipe (레시피)
```javascript
t('recipe:hero.mainTitle')           // 맛있는 한국 요리 레시피
t('recipe:hero.mainDescription')     // 설명...
t('recipe:recipe.allRecipes')        // 모든 레시피
t('recipe:recipe.createRecipe')      // 레시피 등록
t('recipe:stats.totalRecipes')       // 전체 레시피
t('recipe:form.title')               // 제목
```

---

## 🔥 고급 사용법

### 1. 파라미터 치환

```javascript
const { t } = useTranslation();

// welcome 키: "환영합니다, {{name}}님!"
<p>{t('common:welcome', { name: '홍길동' })}</p>
// 결과: "환영합니다, 홍길동님!"
```

### 2. 프로그래매틱 언어 변경

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { i18n } = useTranslation();
  
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);  // 전체 앱이 즉시 업데이트!
  };
  
  return (
    <div>
      <button onClick={() => handleLanguageChange('ko')}>한국어</button>
      <button onClick={() => handleLanguageChange('en')}>English</button>
    </div>
  );
}
```

### 3. 현재 언어 확인

```javascript
const { i18n } = useTranslation();

console.log(i18n.language);  // 'ko' 또는 'en'

if (i18n.language === 'ko') {
  // 한국어일 때만 실행
}
```

---

## 🐛 문제 해결

### 문제 1: "Cannot find module 'react-i18next'"

**해결:** 패키지를 설치했는지 확인

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

### 문제 2: 번역이 표시되지 않음

**해결:** App.jsx에 i18n import가 있는지 확인

```javascript
import './utils/i18n';  // ✅ 최상단에 있어야 함!
```

### 문제 3: 언어 변경이 안 됨

**해결:** useTranslation Hook을 올바르게 사용했는지 확인

```javascript
// ❌ 잘못된 사용
const t = useTranslation();

// ✅ 올바른 사용
const { t } = useTranslation();
```

### 문제 4: "t is not a function"

**해결:** Hook을 컴포넌트 최상단에서 호출

```javascript
function MyComponent() {
  const { t } = useTranslation();  // ✅ 컴포넌트 최상단
  
  // ❌ 조건문 안에서 호출하면 안 됨
  if (condition) {
    const { t } = useTranslation();  // 에러!
  }
}
```

---

## 📝 체크리스트

설치 및 설정:
- [ ] npm install 실행
- [ ] App.jsx에 `import './utils/i18n'` 추가
- [ ] 앱 실행 확인 (npm start)

선택사항:
- [ ] 헤더에 LanguageSwitcher 추가
- [ ] 기존 컴포넌트를 react-i18next로 변환

테스트:
- [ ] 한국어/영어 전환이 잘 되는지 확인
- [ ] 페이지 새로고침 후에도 언어가 유지되는지 확인
- [ ] 모든 텍스트가 번역되는지 확인

---

## 🎓 더 알아보기

### 공식 문서
- [react-i18next 공식 문서](https://react.i18next.com/)
- [useTranslation Hook](https://react.i18next.com/latest/usetranslation-hook)
- [i18next 공식 문서](https://www.i18next.com/)

### 프로젝트 문서
- `REACT_I18NEXT_GUIDE.md` - 상세 가이드
- `REFACTORING_GUIDE.md` - API 리팩토링 가이드

---

## 🎉 완료!

축하합니다! 이제 전문적인 다국어 지원이 완료되었습니다! 🚀

- ✅ 업계 표준 라이브러리 사용
- ✅ 자동 리렌더링
- ✅ 확장 가능한 구조
- ✅ localStorage 자동 저장

다음 단계:
1. 기존 컴포넌트들을 점진적으로 변환
2. 필요시 일본어, 중국어 등 추가 언어 지원
3. TypeScript 도입 검토

질문이 있으시면 언제든 물어보세요! 🙋‍♂️
