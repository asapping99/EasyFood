# 세션 관리 보안 가이드

## 📋 현재 구현 방식

### ✅ Spring Boot 기본 세션 관리 (권장)

**선택 이유:**
1. ✅ **간단하고 안전**: Spring Boot 내장 기능 사용
2. ✅ **의존성 최소화**: 추가 라이브러리 불필요
3. ✅ **요구사항 충족**: 서버 재시작 시 세션 만료
4. ✅ **충분한 보안**: 웹 서비스 보안 기준 충족

---

## 🔐 보안 기능

### 1. HttpOnly Cookie
```properties
server.servlet.session.cookie.http-only=true
```

**보호 대상**: XSS (Cross-Site Scripting) 공격

**작동 방식**:
- JavaScript에서 쿠키 접근 차단
- `document.cookie`로 세션 쿠키 읽기 불가

**효과**:
```javascript
// 공격자가 이런 코드를 주입해도 세션 쿠키를 탈취할 수 없음
console.log(document.cookie); // EASYFOOD_SESSION이 보이지 않음
```

### 2. Secure Cookie (HTTPS 전용)
```properties
# 개발 환경
server.servlet.session.cookie.secure=false

# 운영 환경
server.servlet.session.cookie.secure=true
```

**보호 대상**: MITM (Man-in-the-Middle) 공격

**작동 방식**:
- HTTPS 연결에서만 쿠키 전송
- HTTP에서는 세션 쿠키 전송 차단

**주의사항**:
- 개발 환경: `false` (localhost는 HTTP)
- 운영 환경: `true` (반드시 HTTPS 사용)

### 3. SameSite 정책
```properties
# 개발 환경
server.servlet.session.cookie.same-site=lax

# 운영 환경
server.servlet.session.cookie.same-site=strict
```

**보호 대상**: CSRF (Cross-Site Request Forgery) 공격

**옵션 비교**:

| 값 | 보안 수준 | 설명 | 사용 시기 |
|----|----------|------|----------|
| `Strict` | 가장 높음 | 모든 크로스 사이트 요청 차단 | 운영 환경 |
| `Lax` | 중간 | GET 네비게이션 허용, POST 차단 | 개발 환경 |
| `None` | 낮음 | 크로스 사이트 허용 (secure 필수) | 사용 권장 안 함 |

**예시**:
```
Strict 모드:
- example.com → mysite.com (링크 클릭) ❌ 세션 쿠키 전송 안 함
- mysite.com → mysite.com ✅ 세션 쿠키 전송

Lax 모드:
- example.com → mysite.com (링크 클릭) ✅ 세션 쿠키 전송 (GET)
- example.com의 폼 → mysite.com (POST) ❌ 세션 쿠키 전송 안 함
```

### 4. CSRF 토큰
```java
// SecurityConfig.java
http.csrf(csrf -> csrf
    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
);
```

**보호 대상**: CSRF 공격 이중 방어

**작동 방식**:
- SameSite 정책으로 1차 방어
- CSRF 토큰으로 2차 방어

### 5. 세션 고정 공격 방어
```java
// Spring Security 기본 활성화
http.sessionManagement(session -> session
    .sessionFixation().changeSessionId() // 로그인 시 세션 ID 변경
);
```

**보호 대상**: Session Fixation 공격

---

## 🆚 다른 방식과 비교

### Option 1: Spring Boot 기본 세션 (✅ 현재 선택)

**장점**:
- ✅ 설정 간단
- ✅ 의존성 없음
- ✅ 충분한 보안
- ✅ 메모리 효율적
- ✅ 서버 재시작 시 자동 만료

**단점**:
- ❌ 단일 서버만 지원 (로드밸런싱 제약)
- ❌ 서버 재시작 시 모든 세션 손실

**적합한 경우**:
- ✅ 단일 서버 운영
- ✅ 서버 재시작 빈도 낮음
- ✅ 세션 영구 보존 불필요

### Option 2: Spring Session + Redis

**설정 예시**:
```properties
spring.session.store-type=redis
spring.redis.host=localhost
spring.redis.port=6379
```

**장점**:
- ✅ 분산 환경 지원
- ✅ 서버 재시작 후에도 세션 유지
- ✅ 세션 공유 (다중 서버)
- ✅ 고성능

**단점**:
- ❌ Redis 서버 필요 (추가 인프라)
- ❌ 의존성 추가
- ❌ 관리 복잡도 증가

**적합한 경우**:
- ✅ 다중 서버 환경 (로드밸런싱)
- ✅ 세션 영구 보존 필요
- ✅ 높은 가용성 요구

### Option 3: Spring Session + JDBC

**설정 예시**:
```properties
spring.session.store-type=jdbc
spring.session.jdbc.initialize-schema=always
```

**장점**:
- ✅ 분산 환경 지원
- ✅ 서버 재시작 후에도 세션 유지
- ✅ Redis 불필요 (DB 재사용)

**단점**:
- ❌ 성능 낮음 (DB I/O)
- ❌ DB 부하 증가
- ❌ 의존성 추가

**적합한 경우**:
- ✅ Redis 사용 불가
- ✅ 세션 영구 보존 필요
- ✅ DB 부하 감당 가능

---

## 🚀 환경별 설정

### 개발 환경 (Local)

`application-local.properties`:
```properties
# CSRF 비활성화 (개발 편의성)
security.csrf.enabled=false

# HTTP 허용
server.servlet.session.cookie.secure=false

# SameSite Lax (유연한 테스트)
server.servlet.session.cookie.same-site=lax
```

**이유**:
- Postman/curl 테스트 편의성
- localhost는 HTTP 사용
- 크로스 오리진 테스트 가능

### 운영 환경 (Production)

`application-prod.properties`:
```properties
# CSRF 활성화 (보안)
security.csrf.enabled=true

# HTTPS 전용
server.servlet.session.cookie.secure=true

# SameSite Strict (최고 보안)
server.servlet.session.cookie.same-site=strict

# 짧은 세션 타임아웃 (선택사항)
server.servlet.session.timeout=30m
```

**이유**:
- 최고 수준 보안
- HTTPS 필수
- CSRF 이중 방어
- 세션 하이재킹 최소화

---

## 🛡️ 보안 체크리스트

### 배포 전 필수 확인

- [ ] `server.servlet.session.cookie.http-only=true`
- [ ] `server.servlet.session.cookie.secure=true` (HTTPS 사용 시)
- [ ] `server.servlet.session.cookie.same-site=strict`
- [ ] `security.csrf.enabled=true`
- [ ] HTTPS 인증서 설정
- [ ] 세션 타임아웃 적절히 설정
- [ ] 로그인 시 세션 ID 재생성 확인

### 추가 보안 권장사항

1. **세션 타임아웃 설정**
```properties
# 민감한 서비스: 15-30분
server.servlet.session.timeout=30m

# 일반 서비스: 1-24시간
server.servlet.session.timeout=1440m
```

2. **동시 세션 제한**
```java
http.sessionManagement(session -> session
    .maximumSessions(1) // 사용자당 1개 세션만 허용
    .maxSessionsPreventsLogin(false) // 새 로그인 시 기존 세션 만료
);
```

3. **세션 ID 길이 증가** (선택사항)
```properties
server.servlet.session.tracking-modes=cookie
```

4. **로깅 및 모니터링**
```java
@EventListener
public void onAuthenticationSuccess(AuthenticationSuccessEvent event) {
    // 로그인 성공 로그
    log.info("User logged in: {}", event.getAuthentication().getName());
}

@EventListener
public void onSessionDestroyed(HttpSessionDestroyedEvent event) {
    // 세션 만료 로그
    log.info("Session destroyed: {}", event.getId());
}
```

---

## 🎯 언제 Redis로 전환해야 하나?

### Redis 전환을 고려해야 하는 경우

1. **다중 서버 환경**
   - 로드밸런서 사용
   - 서버 2대 이상

2. **높은 가용성 요구**
   - 서버 재시작 중에도 서비스 유지
   - 무중단 배포 필요

3. **세션 영구 보존**
   - 서버 장애 시에도 세션 유지
   - 장시간 로그인 상태 유지

### Redis 전환 방법

1. **의존성 추가** (`build.gradle`):
```gradle
implementation 'org.springframework.boot:spring-boot-starter-data-redis'
implementation 'org.springframework.session:spring-session-data-redis'
```

2. **설정 변경** (`application.properties`):
```properties
spring.session.store-type=redis
spring.redis.host=localhost
spring.redis.port=6379
spring.redis.password=your-redis-password
```

3. **Redis 서버 설치**:
```bash
# Docker 사용
docker run -d -p 6379:6379 redis:latest

# 또는 직접 설치
# Windows: https://github.com/microsoftarchive/redis/releases
# Linux: sudo apt-get install redis-server
```

---

## 📊 보안 수준 비교

| 기능 | 현재 구현 | Redis 세션 | 차이점 |
|------|----------|-----------|--------|
| XSS 방어 | ✅ HttpOnly | ✅ HttpOnly | 동일 |
| MITM 방어 | ✅ Secure | ✅ Secure | 동일 |
| CSRF 방어 | ✅ SameSite + Token | ✅ SameSite + Token | 동일 |
| Session Fixation | ✅ 방어됨 | ✅ 방어됨 | 동일 |
| 다중 서버 | ❌ 불가 | ✅ 가능 | Redis 우위 |
| 영구 보존 | ❌ 불가 | ✅ 가능 | Redis 우위 |
| 설정 복잡도 | ✅ 낮음 | ⚠️ 중간 | 현재 우위 |
| 인프라 비용 | ✅ 낮음 | ⚠️ 높음 | 현재 우위 |

---

## 🧪 보안 테스트

### 1. HttpOnly 테스트
```javascript
// 브라우저 콘솔에서 실행
console.log(document.cookie);
// EASYFOOD_SESSION이 보이지 않으면 성공
```

### 2. Secure 테스트
```bash
# HTTP로 접근 시 세션 쿠키 없음
curl -i http://localhost:8085/api/auth/login

# HTTPS로 접근 시 세션 쿠키 있음
curl -i https://yourdomain.com/api/auth/login
```

### 3. SameSite 테스트
```html
<!-- 외부 사이트에서 폼 제출 -->
<form action="http://localhost:8085/api/some-action" method="POST">
  <button>공격</button>
</form>
<!-- Strict/Lax 모드에서 세션 쿠키가 전송되지 않아 실패 -->
```

### 4. CSRF 테스트
```bash
# CSRF 토큰 없이 POST 요청
curl -X POST http://localhost:8085/api/recipes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'
# 403 Forbidden (운영 환경에서)
```

---

## ✅ 결론

### 현재 구현이 안전한 이유

1. ✅ **업계 표준 보안 기능 모두 적용**
   - HttpOnly, Secure, SameSite, CSRF

2. ✅ **Spring Security 내장 방어**
   - Session Fixation 방어
   - 세션 ID 재생성

3. ✅ **요구사항 완벽 충족**
   - 서버 재시작 시 만료
   - 세션 타임아웃 설정 가능
   - CSRF 보호

4. ✅ **간단하고 유지보수 용이**
   - 추가 인프라 불필요
   - 설정 최소화

### 권장사항

**현재 단일 서버 환경**:
- ✅ 현재 방식 유지 (충분히 안전)

**향후 다중 서버 환경**:
- ✅ Redis로 전환 고려
- ✅ 세션 공유 및 고가용성 확보

**보안 강화가 더 필요한 경우**:
- ✅ 세션 타임아웃 단축
- ✅ 동시 세션 제한
- ✅ IP 기반 세션 검증 추가
