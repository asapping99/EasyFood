package com.krecipe.controller;

import com.krecipe.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

/**
 * 파일 업로드 컨트롤러
 */
@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileStorageService fileStorageService;

    /**
     * 이미지 파일 업로드
     * 
     * @param file 업로드할 이미지 파일
     * @return 업로드된 파일의 URL
     */
    @PostMapping("/upload/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // 파일 저장
            String fileUrl = fileStorageService.storeFile(file);

            // 응답 데이터 구성
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("fileUrl", fileUrl);
            response.put("fileName", file.getOriginalFilename());
            response.put("fileSize", file.getSize());
            response.put("message", "이미지가 성공적으로 업로드되었습니다.");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    /**
     * 파일 삭제
     * 
     * @param fileUrl 삭제할 파일의 URL
     * @return 삭제 성공 여부
     */
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFile(@RequestParam("fileUrl") String fileUrl) {
        try {
            boolean deleted = fileStorageService.deleteFile(fileUrl);

            Map<String, Object> response = new HashMap<>();
            response.put("success", deleted);
            response.put("message", deleted ? "파일이 삭제되었습니다." : "파일을 찾을 수 없습니다.");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
