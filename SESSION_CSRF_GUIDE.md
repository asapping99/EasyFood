# 세션 및 CSRF 설정 가이드

## 📋 개요

이 프로젝트는 **세션 기반 인증**과 **CSRF 보호**를 사용합니다.

### 주요 특징
- ✅ **인메모리 세션 저장**: 서버 재시작 시 모든 세션 만료
- ✅ **세션 타임아웃 설정 가능**: 분 단위로 조절 가능 (기본 24시간)
- ✅ **CSRF 보호**: 운영 환경에서 자동 활성화
- ✅ **개발 편의성**: 로컬 개발 시 CSRF 무시

---

## 🔧 서버 설정

### 1. 세션 타임아웃 설정

`server/src/main/resources/application.properties` 파일에서 세션 타임아웃을 설정할 수 있습니다.

```properties
# 세션 유지 시간 (분 단위)
# 예시:
# - 30분: 30m
# - 1시간: 60m
# - 24시간: 1440m (기본값)
# - 7일: 10080m
server.servlet.session.timeout=1440m
```

### 2. 세션 쿠키 설정

```properties
# 세션 쿠키 이름
server.servlet.session.cookie.name=EASYFOOD_SESSION

# HTTP Only (JavaScript에서 접근 불가 - 보안 강화)
server.servlet.session.cookie.http-only=true

# Secure (HTTPS에서만 전송 - 운영 환경에서는 true 권장)
server.servlet.session.cookie.secure=false

# SameSite 정책 (CSRF 방어)
server.servlet.session.cookie.same-site=lax

# 쿠키 만료 시간 (초 단위)
server.servlet.session.cookie.max-age=86400
```

### 3. 환경별 프로파일 설정

#### 로컬 개발 환경 (application-local.properties)
```properties
# CSRF 비활성화 (개발 편의성)
security.csrf.enabled=false
```

#### 운영 환경 (application-prod.properties)
```properties
# CSRF 활성화 (보안 강화)
security.csrf.enabled=true

# HTTPS 사용 시 secure 쿠키 활성화
server.servlet.session.cookie.secure=true
```

### 4. 프로파일 활성화

**로컬 개발:**
```bash
# application.properties에서
spring.profiles.active=local
```

**운영 배포:**
```bash
# 실행 시 프로파일 지정
java -jar app.jar --spring.profiles.active=prod
```

---

## 💻 클라이언트 설정

### 1. 환경 변수 (.env)

**개발 환경 (.env):**
```env
# API URL
REACT_APP_API_URL=http://localhost:8085/api

# CSRF 비활성화 (개발 환경)
REACT_APP_ENABLE_CSRF=false
```

**운영 환경 (.env.production):**
```env
# API URL (실제 서버 주소로 변경)
REACT_APP_API_URL=http://hobbygom.ddns.net:8085/api

# CSRF 활성화 (운영 환경)
REACT_APP_ENABLE_CSRF=true
```

### 2. CSRF 토큰 자동 처리

클라이언트의 API 클라이언트는 자동으로 CSRF 토큰을 처리합니다:

- **개발 환경**: CSRF 토큰 무시
- **운영 환경**: 쿠키에서 CSRF 토큰을 자동으로 읽어 헤더에 추가

```javascript
// 자동으로 처리되므로 별도 코드 불필요
import { post } from '@/api/client';

// CSRF 토큰이 자동으로 포함됨
await post('/auth/login', { username, password });
```

---

## 🔐 세션 보안 모범 사례

### 1. 세션 타임아웃 권장 설정

| 서비스 유형 | 권장 타임아웃 | 설정값 |
|------------|-------------|--------|
| 일반 웹사이트 | 24시간 | `1440m` |
| 금융 서비스 | 15분 | `15m` |
| 관리자 패널 | 30분 | `30m` |
| 공용 컴퓨터 | 10분 | `10m` |

### 2. 운영 환경 체크리스트

- [ ] `security.csrf.enabled=true` 설정 확인
- [ ] `server.servlet.session.cookie.secure=true` 설정 (HTTPS 사용 시)
- [ ] `server.servlet.session.cookie.http-only=true` 설정
- [ ] `spring.profiles.active=prod` 설정
- [ ] HTTPS 인증서 설정 확인

### 3. 세션 만료 시나리오

| 상황 | 결과 |
|-----|------|
| 세션 타임아웃 도달 | 자동 로그아웃, 재로그인 필요 |
| 서버 재시작 | 모든 세션 만료 (인메모리) |
| 브라우저 종료 | 세션 쿠키 삭제 (설정에 따라) |
| 수동 로그아웃 | 세션 즉시 무효화 |

---

## 🧪 테스트 방법

### 1. 세션 타임아웃 테스트

```bash
# 1. 짧은 타임아웃으로 설정 (1분)
server.servlet.session.timeout=1m

# 2. 로그인 후 1분 대기
# 3. API 호출 시 401 Unauthorized 응답 확인
```

### 2. CSRF 테스트

**개발 환경 (CSRF 비활성화):**
```bash
# CSRF 토큰 없이 POST 요청 성공
curl -X POST http://localhost:8085/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```

**운영 환경 (CSRF 활성화):**
```bash
# 1. CSRF 토큰 받기
curl -X GET http://localhost:8085/api/auth/csrf -c cookies.txt

# 2. CSRF 토큰과 함께 POST 요청
curl -X POST http://localhost:8085/api/auth/login \
  -b cookies.txt \
  -H "Content-Type: application/json" \
  -H "X-XSRF-TOKEN: {토큰값}" \
  -d '{"username":"test","password":"test"}'
```

---

## 🚨 문제 해결

### 1. 세션이 유지되지 않는 경우

**원인:**
- 쿠키가 브라우저에 저장되지 않음
- CORS 설정 문제

**해결:**
```javascript
// API 클라이언트에서 credentials 설정 확인
fetch(url, {
  credentials: 'include',  // 쿠키 포함
  // ...
});
```

### 2. CSRF 토큰 오류 (403 Forbidden)

**원인:**
- CSRF 토큰이 헤더에 포함되지 않음
- 토큰이 만료됨

**해결:**
```javascript
// CSRF 토큰 갱신
import { refreshCsrfToken } from '@/api/client';
await refreshCsrfToken();
```

### 3. 서버 재시작 후 세션 만료

**정상 동작입니다!**
- 인메모리 세션 저장 방식의 특성
- 서버 재시작 시 모든 세션이 초기화됨
- 사용자는 재로그인 필요

**영구 세션이 필요한 경우:**
Redis나 DB에 세션을 저장하도록 변경 필요 (별도 구현)

---

## 📚 참고 자료

### Spring Security 세션 관리
- [Spring Boot Session Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#application-properties.server.server.servlet.session)
- [Spring Security CSRF Protection](https://docs.spring.io/spring-security/reference/features/exploits/csrf.html)

### 세션 저장소 옵션
- **인메모리**: 기본값, 서버 재시작 시 만료 ✅ 현재 사용 중
- **Redis**: 분산 환경, 고성능
- **JDBC**: DB 저장, 영구 보관

---

## 🎯 다음 단계

세션을 Redis나 DB에 저장하고 싶다면:

1. **Redis 설정** (권장)
```properties
spring.session.store-type=redis
spring.redis.host=localhost
spring.redis.port=6379
```

2. **JDBC 설정**
```properties
spring.session.store-type=jdbc
spring.session.jdbc.initialize-schema=always
```

**의존성 추가 필요:**
```gradle
// Redis
implementation 'org.springframework.session:spring-session-data-redis'
implementation 'org.springframework.boot:spring-boot-starter-data-redis'

// JDBC
implementation 'org.springframework.session:spring-session-jdbc'
```
