# 페이지 타이틀 다국어 지원 가이드

## 📋 개요

브라우저 탭에 표시되는 페이지 타이틀이 사용자가 선택한 언어에 따라 자동으로 변경됩니다.

---

## ✨ 주요 기능

### 1. **자동 언어 전환**
- Header의 언어 전환 버튼(🌐) 클릭 시 타이틀 자동 변경
- 한국어 ↔ 영어 실시간 전환

### 2. **페이지별 타이틀**
각 페이지마다 적절한 타이틀이 표시됩니다:

| 페이지 | 한국어 타이틀 | 영어 타이틀 |
|--------|--------------|-------------|
| 홈 | K-Recipe - 맛있는 한국 요리 레시피 | K-Recipe - Delicious Korean Recipes |
| 로그인 | 로그인 - K-Recipe | Login - K-Recipe |
| 회원가입 | 회원가입 - K-Recipe | Sign Up - K-Recipe |
| 레시피 상세 | [레시피명] - K-Recipe | [Recipe Name] - K-Recipe |
| 레시피 등록 | 레시피 등록 - K-Recipe | Add Recipe - K-Recipe |
| 레시피 수정 | 레시피 수정 - K-Recipe | Edit Recipe - K-Recipe |
| 내 레시피 | 내 레시피 - K-Recipe | My Recipes - K-Recipe |
| 프로필 | 프로필 - K-Recipe | Profile - K-Recipe |

### 3. **동적 타이틀 (레시피 상세 페이지)**
레시피 상세 페이지에서는 실제 레시피 이름이 타이틀에 표시됩니다.

**예시:**
- `김치찌개 - K-Recipe`
- `Kimchi Jjigae - K-Recipe`

---

## 🔧 구현 방법

### 1. 커스텀 훅: `usePageTitle`

`client/src/hooks/usePageTitle.js`

```javascript
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const usePageTitle = (pageKey, customTitle = null) => {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    if (customTitle) {
      // 커스텀 타이틀 (예: 레시피 이름)
      document.title = `${customTitle} - ${t('appName')}`;
    } else if (pageKey) {
      // 정의된 페이지 타이틀
      document.title = t(`pageTitle.${pageKey}`);
    } else {
      // 기본 타이틀
      document.title = t('pageTitle.default');
    }
  }, [pageKey, customTitle, t, i18n.language]);
};
```

### 2. 언어 리소스 파일

**한국어 (`client/src/locales/ko/common.json`):**
```json
{
  "pageTitle": {
    "home": "K-Recipe - 맛있는 한국 요리 레시피",
    "login": "로그인 - K-Recipe",
    "register": "회원가입 - K-Recipe",
    "recipeDetail": "레시피 상세 - K-Recipe",
    "createRecipe": "레시피 등록 - K-Recipe",
    "editRecipe": "레시피 수정 - K-Recipe",
    "myRecipes": "내 레시피 - K-Recipe",
    "profile": "프로필 - K-Recipe",
    "default": "K-Recipe - 요리 레시피 플랫폼"
  }
}
```

**영어 (`client/src/locales/en/common.json`):**
```json
{
  "pageTitle": {
    "home": "K-Recipe - Delicious Korean Recipes",
    "login": "Login - K-Recipe",
    "register": "Sign Up - K-Recipe",
    "recipeDetail": "Recipe Details - K-Recipe",
    "createRecipe": "Add Recipe - K-Recipe",
    "editRecipe": "Edit Recipe - K-Recipe",
    "myRecipes": "My Recipes - K-Recipe",
    "profile": "Profile - K-Recipe",
    "default": "K-Recipe - Recipe Platform"
  }
}
```

### 3. 사용 예시

#### App.jsx - 기본 페이지 타이틀
```javascript
import { usePageTitle } from './hooks/usePageTitle';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  // 페이지 타이틀 매핑
  const pageTitleMap = {
    'home': 'home',
    'login': 'login',
    'detail': 'recipeDetail',
    'create': 'createRecipe',
    'edit': 'editRecipe',
    'profile': 'profile',
    'my-recipes': 'myRecipes'
  };
  
  // 페이지 타이틀 설정
  usePageTitle(pageTitleMap[currentPage] || 'default');
  
  // ...
};
```

#### RecipeDetail.jsx - 커스텀 타이틀
```javascript
import { usePageTitle } from '../../hooks/usePageTitle';

const RecipeDetail = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  
  // 레시피 이름을 타이틀에 포함
  usePageTitle('recipeDetail', recipe?.title);
  
  // ...
};
```

---

## 🌐 언어 전환 버튼

Header 컴포넌트에 언어 전환 버튼이 추가되었습니다:

```javascript
const Header = () => {
  const { t, i18n } = useTranslation('common');
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };
  
  return (
    <button onClick={toggleLanguage}>
      <Globe className="w-5 h-5" />
      <span>{i18n.language === 'ko' ? 'EN' : 'KO'}</span>
    </button>
  );
};
```

### 위치
- **데스크톱**: 우측 상단, 다크모드 버튼 왼쪽
- **모바일**: 햄버거 메뉴 내부

---

## 📝 새 페이지 타이틀 추가하기

### 1단계: 언어 리소스에 타이틀 추가

`client/src/locales/ko/common.json`:
```json
{
  "pageTitle": {
    "myNewPage": "새 페이지 - K-Recipe"
  }
}
```

`client/src/locales/en/common.json`:
```json
{
  "pageTitle": {
    "myNewPage": "My New Page - K-Recipe"
  }
}
```

### 2단계: 컴포넌트에서 사용

```javascript
import { usePageTitle } from '../hooks/usePageTitle';

const MyNewPage = () => {
  usePageTitle('myNewPage');
  
  return <div>새 페이지 내용</div>;
};
```

### 3단계 (App.jsx에서 라우팅하는 경우): 매핑 추가

```javascript
const pageTitleMap = {
  // ...기존 매핑
  'new-page': 'myNewPage'
};
```

---

## 🎯 고급 사용법

### 동적 타이틀 (파라미터 포함)

레시피 상세 페이지처럼 동적 데이터를 포함하는 경우:

```javascript
const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  
  // 레시피가 로드되면 타이틀 업데이트
  usePageTitle('recipeDetail', recipe?.title);
  
  useEffect(() => {
    // 레시피 데이터 로드
    fetchRecipe().then(data => setRecipe(data));
  }, []);
  
  return <div>{recipe?.title}</div>;
};
```

### 커스텀 타이틀 포맷

특별한 포맷이 필요한 경우:

```javascript
const MyPage = () => {
  const { t } = useTranslation();
  const customTitle = `${userName} - ${t('pageTitle.profile')}`;
  
  usePageTitle(null, customTitle);
  
  return <div>내용</div>;
};
```

---

## 🔍 테스트 방법

### 1. 브라우저 탭 확인
1. 애플리케이션 실행
2. 각 페이지로 이동하며 브라우저 탭의 타이틀 확인
3. 언어 전환 버튼 클릭 후 타이틀 변경 확인

### 2. 개발자 도구 확인
```javascript
// 콘솔에서 현재 타이틀 확인
console.log(document.title);

// 언어 변경 후 타이틀 확인
i18n.changeLanguage('en');
console.log(document.title); // 영어로 변경됨
```

---

## 🚨 문제 해결

### 타이틀이 변경되지 않는 경우

**원인 1: 언어 리소스 누락**
```javascript
// common.json에 pageTitle 섹션이 있는지 확인
{
  "pageTitle": {
    "home": "..."
  }
}
```

**원인 2: 잘못된 pageKey**
```javascript
// 올바른 키 사용
usePageTitle('home');  // ✅
usePageTitle('HomePage');  // ❌ (정의되지 않은 키)
```

**원인 3: usePageTitle 호출 위치**
```javascript
// 컴포넌트 최상단에서 호출
const MyPage = () => {
  usePageTitle('myPage');  // ✅
  
  // ❌ 조건문이나 루프 안에서 호출하지 말 것
  if (condition) {
    usePageTitle('myPage');  // ❌
  }
};
```

### 언어 전환이 안되는 경우

**원인: i18n 초기화 문제**
```javascript
// index.js 또는 App.jsx에서 i18n import 확인
import './utils/i18n';  // ✅ 이 줄이 있어야 함
```

---

## 📚 참고 자료

- [react-i18next 공식 문서](https://react.i18next.com/)
- [i18next 공식 문서](https://www.i18next.com/)
- [HTML title element - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)

---

## ✅ 체크리스트

새 페이지 추가 시:
- [ ] 언어 리소스에 타이틀 추가 (ko, en)
- [ ] usePageTitle 훅 import
- [ ] 컴포넌트에서 usePageTitle 호출
- [ ] pageTitleMap에 매핑 추가 (필요시)
- [ ] 브라우저에서 타이틀 확인
- [ ] 언어 전환 후 타이틀 확인

---

## 🎉 완료!

이제 모든 페이지에서 다국어 타이틀이 자동으로 적용됩니다.
Header의 🌐 버튼으로 언어를 전환하면 페이지 타이틀도 함께 변경됩니다!
