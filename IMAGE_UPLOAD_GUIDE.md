# 이미지 파일 업로드 기능 가이드

## 📋 개요

레시피 등록 시 이미지 URL 입력 대신 **파일을 직접 업로드**하여 사용할 수 있습니다.

### ✨ 주요 기능
- 📁 **파일 업로드**: 드래그 앤 드롭 또는 파일 선택
- 🖼️ **썸네일 미리보기**: 업로드 전후 이미지 미리보기
- 📂 **자동 디렉토리 관리**: 년도/월일 별로 자동 분류 저장
- 🔒 **파일 유효성 검증**: 파일 타입, 크기 자동 검증
- 💾 **로컬 저장소**: 서버 설정 경로에 저장

---

## 🎯 사용 방법

### 1. 레시피 등록 페이지에서 이미지 업로드

#### 드래그 앤 드롭
1. 이미지 파일을 준비
2. 업로드 영역으로 드래그
3. 드롭하면 자동 업로드 및 미리보기

#### 파일 선택
1. 업로드 영역 클릭
2. 파일 선택 다이얼로그에서 이미지 선택
3. 자동 업로드 및 미리보기

### 2. 이미지 제거
- 미리보기 이미지 위에 마우스 호버
- X 버튼 클릭하여 제거

---

## 🔧 서버 설정

### 파일 저장 설정

`server/src/main/resources/application.properties`:

```properties
# 파일 업로드 저장 경로 (절대 경로)
file.upload.dir=H:/dev_project/EasyFood/uploads

# 파일 접근 URL 경로
file.upload.url-path=/uploads

# 허용되는 파일 확장자 (쉼표로 구분)
file.upload.allowed-extensions=jpg,jpeg,png,gif,webp

# 최대 파일 크기 (바이트 단위, 10MB)
file.upload.max-file-size=10485760
```

### 저장 경로 변경

다른 경로에 저장하고 싶다면:

```properties
# Windows
file.upload.dir=C:/uploads/easyfood

# Linux/Mac
file.upload.dir=/var/www/uploads/easyfood
```

---

## 📂 파일 저장 구조

업로드된 파일은 **년도/월일** 별로 자동 분류됩니다:

```
uploads/
├── 2025/
│   ├── 1002/
│   │   ├── uuid-1.jpg
│   │   ├── uuid-2.png
│   │   └── uuid-3.webp
│   ├── 1003/
│   │   ├── uuid-4.jpg
│   │   └── uuid-5.png
│   └── 1004/
│       └── uuid-6.jpg
└── 2026/
    └── 0101/
        └── uuid-7.jpg
```

### 파일명 규칙
- **UUID 기반**: 중복 방지를 위해 UUID 사용
- **확장자 유지**: 원본 파일의 확장자 유지
- **예시**: `550e8400-e29b-41d4-a716-446655440000.jpg`

---

## 🔍 지원하는 파일 형식

### 허용되는 이미지 타입
- ✅ JPG / JPEG
- ✅ PNG
- ✅ GIF
- ✅ WEBP

### 파일 크기 제한
- 최대 **10MB**

---

## 🛠️ 기술 구조

### 서버 (Spring Boot)

#### 1. FileStorageService
**위치**: `server/src/main/java/com/krecipe/service/FileStorageService.java`

**주요 기능**:
- 파일 저장 (`storeFile`)
- 파일 삭제 (`deleteFile`)
- 파일 유효성 검증 (`validateFile`)
- 날짜 기반 경로 생성 (`generateDatePath`)

**예시 코드**:
```java
// 파일 저장
String fileUrl = fileStorageService.storeFile(multipartFile);
// 결과: /uploads/2025/1002/uuid.jpg

// 파일 삭제
boolean deleted = fileStorageService.deleteFile(fileUrl);
```

#### 2. FileController
**위치**: `server/src/main/java/com/krecipe/controller/FileController.java`

**엔드포인트**:
- `POST /api/files/upload/image` - 이미지 업로드
- `DELETE /api/files/delete` - 파일 삭제

#### 3. WebConfig
**위치**: `server/src/main/java/com/krecipe/config/WebConfig.java`

**기능**: 업로드된 파일을 정적 리소스로 서빙

```java
// /uploads/** 요청을 실제 파일 시스템 경로로 매핑
registry.addResourceHandler("/uploads/**")
        .addResourceLocations("file:" + uploadDir + "/");
```

### 클라이언트 (React)

#### 1. fileService.js
**위치**: `client/src/api/services/fileService.js`

**주요 함수**:
- `uploadImage(file)` - 이미지 업로드
- `deleteFile(fileUrl)` - 파일 삭제
- `validateImageFile(file)` - 파일 유효성 검증
- `convertImageToBase64(file)` - Base64 변환 (미리보기용)

#### 2. ImageUpload 컴포넌트
**위치**: `client/src/components/common/ImageUpload.jsx`

**기능**:
- 드래그 앤 드롭 지원
- 파일 선택 지원
- 썸네일 미리보기
- 업로드 진행 표시
- 에러 핸들링

**사용 예시**:
```jsx
<ImageUpload
  onImageUploaded={(fileUrl) => setFormData({...formData, imageUrl: fileUrl})}
  initialImageUrl={formData.imageUrl}
  label="이미지 업로드"
/>
```

---

## 🔐 보안 설정

### Security 설정

`server/src/main/java/com/krecipe/config/SecurityConfig.java`:

```java
// 파일 업로드/다운로드 엔드포인트 허용
.requestMatchers("/api/files/upload/**").permitAll()
.requestMatchers("/uploads/**").permitAll()
```

### 파일 유효성 검증

**서버에서 검증**:
- 파일 크기 제한
- 파일 확장자 검증
- 빈 파일 방지

**클라이언트에서 검증**:
- 파일 타입 체크 (MIME type)
- 파일 크기 체크
- 즉시 피드백

---

## 📊 API 명세

### 1. 이미지 업로드

**요청**:
```http
POST /api/files/upload/image
Content-Type: multipart/form-data

{
  "file": <binary file data>
}
```

**응답**:
```json
{
  "success": true,
  "fileUrl": "/uploads/2025/1002/uuid.jpg",
  "fileName": "recipe-photo.jpg",
  "fileSize": 1024000,
  "message": "이미지가 성공적으로 업로드되었습니다."
}
```

**에러 응답**:
```json
{
  "success": false,
  "error": "파일 크기가 최대 허용 크기(10MB)를 초과했습니다."
}
```

### 2. 파일 삭제

**요청**:
```http
DELETE /api/files/delete?fileUrl=/uploads/2025/1002/uuid.jpg
```

**응답**:
```json
{
  "success": true,
  "message": "파일이 삭제되었습니다."
}
```

---

## 🚀 배포 시 고려사항

### 1. 프로덕션 환경 설정

**디스크 용량 확인**:
- 업로드 파일이 쌓이므로 충분한 디스크 공간 필요
- 정기적인 모니터링 권장

**백업 전략**:
- 업로드 디렉토리 정기 백업
- 데이터베이스와 파일 동기화 확인

### 2. 성능 최적화

**CDN 사용** (선택사항):
- 정적 파일을 CDN으로 서빙
- 서버 부하 감소

**이미지 최적화**:
- 업로드 시 자동 리사이징
- WebP 변환
- 썸네일 생성

### 3. 파일 정리

**오래된 파일 삭제** (권장):
```java
// 정기적으로 미사용 파일 삭제
// 예: 30일 이상 된 파일 삭제
```

---

## 🐛 문제 해결

### 업로드 실패

**증상**: 파일 업로드가 실패함

**원인 1**: 디렉토리 권한 문제
```bash
# Linux/Mac
chmod 755 /path/to/uploads

# Windows
# 폴더 속성 > 보안 탭에서 쓰기 권한 확인
```

**원인 2**: 파일 크기 초과
```properties
# application.properties
spring.servlet.multipart.max-file-size=20MB
spring.servlet.multipart.max-request-size=20MB
file.upload.max-file-size=20971520
```

### 이미지가 표시되지 않음

**증상**: 업로드 후 이미지가 보이지 않음

**원인**: 정적 리소스 경로 매핑 문제
```java
// WebConfig.java 확인
// uploadDir 경로가 올바른지 확인
```

**해결**:
```
브라우저에서 직접 URL 접근 테스트:
http://localhost:8085/uploads/2025/1002/uuid.jpg
```

### 썸네일이 깨짐

**증상**: 미리보기가 깨져서 보임

**원인**: Base64 변환 문제

**해결**:
```javascript
// 파일 타입 확인
console.log(file.type); // image/jpeg 등이어야 함
```

---

## 📝 개발 가이드

### 새로운 파일 타입 추가

**서버 설정**:
```properties
# application.properties
file.upload.allowed-extensions=jpg,jpeg,png,gif,webp,svg
```

**클라이언트 검증**:
```javascript
// fileService.js
const allowedTypes = [
  'image/jpeg', 
  'image/jpg', 
  'image/png', 
  'image/gif', 
  'image/webp',
  'image/svg+xml'  // SVG 추가
];
```

### 최대 파일 크기 변경

**서버**:
```properties
# 20MB로 변경
spring.servlet.multipart.max-file-size=20MB
file.upload.max-file-size=20971520
```

**클라이언트**:
```jsx
<ImageUpload
  maxSizeMB={20}  // 20MB
  // ...
/>
```

---

## ✅ 체크리스트

배포 전 확인사항:
- [ ] 업로드 디렉토리 경로 설정 확인
- [ ] 디렉토리 쓰기 권한 확인
- [ ] 파일 크기 제한 설정 확인
- [ ] 허용 파일 형식 설정 확인
- [ ] Security 설정에서 엔드포인트 허용 확인
- [ ] 업로드된 파일이 브라우저에서 접근 가능한지 확인
- [ ] 디스크 용량 충분한지 확인

---

## 🎉 완료!

이제 레시피 등록 시 이미지 파일을 직접 업로드할 수 있습니다!
- 드래그 앤 드롭으로 간편하게 업로드
- 썸네일 미리보기로 확인
- 년도/월일 별로 자동 정리되어 저장
