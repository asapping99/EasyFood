package com.krecipe.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenResponse {
    private String token;
    private String type;
    private UserDto user;  // User 대신 UserDto 사용
    private Long expiresIn;
}
