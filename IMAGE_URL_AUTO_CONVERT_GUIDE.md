# 이미지 URL 자동 변환 가이드

## 📋 개요

모든 이미지가 **서버 URL을 통해 자동으로 조회**되도록 구현되었습니다.
- 개발 환경: `http://localhost:8085`
- 운영 환경: `http://hobbygom.ddns.net:8085`

---

## ✅ 구현 내용

### 1. 환경 변수 설정

**개발 환경** (`.env`):
```env
REACT_APP_IMAGE_BASE_URL=http://localhost:8085
```

**운영 환경** (`.env.production`):
```env
REACT_APP_IMAGE_BASE_URL=http://hobbygom.ddns.net:8085
```

### 2. 자동 URL 변환

**이미지 유틸리티** (`utils/imageUtils.js`):
```javascript
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  
  // 이미 전체 URL인 경우 그대로 반환
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // 상대 경로인 경우 BASE_URL 붙이기
  const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || 'http://localhost:8085';
  return `${baseUrl}${imageUrl}`;
};
```

### 3. 적용된 컴포넌트

| 컴포넌트 | 설명 | 변경 내용 |
|---------|------|----------|
| `RecipeCard.jsx` | 레시피 카드 | `getImageUrl()` 사용 |
| `RecipeDetail.jsx` | 레시피 상세 | `getImageUrl()` 사용 |
| `ImageUpload.jsx` | 이미지 업로드 | 서버 응답 그대로 사용 |

---

## 🔄 동작 방식

### 상황 1: 새로 업로드한 이미지 (전체 URL)

```javascript
// 서버 응답
{
  "fileUrl": "http://localhost:8085/uploads/2025/1002/uuid.jpg"
}

// getImageUrl() 처리
getImageUrl("http://localhost:8085/uploads/2025/1002/uuid.jpg")
// => "http://localhost:8085/uploads/2025/1002/uuid.jpg" (그대로 반환)
```

### 상황 2: 기존 데이터 (상대 경로)

```javascript
// DB에 저장된 값
{
  "imageUrl": "/uploads/2025/1002/uuid.jpg"
}

// getImageUrl() 처리 (개발 환경)
getImageUrl("/uploads/2025/1002/uuid.jpg")
// => "http://localhost:8085/uploads/2025/1002/uuid.jpg"

// getImageUrl() 처리 (운영 환경)
getImageUrl("/uploads/2025/1002/uuid.jpg")
// => "http://hobbygom.ddns.net:8085/uploads/2025/1002/uuid.jpg"
```

### 상황 3: 이미지가 없는 경우

```javascript
getImageUrl("")
// => "" (빈 문자열)

// 컴포넌트에서 처리
{imageUrl ? (
  <img src={getImageUrl(imageUrl)} />
) : (
  <div>플레이스홀더</div>
)}
```

---

## 🎯 사용 방법

### 기본 사용
```jsx
import { getImageUrl, handleImageError } from '../../utils/imageUtils';

// 컴포넌트에서
<img 
  src={getImageUrl(recipe.imageUrl)} 
  alt={recipe.title}
  onError={handleImageError}  // 이미지 로드 실패 시 플레이스홀더 표시
/>
```

### 조건부 렌더링
```jsx
{recipe.imageUrl ? (
  <img 
    src={getImageUrl(recipe.imageUrl)} 
    alt={recipe.title}
    onError={handleImageError}
  />
) : (
  <div className="placeholder">
    <ChefHat className="icon" />
  </div>
)}
```

### 여러 이미지 한 번에 처리
```jsx
import { normalizeImageUrls } from '../../utils/imageUtils';

// 레시피 목록 받아올 때
const recipes = await getRecipes();
const normalized = normalizeImageUrls(recipes);  // 모든 imageUrl 자동 변환
setRecipes(normalized);
```

---

## 🌐 환경별 동작

### 개발 환경

```bash
# .env
REACT_APP_IMAGE_BASE_URL=http://localhost:8085

# 실행
npm start

# 이미지 URL
http://localhost:8085/uploads/2025/1002/uuid.jpg
```

### 운영 환경

```bash
# .env.production
REACT_APP_IMAGE_BASE_URL=http://hobbygom.ddns.net:8085

# 빌드
npm run build

# 이미지 URL
http://hobbygom.ddns.net:8085/uploads/2025/1002/uuid.jpg
```

---

## 📊 테스트 방법

### 1. 개발 환경 테스트

```bash
# 1. 클라이언트 실행
cd client
npm start

# 2. 브라우저 개발자 도구 > Network 탭
# 3. 레시피 목록 확인
# 4. 이미지 요청 URL 확인
# 예상: http://localhost:8085/uploads/...
```

### 2. 이미지 URL 확인

**브라우저 콘솔에서:**
```javascript
// 현재 환경의 BASE_URL 확인
console.log(process.env.REACT_APP_IMAGE_BASE_URL);
// 개발: http://localhost:8085
// 운영: http://hobbygom.ddns.net:8085
```

**React DevTools에서:**
```
RecipeCard > props > recipe > imageUrl 확인
- 전체 URL로 표시되어야 함
```

### 3. 상대 경로 호환성 테스트

**DB에 상대 경로로 저장된 데이터:**
```sql
-- 기존 데이터 확인
SELECT image_url FROM recipes LIMIT 5;
-- 결과: /uploads/2025/1002/uuid.jpg

-- 화면에서는 자동으로 전체 URL로 변환됨
-- http://localhost:8085/uploads/2025/1002/uuid.jpg
```

---

## 🔧 URL 변경하기

### 로컬 네트워크에서 테스트

```env
# .env
REACT_APP_IMAGE_BASE_URL=http://192.168.1.100:8085
```

### HTTPS 사용

```env
# .env.production
REACT_APP_IMAGE_BASE_URL=https://yourdomain.com
```

### CDN 사용

```env
# .env.production
REACT_APP_IMAGE_BASE_URL=https://cdn.yourdomain.com
```

---

## 🐛 문제 해결

### 문제 1: 이미지가 3000번 포트로 요청됨

**증상:**
```
http://localhost:3000/uploads/2025/1002/uuid.jpg
```

**원인:** `getImageUrl()` 사용 안 함

**해결:**
```jsx
// ❌ 잘못된 사용
<img src={recipe.imageUrl} />

// ✅ 올바른 사용
<img src={getImageUrl(recipe.imageUrl)} />
```

### 문제 2: 환경 변수가 적용 안 됨

**증상:** 개발 서버 재시작 후에도 이전 URL 사용

**해결:**
```bash
# 1. .env 파일 수정 후 반드시 서버 재시작
npm start

# 2. 캐시 삭제 후 재시작
rm -rf node_modules/.cache
npm start

# 3. 브라우저 하드 리프레시
# Windows: Ctrl + Shift + R
# Mac: Cmd + Shift + R
```

### 문제 3: 운영 환경에서 localhost URL 사용

**증상:**
```
http://localhost:8085/uploads/... (운영 환경에서)
```

**원인:** `.env.production` 파일 미적용

**해결:**
```bash
# 1. .env.production 파일 확인
cat .env.production
# REACT_APP_IMAGE_BASE_URL=http://hobbygom.ddns.net:8085

# 2. 프로덕션 빌드
npm run build

# 3. 빌드된 파일 확인
cat build/static/js/main.*.js | grep REACT_APP_IMAGE_BASE_URL
```

### 문제 4: 이미지가 깨져서 표시됨

**증상:** 이미지 대신 깨진 이미지 아이콘 표시

**원인:** 파일이 실제로 없거나 서버에서 접근 불가

**해결:**
```bash
# 1. 파일 존재 확인
ls H:/dev_project/EasyFood/storage/2025/1002/

# 2. 서버 로그 확인
# "404 Not Found" 또는 "403 Forbidden" 확인

# 3. 브라우저에서 직접 URL 접근
http://localhost:8085/uploads/2025/1002/uuid.jpg

# 4. WebConfig 설정 확인
# SecurityConfig에서 /uploads/** 허용 확인
```

---

## 🎨 유틸리티 함수 전체 목록

### getImageUrl(imageUrl)
상대 경로를 전체 URL로 변환
```javascript
getImageUrl('/uploads/image.jpg')
// => 'http://localhost:8085/uploads/image.jpg'
```

### handleImageError(event)
이미지 로드 실패 시 플레이스홀더 표시
```javascript
<img src={url} onError={handleImageError} />
```

### isValidImageUrl(imageUrl)
이미지 URL 유효성 확인
```javascript
isValidImageUrl('/uploads/image.jpg')  // true
isValidImageUrl('invalid')  // false
```

### normalizeImageUrls(items, urlKey)
배열의 모든 이미지 URL 일괄 변환
```javascript
normalizeImageUrls(recipes)
// 모든 recipe.imageUrl 자동 변환
```

---

## ✅ 체크리스트

### 개발 환경 확인
- [ ] `.env` 파일에 `REACT_APP_IMAGE_BASE_URL` 설정
- [ ] 개발 서버 재시작 (`npm start`)
- [ ] 브라우저에서 이미지 URL 확인 (개발자 도구 > Network)
- [ ] 레시피 카드에서 이미지 정상 표시 확인
- [ ] 레시피 상세에서 이미지 정상 표시 확인

### 운영 환경 확인
- [ ] `.env.production` 파일에 운영 URL 설정
- [ ] 프로덕션 빌드 (`npm run build`)
- [ ] 빌드된 파일에서 환경 변수 확인
- [ ] 운영 서버에서 이미지 접근 테스트
- [ ] 외부에서 이미지 접근 가능 확인

---

## 📚 관련 파일

### 유틸리티
- `client/src/utils/imageUtils.js` - 이미지 URL 변환 함수

### 컴포넌트
- `client/src/components/recipe/RecipeCard.jsx`
- `client/src/components/recipe/RecipeDetail.jsx`
- `client/src/components/common/ImageUpload.jsx`

### 환경 설정
- `client/.env` - 개발 환경 변수
- `client/.env.production` - 운영 환경 변수

---

## 🎉 완료!

이제 모든 이미지가 자동으로 올바른 서버 URL로 표시됩니다:
- ✅ 개발: `http://localhost:8085/uploads/...`
- ✅ 운영: `http://hobbygom.ddns.net:8085/uploads/...`
- ✅ 기존 데이터 (상대 경로) 호환
- ✅ 새 데이터 (전체 URL) 지원
- ✅ 이미지 로드 실패 시 자동 플레이스홀더

환경 전환 시 `.env` 파일만 수정하면 모든 이미지가 자동으로 올바른 URL로 변환됩니다!
