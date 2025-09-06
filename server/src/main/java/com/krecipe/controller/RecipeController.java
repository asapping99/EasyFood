package com.krecipe.controller;

import com.krecipe.dto.RecipeDto;
import com.krecipe.entity.Recipe;
import com.krecipe.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {

    private final RecipeService recipeService;

    // 레시피 목록 조회 (페이징, 검색, 필터링)
    @GetMapping
    public ResponseEntity<Page<Recipe>> getRecipes(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String sortBy,
            Pageable pageable) {

        Page<Recipe> recipes = recipeService.getRecipes(search, category, difficulty, sortBy, pageable);
        return ResponseEntity.ok(recipes);
    }

    // 레시피 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipe(@PathVariable Long id) {
        Recipe recipe = recipeService.getRecipeById(id);
        if (recipe != null) {
            // 조회수 증가
            recipeService.incrementViewCount(id);
            return ResponseEntity.ok(recipe);
        }
        return ResponseEntity.notFound().build();
    }

    // 레시피 등록
    @PostMapping
    public ResponseEntity<Recipe> createRecipe(
            @Valid @RequestBody RecipeDto recipeDto,
            @RequestHeader("Authorization") String token) {

        try {
            Recipe recipe = recipeService.createRecipe(recipeDto, token);
            return ResponseEntity.status(HttpStatus.CREATED).body(recipe);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 레시피 수정
    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(
            @PathVariable Long id,
            @Valid @RequestBody RecipeDto recipeDto,
            @RequestHeader("Authorization") String token) {

        try {
            Recipe recipe = recipeService.updateRecipe(id, recipeDto, token);
            if (recipe != null) {
                return ResponseEntity.ok(recipe);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 레시피 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteRecipe(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {

        try {
            boolean deleted = recipeService.deleteRecipe(id, token);
            if (deleted) {
                return ResponseEntity.ok(Map.of("message", "레시피가 삭제되었습니다."));
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // 레시피 좋아요
    @PostMapping("/{id}/like")
    public ResponseEntity<Map<String, Object>> likeRecipe(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {

        try {
            int likeCount = recipeService.toggleLike(id, token);
            return ResponseEntity.ok(Map.of(
                    "liked", true,
                    "likeCount", likeCount
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // 인기 레시피 조회
    @GetMapping("/popular")
    public ResponseEntity<Page<Recipe>> getPopularRecipes(Pageable pageable) {
        Page<Recipe> recipes = recipeService.getPopularRecipes(pageable);
        return ResponseEntity.ok(recipes);
    }

    // 최신 레시피 조회
    @GetMapping("/recent")
    public ResponseEntity<Page<Recipe>> getRecentRecipes(Pageable pageable) {
        Page<Recipe> recipes = recipeService.getRecentRecipes(pageable);
        return ResponseEntity.ok(recipes);
    }

    // 카테고리별 레시피 조회
    @GetMapping("/category/{category}")
    public ResponseEntity<Page<Recipe>> getRecipesByCategory(
            @PathVariable String category,
            Pageable pageable) {
        Page<Recipe> recipes = recipeService.getRecipesByCategory(category, pageable);
        return ResponseEntity.ok(recipes);
    }

    // 사용자의 레시피 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<Recipe>> getUserRecipes(
            @PathVariable Long userId,
            Pageable pageable) {
        Page<Recipe> recipes = recipeService.getUserRecipes(userId, pageable);
        return ResponseEntity.ok(recipes);
    }
}