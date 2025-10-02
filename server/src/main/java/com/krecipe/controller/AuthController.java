package com.krecipe.controller;

import com.krecipe.dto.LoginDto;
import com.krecipe.dto.RegisterDto;
import com.krecipe.dto.TokenResponse;
import com.krecipe.dto.UserDto;
import com.krecipe.entity.User;
import com.krecipe.service.AuthService;
import com.krecipe.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    private final JwtUtil jwtUtil;
    
    // User를 UserDto로 변환하는 헬퍼 메서드
    private UserDto convertToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImageUrl(user.getProfileImageUrl())
                .bio(user.getBio())
                .role(user.getRole())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .lastLoginAt(user.getLastLoginAt())
                .build();
    }
    
    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto) {
        System.out.println("========== 회원가입 요청 수신 ==========");
        System.out.println("Username: " + registerDto.getUsername());
        System.out.println("Email: " + registerDto.getEmail());
        System.out.println("Nickname: " + registerDto.getNickname());
        
        try {
            // 이메일 중복 확인
            if (authService.existsByEmail(registerDto.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "이미 등록된 이메일입니다."));
            }
            
            // 사용자명 중복 확인
            if (authService.existsByUsername(registerDto.getUsername())) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "이미 사용중인 계정명입니다."));
            }
            
            User user = authService.register(registerDto);
            String token = jwtUtil.generateToken(user.getUsername());
            
            System.out.println("회원가입 성공: " + user.getUsername());
            
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(TokenResponse.builder()
                    .token(token)
                    .type("Bearer")
                    .user(convertToDto(user))  // DTO로 변환
                    .build());
                    
        } catch (Exception e) {
            System.err.println("회원가입 오류: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(Map.of("error", "회원가입 중 오류가 발생했습니다: " + e.getMessage()));
        }
    }
    
    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto) {
        System.out.println("========== 로그인 요청 수신 ==========");
        System.out.println("Username: " + loginDto.getUsername());
        
        try {
            User user = authService.login(loginDto.getUsername(), loginDto.getPassword());
            
            if (user != null) {
                String token = jwtUtil.generateToken(user.getUsername());
                
                System.out.println("로그인 성공: " + user.getUsername());
                
                return ResponseEntity.ok(TokenResponse.builder()
                    .token(token)
                    .type("Bearer")
                    .user(convertToDto(user))  // DTO로 변환
                    .build());
            }
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "계정명 또는 비밀번호가 올바르지 않습니다."));
                
        } catch (Exception e) {
            System.err.println("로그인 오류: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "로그인 실패: " + e.getMessage()));
        }
    }
    
    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(Map.of("message", "로그아웃되었습니다."));
    }
    
    // 토큰 검증
    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String token) {
        try {
            String actualToken = token.replace("Bearer ", "");
            if (jwtUtil.validateToken(actualToken)) {
                String username = jwtUtil.getUsernameFromToken(actualToken);
                User user = authService.findByUsername(username);
                
                return ResponseEntity.ok(Map.of(
                    "valid", true,
                    "user", convertToDto(user)  // DTO로 변환
                ));
            }
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("valid", false));
                
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("valid", false, "error", e.getMessage()));
        }
    }
    
    // 사용자 정보 조회
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            String actualToken = token.replace("Bearer ", "");
            String username = jwtUtil.getUsernameFromToken(actualToken);
            User user = authService.findByUsername(username);
            
            if (user != null) {
                return ResponseEntity.ok(convertToDto(user));  // DTO로 변환
            }
            
            return ResponseEntity.notFound().build();
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "인증 실패: " + e.getMessage()));
        }
    }
    
    // 비밀번호 변경
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, String> passwords) {
        
        try {
            String actualToken = token.replace("Bearer ", "");
            String username = jwtUtil.getUsernameFromToken(actualToken);
            
            boolean changed = authService.changePassword(
                username,
                passwords.get("currentPassword"),
                passwords.get("newPassword")
            );
            
            if (changed) {
                return ResponseEntity.ok(Map.of("message", "비밀번호가 변경되었습니다."));
            }
            
            return ResponseEntity.badRequest()
                .body(Map.of("error", "현재 비밀번호가 올바르지 않습니다."));
                
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "비밀번호 변경 실패: " + e.getMessage()));
        }
    }
    
    // 이메일 중복 확인
    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        boolean exists = authService.existsByEmail(email);
        return ResponseEntity.ok(Map.of("exists", exists));
    }
    
    // 사용자명 중복 확인
    @GetMapping("/check-username")
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        boolean exists = authService.existsByUsername(username);
        return ResponseEntity.ok(Map.of("exists", exists));
    }
    
    // CSRF 토큰 발급 (클라이언트가 CSRF 토큰을 받을 수 있도록)
    @GetMapping("/csrf")
    public ResponseEntity<?> getCsrfToken() {
        // CSRF 토큰은 Spring Security가 자동으로 쿠키에 설정
        // 이 엔드포인트는 클라이언트가 토큰을 받기 위해 호출
        return ResponseEntity.ok(Map.of("message", "CSRF token issued"));
    }
}
