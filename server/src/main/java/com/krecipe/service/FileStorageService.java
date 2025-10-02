package com.krecipe.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * 파일 저장 스토리지 서비스
 * - 파일을 로컬 디렉토리에 저장
 * - 년도/월일 별로 디렉토리 구분
 * - 파일명 중복 방지 (UUID 사용)
 */
@Service
public class FileStorageService {

    @Value("${file.upload.dir}")
    private String uploadDir;

    @Value("${file.upload.url-path}")
    private String urlPath;

    @Value("${file.upload.base-url}")
    private String baseUrl;

    @Value("${file.upload.allowed-extensions}")
    private String allowedExtensions;

    @Value("${file.upload.max-file-size}")
    private Long maxFileSize;

    /**
     * 파일 저장
     * 
     * @param file 업로드할 파일
     * @return 저장된 파일의 URL 경로
     * @throws IOException 파일 저장 실패 시
     */
    public String storeFile(MultipartFile file) throws IOException {
        // 파일 유효성 검증
        validateFile(file);

        // 파일명 생성 (UUID + 원본 확장자)
        String originalFilename = file.getOriginalFilename();
        String fileExtension = getFileExtension(originalFilename);
        String newFilename = UUID.randomUUID().toString() + "." + fileExtension;

        // 저장 경로 생성 (년도/월일)
        String datePath = generateDatePath();
        Path uploadPath = Paths.get(uploadDir, datePath);

        // 디렉토리가 없으면 생성
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 파일 저장
        Path targetLocation = uploadPath.resolve(newFilename);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // 전체 URL 반환 (예: http://localhost:8085/uploads/2025/1002/uuid.jpg)
        return baseUrl + urlPath + "/" + datePath + "/" + newFilename;
    }

    /**
     * 파일 삭제
     * 
     * @param fileUrl 삭제할 파일의 URL (전체 URL 또는 상대 경로)
     * @return 삭제 성공 여부
     */
    public boolean deleteFile(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return false;
        }

        try {
            // 전체 URL에서 baseUrl을 제거 (http://localhost:8085/uploads/... -> /uploads/...)
            String relativePath = fileUrl;
            if (fileUrl.startsWith(baseUrl)) {
                relativePath = fileUrl.substring(baseUrl.length());
            }
            
            // URL 경로를 실제 파일 시스템 경로로 변환
            relativePath = relativePath.replace(urlPath + "/", "");
            Path filePath = Paths.get(uploadDir, relativePath);

            // 파일 존재 확인 후 삭제
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                return true;
            }
        } catch (IOException e) {
            System.err.println("파일 삭제 실패: " + fileUrl);
            e.printStackTrace();
        }

        return false;
    }

    /**
     * 파일 유효성 검증
     * 
     * @param file 검증할 파일
     * @throws IOException 유효하지 않은 파일인 경우
     */
    private void validateFile(MultipartFile file) throws IOException {
        // 파일이 비어있는지 확인
        if (file.isEmpty()) {
            throw new IOException("빈 파일은 업로드할 수 없습니다.");
        }

        // 파일 크기 확인
        if (file.getSize() > maxFileSize) {
            throw new IOException("파일 크기가 최대 허용 크기(" + (maxFileSize / 1024 / 1024) + "MB)를 초과했습니다.");
        }

        // 파일 확장자 확인
        String filename = file.getOriginalFilename();
        String extension = getFileExtension(filename);
        
        List<String> allowedExtensionList = Arrays.asList(allowedExtensions.split(","));
        if (!allowedExtensionList.contains(extension.toLowerCase())) {
            throw new IOException("허용되지 않는 파일 형식입니다. 허용 형식: " + allowedExtensions);
        }
    }

    /**
     * 파일 확장자 추출
     * 
     * @param filename 파일명
     * @return 확장자 (소문자)
     */
    private String getFileExtension(String filename) {
        if (filename == null || filename.isEmpty()) {
            return "";
        }

        int lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex == -1) {
            return "";
        }

        return filename.substring(lastDotIndex + 1).toLowerCase();
    }

    /**
     * 날짜 기반 경로 생성 (년도/월일)
     * 예: 2025/1002
     * 
     * @return 날짜 경로
     */
    private String generateDatePath() {
        LocalDate now = LocalDate.now();
        String year = String.valueOf(now.getYear());
        String monthDay = now.format(DateTimeFormatter.ofPattern("MMdd"));
        return year + "/" + monthDay;
    }

    /**
     * 업로드 디렉토리 초기화
     * 애플리케이션 시작 시 업로드 디렉토리 생성
     */
    public void initializeUploadDirectory() {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                System.out.println("업로드 디렉토리 생성: " + uploadPath.toAbsolutePath());
            }
        } catch (IOException e) {
            System.err.println("업로드 디렉토리 생성 실패: " + uploadDir);
            e.printStackTrace();
        }
    }
}
