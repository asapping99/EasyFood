# react-i18next 가이드

## 📦 설치

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

또는

```bash
yarn add react-i18next i18next i18next-browser-languagedetector
```

---

## 🚀 설정

### 1단계: i18n 초기화 (src/utils/i18n-v2.js)

이미 생성된 `i18n-v2.js` 파일을 사용합니다.

### 2단계: App.jsx에서 i18n import

```javascript
// App.jsx 파일 최상단에서 import
import './utils/i18n-v2';  // ✅ 이것만 추가하면 됨!
import React from 'react';
// ... 나머지 imports
```

**중요:** `i18n-v2.js`는 **App.jsx에서 딱 한 번만** import하면 됩니다!

---

## 💡 사용법

### 1. 기본 사용 - useTranslation Hook

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  // Hook 호출
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('common:appName')}</h1>
      <p>{t('recipe:hero.mainTitle')}</p>
      <button>{t('auth:login.loginButton')}</button>
    </div>
  );
}
```

### 2. 네임스페이스 지정

```javascript
// 특정 네임스페이스만 사용
const { t } = useTranslation('auth');

// 여러 네임스페이스 사용
const { t } = useTranslation(['auth', 'common', 'recipe']);

// 사용 시
t('login.title');           // auth 네임스페이스
t('common:appName');        // common 네임스페이스 명시
t('recipe:hero.mainTitle'); // recipe 네임스페이스 명시
```

### 3. 파라미터 치환 (Interpolation)

```javascript
// JSON 파일
{
  "welcome": "환영합니다, {{name}}님!",
  "fileSize": "파일 크기: {{size}}MB"
}

// 컴포넌트
const { t } = useTranslation();

<p>{t('welcome', { name: '홍길동' })}</p>
// 결과: "환영합니다, 홍길동님!"

<p>{t('fileSize', { size: 5 })}</p>
// 결과: "파일 크기: 5MB"
```

### 4. 언어 변경

```javascript
const { i18n } = useTranslation();

// 언어 변경 (자동으로 모든 컴포넌트 리렌더링!)
i18n.changeLanguage('en'); // 영어로 변경
i18n.changeLanguage('ko'); // 한국어로 변경

// 현재 언어 확인
console.log(i18n.language); // 'ko' 또는 'en'
```

### 5. 복수형 처리 (Pluralization)

```javascript
// JSON 파일
{
  "items": "{{count}}개의 아이템",
  "items_one": "{{count}}개의 아이템",
  "items_other": "{{count}}개의 아이템들"
}

// 컴포넌트
t('items', { count: 1 });  // "1개의 아이템"
t('items', { count: 5 });  // "5개의 아이템들"
```

---

## 🎨 실제 컴포넌트 예제

### 로그인 페이지 (완전한 예제)

```javascript
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const { t } = useTranslation(['auth', 'common']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-page">
      <h1>{t('login.title')}</h1>
      <p>{t('login.welcomeBack')}</p>
      
      <form>
        <input
          type="text"
          placeholder={t('login.usernamePlaceholder')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          type="password"
          placeholder={t('login.passwordPlaceholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit">
          {t('login.loginButton')}
        </button>
      </form>
      
      <button onClick={() => alert(t('common:cancel'))}>
        {t('common:cancel')}
      </button>
    </div>
  );
}
```

### 언어 전환 버튼

```javascript
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

  return (
    <button onClick={toggleLanguage}>
      <Globe className="w-4 h-4" />
      {i18n.language === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English'}
    </button>
  );
}
```

---

## 🔥 고급 기능

### 1. 조건부 번역

```javascript
const { t } = useTranslation();

// 삼항 연산자와 함께
{isLogin ? t('login.title') : t('register.title')}

// 변수와 함께
const messageKey = error ? 'error.message' : 'success.message';
t(messageKey);
```

### 2. 배열/객체 번역

```javascript
// JSON
{
  "steps": [
    "첫 번째 단계",
    "두 번째 단계",
    "세 번째 단계"
  ]
}

// 컴포넌트
const { t } = useTranslation();
const steps = t('steps', { returnObjects: true });

steps.map((step, index) => (
  <li key={index}>{step}</li>
));
```

### 3. 날짜/숫자 포맷 (추가 설정 필요)

```javascript
// i18n 설정에 추가
import i18n from 'i18next';

i18n.init({
  // ... 기존 설정
  interpolation: {
    format: (value, format, lng) => {
      if (format === 'date') {
        return new Date(value).toLocaleDateString(lng);
      }
      if (format === 'number') {
        return new Intl.NumberFormat(lng).format(value);
      }
      return value;
    }
  }
});

// 사용
t('createdAt', { date: new Date(), formatParams: { date: { format: 'date' } } });
```

---

## 📁 파일 구조

```
src/
├── utils/
│   ├── i18n.js       # 기존 직접 구현 (옵션 1)
│   └── i18n-v2.js    # react-i18next (옵션 2, 권장)
├── locales/
│   ├── ko/           # 한국어 리소스
│   │   ├── common.json
│   │   ├── auth.json
│   │   └── recipe.json
│   └── en/           # 영어 리소스
│       ├── common.json
│       ├── auth.json
│       └── recipe.json
└── components/
    └── common/
        └── LanguageSwitcher.jsx
```

---

## 🎯 비교: 직접 구현 vs react-i18next

### 직접 구현 (i18n.js)

```javascript
import { t } from '../utils/i18n';

// 사용
<h1>{t('common.appName')}</h1>

// 장점: 간단, 의존성 없음
// 단점: 자동 리렌더링 없음, 고급 기능 없음
```

### react-i18next (i18n-v2.js) ⭐ 권장

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return <h1>{t('common:appName')}</h1>;
}

// 장점: 
// ✅ 자동 리렌더링
// ✅ Hook 기반
// ✅ 복수형, 날짜, 숫자 포맷
// ✅ 강력한 기능
// ✅ 큰 커뮤니티
```

---

## ✅ 마이그레이션 체크리스트

### 직접 구현 → react-i18next

- [ ] npm install react-i18next i18next i18next-browser-languagedetector
- [ ] App.jsx에 `import './utils/i18n-v2'` 추가
- [ ] 기존 `import { t } from '../utils/i18n'` 제거
- [ ] `import { useTranslation } from 'react-i18next'` 추가
- [ ] `const { t } = useTranslation()` Hook 사용
- [ ] 네임스페이스 문법 변경: `t('common.appName')` → `t('common:appName')`
- [ ] 언어 전환: `setLanguage()` → `i18n.changeLanguage()`
- [ ] LanguageSwitcher 컴포넌트 추가

---

## 🚨 주의사항

### 1. Hook은 컴포넌트 내부에서만

```javascript
// ❌ 잘못된 사용
function MyComponent() {
  if (condition) {
    const { t } = useTranslation(); // Hook은 조건문 안에서 사용 불가
  }
}

// ✅ 올바른 사용
function MyComponent() {
  const { t } = useTranslation(); // 컴포넌트 최상단에서 호출
  
  if (condition) {
    return <p>{t('message')}</p>;
  }
}
```

### 2. 유틸리티 함수에서 사용

```javascript
// ❌ 유틸리티 함수에서는 Hook 사용 불가
export function formatMessage() {
  const { t } = useTranslation(); // 에러!
  return t('message');
}

// ✅ 컴포넌트에서 번역 후 전달
function MyComponent() {
  const { t } = useTranslation();
  const message = formatMessage(t('message'));
}
```

### 3. 초기 렌더링 전 i18n 초기화

```javascript
// App.jsx 최상단
import './utils/i18n-v2'; // ✅ 가장 먼저 import
import React from 'react';
import ReactDOM from 'react-dom';
```

---

## 🎓 추가 학습 자료

- [react-i18next 공식 문서](https://react.i18next.com/)
- [i18next 공식 문서](https://www.i18next.com/)
- [React Hook 가이드](https://react.i18next.com/latest/usetranslation-hook)

---

## 🏆 추천 사항

1. **react-i18next 사용 권장** (업계 표준)
2. 새 프로젝트는 처음부터 react-i18next
3. 기존 프로젝트는 점진적으로 마이그레이션
4. TypeScript 사용 시 타입 정의 활용

---

## 💬 자주 묻는 질문 (FAQ)

**Q: 번들 크기가 얼마나 증가하나요?**
A: 약 50KB (gzipped: ~15KB). 기능 대비 합리적입니다.

**Q: SSR(서버 사이드 렌더링) 지원하나요?**
A: 네, Next.js와 완벽하게 호환됩니다.

**Q: 기존 i18n.js와 함께 사용 가능한가요?**
A: 가능하지만 권장하지 않습니다. 하나만 선택하세요.

**Q: 언어 추가는 어떻게 하나요?**
A: locales 폴더에 새 언어 폴더 추가 + i18n-v2.js에 리소스 등록

---

이제 **react-i18next**를 사용하여 전문적인 다국어 지원이 가능합니다! 🎉
