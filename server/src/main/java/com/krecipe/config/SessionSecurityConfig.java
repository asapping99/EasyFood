package com.krecipe.config;

import jakarta.servlet.SessionCookieConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 세션 보안 설정
 * - 인메모리 세션 저장 (서버 재시작 시 만료)
 * - 세션 쿠키 보안 설정
 */
@Configuration
public class SessionSecurityConfig {

    @Value("${server.servlet.session.cookie.name:EASYFOOD_SESSION}")
    private String cookieName;

    @Value("${server.servlet.session.cookie.http-only:true}")
    private boolean httpOnly;

    @Value("${server.servlet.session.cookie.secure:false}")
    private boolean secure;

    /**
     * 세션 쿠키 보안 설정
     * Spring Boot의 기본 설정을 프로그래밍 방식으로 강화
     */
    @Bean
    public ServletContextInitializer servletContextInitializer() {
        return servletContext -> {
            SessionCookieConfig sessionCookieConfig = servletContext.getSessionCookieConfig();
            
            // 쿠키 이름
            sessionCookieConfig.setName(cookieName);
            
            // HttpOnly (JavaScript에서 접근 불가 - XSS 방어)
            sessionCookieConfig.setHttpOnly(httpOnly);
            
            // Secure (HTTPS에서만 전송 - MITM 방어)
            sessionCookieConfig.setSecure(secure);
            
            // SameSite (CSRF 방어)
            // Lax: 대부분의 크로스 사이트 요청 차단, GET 네비게이션 허용
            // Strict: 모든 크로스 사이트 요청 차단 (더 엄격)
            // None: 크로스 사이트 요청 허용 (secure=true 필요)
            
            // 쿠키 경로
            sessionCookieConfig.setPath("/");
            
            System.out.println("========== 세션 쿠키 보안 설정 완료 ==========");
            System.out.println("Cookie Name: " + cookieName);
            System.out.println("HttpOnly: " + httpOnly);
            System.out.println("Secure: " + secure);
            System.out.println("==========================================");
        };
    }
}
