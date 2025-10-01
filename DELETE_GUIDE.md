# 🗑️ 파일 정리 가이드

## ❌ 삭제해야 할 파일 목록

다음 파일들은 더 이상 필요없는 중복/예제 파일입니다.

### 1. 중복된 LoginPage 파일 (2개 삭제)
```
❌ client/src/components/auth/LoginPageRefactored.jsx
❌ client/src/components/auth/LoginPageV2.jsx
✅ client/src/components/auth/LoginPage.jsx (유지 - 최신 버전)
```

### 2. 중복된 HomePage 파일 (1개 삭제)
```
❌ client/src/components/recipe/HomePageRefactored.jsx
✅ client/src/components/recipe/HomePage.jsx (유지 - 최신 버전)
```

### 3. 중복된 i18n 설정 파일 (1개 삭제)
```
❌ client/src/utils/i18n-v2.js
✅ client/src/utils/i18n.js (유지 - 실제 사용)
```

### 4. 예제 파일 (1개 삭제)
```
❌ client/src/App-i18n-example.jsx
```

---

## 🔧 삭제 방법

### 방법 1: 수동 삭제 (추천)
파일 탐색기나 VS Code에서 직접 삭제하세요.

### 방법 2: 명령어로 삭제

#### Windows (PowerShell)
```powershell
cd H:\dev_project\EasyFood\client\src

# 중복 LoginPage 삭제
Remove-Item components\auth\LoginPageRefactored.jsx
Remove-Item components\auth\LoginPageV2.jsx

# 중복 HomePage 삭제
Remove-Item components\recipe\HomePageRefactored.jsx

# 중복 i18n 삭제
Remove-Item utils\i18n-v2.js

# 예제 파일 삭제
Remove-Item App-i18n-example.jsx
```

#### Mac/Linux (bash)
```bash
cd /path/to/EasyFood/client/src

# 중복 LoginPage 삭제
rm components/auth/LoginPageRefactored.jsx
rm components/auth/LoginPageV2.jsx

# 중복 HomePage 삭제
rm components/recipe/HomePageRefactored.jsx

# 중복 i18n 삭제
rm utils/i18n-v2.js

# 예제 파일 삭제
rm App-i18n-example.jsx
```

#### Git으로 삭제 (Git 사용 시)
```bash
cd H:\dev_project\EasyFood

git rm client/src/components/auth/LoginPageRefactored.jsx
git rm client/src/components/auth/LoginPageV2.jsx
git rm client/src/components/recipe/HomePageRefactored.jsx
git rm client/src/utils/i18n-v2.js
git rm client/src/App-i18n-example.jsx

git commit -m "Remove duplicate and example files"
```

---

## ✅ 삭제 후 확인

삭제 후 다음 명령어로 앱이 정상 작동하는지 확인:

```bash
npm start
```

---

## 📁 최종 파일 구조

삭제 후 깔끔한 구조:

```
client/src/
├── api/                        # API 모듈
├── components/
│   ├── auth/
│   │   └── LoginPage.jsx       ✅ 유일한 로그인 페이지
│   ├── recipe/
│   │   ├── HomePage.jsx        ✅ 유일한 홈페이지
│   │   ├── MyRecipesPage.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeDetail.jsx
│   │   ├── RecipeForm.jsx
│   │   └── RecipeListPage.jsx
│   └── common/
│       └── LanguageSwitcher.jsx
├── locales/                    # 다국어 리소스
├── utils/
│   ├── api.js
│   ├── constants.js
│   └── i18n.js                 ✅ 유일한 i18n 설정
└── App.jsx
```

---

## 🎯 왜 이 파일들이 불필요한가?

| 파일 | 이유 |
|------|------|
| LoginPageRefactored.jsx | 중간 버전, LoginPage.jsx가 최신 |
| LoginPageV2.jsx | 중간 버전, LoginPage.jsx가 최신 |
| HomePageRefactored.jsx | 중간 버전, HomePage.jsx가 최신 |
| i18n-v2.js | 중복, i18n.js 사용 중 |
| App-i18n-example.jsx | 참고용 예제, 실제 사용 안 함 |

---

## 🚨 주의사항

**삭제하면 안 되는 파일:**
- ✅ `LoginPage.jsx` (최신 버전)
- ✅ `HomePage.jsx` (최신 버전)
- ✅ `i18n.js` (실제 사용 중)
- ✅ `App.jsx` (메인 앱)

---

삭제 완료 후 이 가이드는 삭제해도 됩니다! 😊
