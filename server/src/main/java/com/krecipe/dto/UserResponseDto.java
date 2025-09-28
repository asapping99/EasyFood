package com.krecipe.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {
    private Long id;
    private String username;
    private String email;
    private String nickname;
    private String profileImageUrl;
    private String bio;
    private String role;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginAt;
}
