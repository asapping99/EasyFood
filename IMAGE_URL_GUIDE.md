# 이미지 URL 설정 가이드

## 📋 개요

이미지는 **서버 URL을 통해** 접근하도록 설정되어 있습니다.
개발/운영 환경에 관계없이 정상적으로 이미지를 조회할 수 있습니다.

---

## 🔧 환경별 URL 설정

### 개발 환경 (Local)

**서버 설정** (`application.properties`):
```properties
file.upload.base-url=http://localhost:8085
```

**업로드 후 반환되는 URL**:
```
http://localhost:8085/uploads/2025/1002/uuid.jpg
```

### 운영 환경 (Production)

**서버 설정** (`application-prod.properties`):
```properties
file.upload.base-url=http://hobbygom.ddns.net:8085
```

**업로드 후 반환되는 URL**:
```
http://hobbygom.ddns.net:8085/uploads/2025/1002/uuid.jpg
```

---

## 📊 동작 흐름

### 1. 이미지 업로드
```
클라이언트 (React)
    ↓ POST /api/files/upload/image (multipart/form-data)
서버 (Spring Boot)
    ↓ 파일 저장: H:/dev_project/EasyFood/storage/2025/1002/uuid.jpg
    ↓ 전체 URL 생성
    ↓ 응답: http://localhost:8085/uploads/2025/1002/uuid.jpg
클라이언트
    ↓ 받은 URL 그대로 저장 (formData.imageUrl)
```

### 2. 이미지 조회
```
클라이언트 (React)
    ↓ <img src="http://localhost:8085/uploads/2025/1002/uuid.jpg" />
브라우저
    ↓ GET http://localhost:8085/uploads/2025/1002/uuid.jpg
서버 (Spring Boot)
    ↓ WebConfig: /uploads/** → H:/dev_project/EasyFood/storage/
    ↓ 파일 서빙
브라우저
    ↓ 이미지 표시
```

---

## 🎯 장점

### ✅ 환경 독립성
- 개발/운영 환경 구분 없음
- 클라이언트에서 URL 조작 불필요
- 서버 설정만 변경하면 됨

### ✅ 간단한 구조
```javascript
// 클라이언트: 받은 URL 그대로 사용
<img src={recipe.imageUrl} />

// 서버에서 전체 URL 반환
{
  "fileUrl": "http://localhost:8085/uploads/2025/1002/uuid.jpg"
}
```

### ✅ 유지보수 용이
- URL 변경 시 서버 설정만 수정
- 클라이언트 코드 변경 불필요

---

## 🔧 서버 URL 변경하기

### 1. 개발 환경 변경

`application.properties`:
```properties
# 로컬 IP로 변경
file.upload.base-url=http://192.168.1.100:8085

# 또는 다른 포트
file.upload.base-url=http://localhost:9090
```

### 2. 운영 환경 변경

`application-prod.properties`:
```properties
# HTTPS 사용
file.upload.base-url=https://yourdomain.com

# 또는 서브도메인
file.upload.base-url=https://cdn.yourdomain.com

# 또는 다른 도메인
file.upload.base-url=http://hobbygom.ddns.net:8085
```

---

## 🖼️ 이미지 URL 예시

### 개발 환경
```
업로드: 2025년 10월 2일
파일명: test-image.jpg

저장 경로:
H:/dev_project/EasyFood/storage/2025/1002/550e8400-e29b-41d4-a716-446655440000.jpg

반환 URL:
http://localhost:8085/uploads/2025/1002/550e8400-e29b-41d4-a716-446655440000.jpg

브라우저 접근:
http://localhost:8085/uploads/2025/1002/550e8400-e29b-41d4-a716-446655440000.jpg ✅
```

### 운영 환경
```
업로드: 2025년 10월 2일
파일명: recipe-photo.jpg

저장 경로:
H:/dev_project/EasyFood/storage/2025/1002/660f9500-f39c-52e5-b827-557766551111.jpg

반환 URL:
http://hobbygom.ddns.net:8085/uploads/2025/1002/660f9500-f39c-52e5-b827-557766551111.jpg

브라우저 접근:
http://hobbygom.ddns.net:8085/uploads/2025/1002/660f9500-f39c-52e5-b827-557766551111.jpg ✅
```

---

## 🧪 테스트 방법

### 1. 개발 환경 테스트

**이미지 업로드**:
```bash
curl -X POST http://localhost:8085/api/files/upload/image \
  -F "file=@test-image.jpg"
```

**응답**:
```json
{
  "success": true,
  "fileUrl": "http://localhost:8085/uploads/2025/1002/uuid.jpg",
  "fileName": "test-image.jpg",
  "fileSize": 102400
}
```

**브라우저에서 확인**:
```
http://localhost:8085/uploads/2025/1002/uuid.jpg
```

### 2. 운영 환경 테스트

**프로파일 전환**:
```bash
java -jar app.jar --spring.profiles.active=prod
```

**이미지 업로드**:
```bash
curl -X POST http://hobbygom.ddns.net:8085/api/files/upload/image \
  -F "file=@test-image.jpg"
```

**응답**:
```json
{
  "success": true,
  "fileUrl": "http://hobbygom.ddns.net:8085/uploads/2025/1002/uuid.jpg",
  "fileName": "test-image.jpg",
  "fileSize": 102400
}
```

---

## 🔒 CDN 사용하기 (선택사항)

### CDN으로 전환하려면

**1. CDN 설정** (예: Cloudflare, AWS CloudFront):
```
원본 서버: http://hobbygom.ddns.net:8085
CDN URL: https://cdn.yourdomain.com
```

**2. 서버 설정 변경**:
```properties
# application-prod.properties
file.upload.base-url=https://cdn.yourdomain.com
```

**3. 업로드 결과**:
```json
{
  "fileUrl": "https://cdn.yourdomain.com/uploads/2025/1002/uuid.jpg"
}
```

### CDN 사용 장점
- ✅ 빠른 이미지 로딩
- ✅ 서버 부하 감소
- ✅ 글로벌 배포

---

## 🐛 문제 해결

### 이미지가 안 보이는 경우

**증상**: 업로드는 성공했는데 이미지가 안 보임

**원인 1**: base-url 설정 오류
```properties
# 잘못된 설정
file.upload.base-url=http://localhost:8085/

# 올바른 설정 (마지막 / 제거)
file.upload.base-url=http://localhost:8085
```

**원인 2**: 방화벽/포트 문제
```bash
# 포트 확인
netstat -an | grep 8085

# 방화벽 규칙 확인 (Windows)
netsh advfirewall firewall show rule name=all | findstr 8085
```

**원인 3**: WebConfig 경로 매핑 문제
```java
// WebConfig.java 확인
registry.addResourceHandler("/uploads/**")
        .addResourceLocations("file:" + uploadDir + "/");
```

### CORS 오류가 발생하는 경우

**증상**: 이미지 요청 시 CORS 오류

**해결**: CORS 설정에 uploads 경로 추가
```properties
# application.properties
cors.allowed-origins=http://localhost:3000,http://localhost:8085
```

---

## ✅ 설정 체크리스트

### 개발 환경
- [ ] `file.upload.base-url=http://localhost:8085`
- [ ] 서버 실행 포트 확인 (8085)
- [ ] storage 디렉토리 생성 확인
- [ ] 브라우저에서 직접 URL 접근 테스트

### 운영 환경
- [ ] `file.upload.base-url=http://hobbygom.ddns.net:8085` (또는 실제 도메인)
- [ ] 방화벽에서 8085 포트 허용
- [ ] DNS 설정 확인
- [ ] 외부에서 접근 테스트

---

## 📚 관련 파일

### 서버
- `application.properties` - 개발 환경 설정
- `application-prod.properties` - 운영 환경 설정
- `FileStorageService.java` - 전체 URL 생성 로직
- `WebConfig.java` - 정적 파일 서빙 설정

### 클라이언트
- `ImageUpload.jsx` - 이미지 업로드 컴포넌트
- `RecipeDetail.jsx` - 이미지 표시
- `RecipeForm.jsx` - 이미지 업로드 폼

---

## 🎯 핵심 요약

1. **서버에서 전체 URL 반환**
   - 개발: `http://localhost:8085/uploads/...`
   - 운영: `http://hobbygom.ddns.net:8085/uploads/...`

2. **클라이언트는 받은 URL 그대로 사용**
   - URL 조작 불필요
   - 환경별 로직 불필요

3. **환경 전환은 서버 설정만 변경**
   - `spring.profiles.active=local` 또는 `prod`
   - `file.upload.base-url` 값만 다르게 설정

4. **이미지 접근은 어디서나 동일**
   - `<img src={recipe.imageUrl} />`
   - 브라우저, Postman, curl 모두 동일하게 작동
