package com.krecipe.config;

import com.krecipe.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 파일 저장소 초기화 설정
 */
@Configuration
@RequiredArgsConstructor
public class FileStorageConfig {

    private final FileStorageService fileStorageService;

    /**
     * 애플리케이션 시작 시 업로드 디렉토리 초기화
     */
    @Bean
    CommandLineRunner initFileStorage() {
        return args -> {
            fileStorageService.initializeUploadDirectory();
        };
    }
}
