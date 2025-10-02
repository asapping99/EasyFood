package com.krecipe.config;

import com.krecipe.util.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

/**
 * Spring Security 설정
 * - 세션 기반 인증 (서버 재시작 시 만료되는 인메모리 방식)
 * - CSRF 보호 활성화 (개발 환경에서는 비활성화)
 * - CORS는 CorsConfig에서 통합 관리
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CorsConfig corsConfig;
    
    @Value("${security.csrf.enabled:true}")
    private boolean csrfEnabled;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // CORS 설정 적용 (CorsConfig에서 정의한 설정 사용)
        http.cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()));
        
        // CSRF 설정
        if (csrfEnabled) {
            // 운영 환경: CSRF 활성화
            CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
            requestHandler.setCsrfRequestAttributeName("_csrf");
            
            http.csrf(csrf -> csrf
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .csrfTokenRequestHandler(requestHandler)
                // API 엔드포인트는 CSRF 토큰 검증
                .ignoringRequestMatchers("/api/auth/login", "/api/auth/register")
            );
        } else {
            // 개발 환경: CSRF 비활성화
            http.csrf(csrf -> csrf.disable());
        }
        
        // 세션 관리 설정
        http.sessionManagement(session -> session
            // 세션 사용 (기본 정책)
            .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            // 동시 세션 제어
            .maximumSessions(1)
            .maxSessionsPreventsLogin(false)  // 새 로그인 시 기존 세션 만료
        );
        
        // 요청별 인증 설정
        http.authorizeHttpRequests(authz -> authz
                // 완전히 공개된 엔드포인트 (인증 불필요)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/auth/csrf").permitAll()
                .requestMatchers("/api/recipes", "/api/recipes/**").permitAll()
                .requestMatchers("/api/recipes/popular").permitAll()
                .requestMatchers("/api/recipes/recent").permitAll()
                .requestMatchers("/api/recipes/category/**").permitAll()
                .requestMatchers("/api/files/upload/**").permitAll()  // 파일 업로드
                .requestMatchers("/uploads/**").permitAll()  // 업로드된 파일 접근
                .requestMatchers("/error").permitAll()
                .requestMatchers("/").permitAll()
                
                // OPTIONS 요청 허용 (CORS Preflight)
                .requestMatchers("OPTIONS", "/**").permitAll()
                
                // 기타 모든 요청은 인증 필요
                .anyRequest().authenticated()
        );
        
        // JWT 필터 추가 (JWT와 세션 병행 사용)
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
