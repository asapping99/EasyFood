package com.krecipe.controller;

import com.krecipe.dto.LoginDto;
import com.krecipe.dto.RegisterDto;
import com.krecipe.dto.TokenResponse;
import com.krecipe.entity.User;
import com.krecipe.service.AuthService;
import com.krecipe.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto) {
        try {
            // 이메일 중복 확인
            if (authService.existsByEmail(registerDto.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "이미 등록된 이메일입니다."));
            }

            // 사용자명 중복 확인
            if (authService.existsByUsername(registerDto.getUsername())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "이미 사용중인 사용자명입니다."));
            }

            User user = authService.register(registerDto);
            String token = jwtUtil.generateToken(user.getUsername());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(TokenResponse.builder()
                            .token(token)
                            .type("Bearer")
                            .user(user)
                            .build());

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "회원가입 중 오류가 발생했습니다: " + e.getMessage()));
        }
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto) {
        try {
            User user = authService.login(loginDto.getUsername(), loginDto.getPassword());

            if (user != null) {
                String token = jwtUtil.generateToken(user.getUsername());

                return ResponseEntity.ok(TokenResponse.builder()
                        .token(token)
                        .type("Bearer")
                        .user(user)
                        .build());
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "아이디 또는 비밀번호가 올바르지 않습니다."));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "로그인 실패: " + e.getMessage()));
        }
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        // 클라이언트에서 토큰을 제거하도록 안내
        // 서버 측에서 토큰 블랙리스트 관리 가능
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
                        "user", user
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
                return ResponseEntity.ok(user);
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
}