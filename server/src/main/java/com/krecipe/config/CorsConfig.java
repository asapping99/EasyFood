package com.krecipe.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * CORS(Cross-Origin Resource Sharing) 통합 설정
 * 모든 CORS 관련 설정을 이 클래스에서 중앙 관리합니다.
 */
@Configuration
public class CorsConfig {

    // application.properties에서 설정값 주입 (선택적)
    @Value("${cors.allowed-origins:http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://hobbygom.ddns.net:3000}")
    private String[] allowedOrigins;

    @Value("${cors.allowed-methods:GET,POST,PUT,DELETE,OPTIONS,PATCH,HEAD}")
    private String[] allowedMethods;

    @Value("${cors.max-age:3600}")
    private Long maxAge;

    /**
     * CORS 설정을 정의하고 반환합니다.
     * Spring Security와 일반 컨트롤러 모두에서 사용됩니다.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 허용할 Origin 설정
        // 로컬 개발 환경 + 외부 접근 DDNS 주소 모두 포함
        configuration.setAllowedOrigins(Arrays.asList(allowedOrigins));
        
        // 패턴 매칭 허용 (와일드카드 서브도메인 지원)
        // configuration.setAllowedOriginPatterns(Arrays.asList("http://*.ddns.net:*"));
        
        // 허용할 HTTP 메서드
        configuration.setAllowedMethods(Arrays.asList(allowedMethods));
        
        // 허용할 헤더 (모든 헤더 허용)
        configuration.setAllowedHeaders(Arrays.asList(
            "Origin",
            "X-Requested-With", 
            "Content-Type", 
            "Accept", 
            "Authorization",
            "Cache-Control",
            "Pragma",
            "X-CSRF-TOKEN"
        ));
        
        // 자격 증명(쿠키, Authorization 헤더 등) 허용
        configuration.setAllowCredentials(true);
        
        // 클라이언트에 노출할 응답 헤더
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization", 
            "Content-Type",
            "X-Total-Count"
        ));
        
        // Preflight 요청 캐시 시간 (초)
        configuration.setMaxAge(maxAge);

        // 모든 경로에 대해 위 설정 적용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }

    /**
     * 허용된 Origin인지 확인하는 헬퍼 메서드
     */
    public boolean isAllowedOrigin(String origin) {
        if (origin == null) {
            return false;
        }
        return Arrays.asList(allowedOrigins).contains(origin);
    }
}
