package com.krecipe.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.validation.constraints.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeDto {

    @NotBlank(message = "레시피 제목은 필수입니다.")
    @Size(min = 2, max = 200, message = "제목은 2자 이상 200자 이하여야 합니다.")
    private String title;

    @Size(max = 1000, message = "설명은 1000자를 초과할 수 없습니다.")
    private String description;

    @NotBlank(message = "카테고리는 필수입니다.")
    @Pattern(regexp = "한식|중식|일식|양식|디저트|음료|기타", message = "올바른 카테고리를 선택해주세요.")
    private String category;

    @NotNull(message = "조리 시간은 필수입니다.")