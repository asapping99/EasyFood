package com.krecipe.config;

import com.krecipe.util.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
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

/**
 * Spring Security 설정
 * CORS는 CorsConfig에서 통합 관리
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CorsConfig corsConfig;

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
        http
                // CSRF 비활성화 (REST API이므로)
                .csrf(csrf -> csrf.disable())
                
                // CORS 설정 적용 (CorsConfig에서 정의한 설정 사용)
                .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()))
                
                // 세션 사용하지 않음 (JWT 사용)
                .sessionManagement(session -> 
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                
                // 요청별 인증 설정
                .authorizeHttpRequests(authz -> authz
                        // 완전히 공개된 엔드포인트 (인증 불필요)
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/recipes", "/api/recipes/**").permitAll()
                        .requestMatchers("/api/recipes/popular").permitAll()
                        .requestMatchers("/api/recipes/recent").permitAll()
                        .requestMatchers("/api/recipes/category/**").permitAll()
                        .requestMatchers("/error").permitAll()
                        .requestMatchers("/").permitAll()
                        
                        // OPTIONS 요청 허용 (CORS Preflight)
                        .requestMatchers("OPTIONS", "/**").permitAll()
                        
                        // 기타 모든 요청은 인증 필요
                        .anyRequest().authenticated()
                )
                
                // JWT 필터 추가
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
