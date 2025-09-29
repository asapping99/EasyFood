package com.krecipe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class KRecipeApplication {
    public static void main(String[] args) {
        SpringApplication.run(KRecipeApplication.class, args);
        System.out.println("=====================================");
        System.out.println("   K-Recipe Server Started!");
        System.out.println("   http://localhost:8080");
        System.out.println("   Package: com.krecipe");
        System.out.println("=====================================");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")
                        .allowedOrigins("http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://hobbygom.ddns.net:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}
