package com.krecipe.dto;

import com.krecipe.entity.Recipe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeResponseDto {
    
    private Long id;
    private String title;
    private String description;
    private String category;
    private Integer cookingTime;
    private Integer servings;
    private String difficulty;
    private String imageUrl;
    private List<String> ingredients;
    private List<String> steps;
    private List<String> tags;
    
    // 작성자 정보 (간소화)
    private Long authorId;
    private String authorUsername;
    private String authorNickname;
    private String authorProfileImageUrl;
    
    private Integer viewCount;
    private Integer likeCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Entity -> DTO 변환 메서드
    public static RecipeResponseDto fromEntity(Recipe recipe) {
        if (recipe == null) {
            return null;
        }
        
        return RecipeResponseDto.builder()
                .id(recipe.getId())
                .title(recipe.getTitle())
                .description(recipe.getDescription())
                .category(recipe.getCategory())
                .cookingTime(recipe.getCookingTime())
                .servings(recipe.getServings())
                .difficulty(recipe.getDifficulty())
                .imageUrl(recipe.getImageUrl())
                .ingredients(recipe.getIngredients() != null ? recipe.getIngredients() : new ArrayList<>())
                .steps(recipe.getSteps() != null ? recipe.getSteps() : new ArrayList<>())
                .tags(recipe.getTags() != null ? recipe.getTags() : new ArrayList<>())
                .authorId(recipe.getAuthor() != null ? recipe.getAuthor().getId() : null)
                .authorUsername(recipe.getAuthor() != null ? recipe.getAuthor().getUsername() : "unknown")
                .authorNickname(recipe.getAuthor() != null ? recipe.getAuthor().getNickname() : null)
                .authorProfileImageUrl(recipe.getAuthor() != null ? recipe.getAuthor().getProfileImageUrl() : null)
                .viewCount(recipe.getViewCount() != null ? recipe.getViewCount() : 0)
                .likeCount(recipe.getLikeCount() != null ? recipe.getLikeCount() : 0)
                .createdAt(recipe.getCreatedAt())
                .updatedAt(recipe.getUpdatedAt())
                .build();
    }
}
