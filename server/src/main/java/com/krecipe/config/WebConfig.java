package com.krecipe.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

/**
 * Web MVC 설정
 * - 정적 리소스 핸들링
 * - 업로드된 파일 서빙
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload.dir}")
    private String uploadDir;

    @Value("${file.upload.url-path}")
    private String urlPath;

    /**
     * 정적 리소스 핸들러 등록
     * 업로드된 파일을 웹에서 접근 가능하도록 설정
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 업로드 디렉토리를 정적 리소스로 서빙
        // 예: /uploads/** 요청을 실제 파일 시스템 경로로 매핑
        String uploadPath = Paths.get(uploadDir).toUri().toString();
        
        registry.addResourceHandler(urlPath + "/**")
                .addResourceLocations(uploadPath);
        
        System.out.println("정적 리소스 핸들러 등록: " + urlPath + " -> " + uploadPath);
    }
}
