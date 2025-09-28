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
    @Min(value = 1, message = "조리 시간은 1분 이상이어야 합니다.")
    @Max(value = 1440, message = "조리 시간은 1440분(24시간)을 초과할 수 없습니다.")
    private Integer cookingTime;

    @NotNull(message = "인분은 필수입니다.")
    @Min(value = 1, message = "인분은 1인분 이상이어야 합니다.")
    @Max(value = 20, message = "인분은 20인분을 초과할 수 없습니다.")
    private Integer servings;

    @NotBlank(message = "난이도는 필수입니다.")
    @Pattern(regexp = "초급|중급|고급", message = "난이도는 초급, 중급, 고급 중 하나여야 합니다.")
    private String difficulty;

    @Size(max = 500, message = "이미지 URL은 500자를 초과할 수 없습니다.")
    private String imageUrl;

    @NotEmpty(message = "재료는 최소 1개 이상 입력해주세요.")
    @Size(min = 1, max = 50, message = "재료는 1개 이상 50개 이하로 입력해주세요.")
    private List<@NotBlank(message = "재료는 빈 값일 수 없습니다.") @Size(max = 200, message = "재료는 200자를 초과할 수 없습니다.") String> ingredients;

    @NotEmpty(message = "조리 순서는 최소 1단계 이상 입력해주세요.")
    @Size(min = 1, max = 20, message = "조리 순서는 1단계 이상 20단계 이하로 입력해주세요.")
    private List<@NotBlank(message = "조리 순서는 빈 값일 수 없습니다.") @Size(max = 1000, message = "조리 순서는 1000자를 초과할 수 없습니다.") String> steps;

    @Size(max = 10, message = "태그는 10개를 초과할 수 없습니다.")
    private List<@Size(max = 50, message = "태그는 50자를 초과할 수 없습니다.") String> tags;
}
