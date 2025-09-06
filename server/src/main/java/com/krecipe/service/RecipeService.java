package com.krecipe.service;

import com.krecipe.dto.RecipeDto;
import com.krecipe.entity.Recipe;
import com.krecipe.entity.User;
import com.krecipe.repository.RecipeRepository;
import com.krecipe.repository.UserRepository;
import com.krecipe.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    // 레시피 목록 조회
    public Page<Recipe> getRecipes(String search, String category, String difficulty, String sortBy, Pageable pageable) {
        // 정렬 기준 설정
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        if (sortBy != null) {
            switch (sortBy) {
                case "popular":
                    sort = Sort.by(Sort.Direction.DESC, "viewCount");
                    break;
                case "likes":
                    sort = Sort.by(Sort.Direction.DESC, "likeCount");
                    break;
                case "oldest":
                    sort = Sort.by(Sort.Direction.ASC, "createdAt");
                    break;
            }
        }

        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

        // 검색 및 필터링
        if (search != null && !search.isEmpty()) {
            if (category != null && !category.isEmpty()) {
                if (difficulty != null && !difficulty.isEmpty()) {
                    return recipeRepository.findByTitleContainingAndCategoryAndDifficulty(search, category, difficulty, sortedPageable);
                }
                return recipeRepository.findByTitleContainingAndCategory(search, category, sortedPageable);
            }
            return recipeRepository.findByTitleContainingOrDescriptionContaining(search, search, sortedPageable);
        }

        if (category != null && !category.isEmpty()) {
            if (difficulty != null && !difficulty.isEmpty()) {
                return recipeRepository.findByCategoryAndDifficulty(category, difficulty, sortedPageable);
            }
            return recipeRepository.findByCategory(category, sortedPageable);
        }

        if (difficulty != null && !difficulty.isEmpty()) {
            return recipeRepository.findByDifficulty(difficulty, sortedPageable);
        }

        return recipeRepository.findAll(sortedPageable);
    }

    // 레시피 상세 조회
    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    // 레시피 등록
    public Recipe createRecipe(RecipeDto recipeDto, String token) {
        String username = getUsernameFromToken(token);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        Recipe recipe = Recipe.builder()
                .title(recipeDto.getTitle())
                .description(recipeDto.getDescription())
                .category(recipeDto.getCategory())
                .cookingTime(recipeDto.getCookingTime())
                .servings(recipeDto.getServings())
                .difficulty(recipeDto.getDifficulty())
                .imageUrl(recipeDto.getImageUrl())
                .ingredients(new ArrayList<>(recipeDto.getIngredients()))
                .steps(new ArrayList<>(recipeDto.getSteps()))
                .tags(recipeDto.getTags() != null ? new ArrayList<>(recipeDto.getTags()) : new ArrayList<>())
                .author(user)
                .viewCount(0)
                .likeCount(0)
                .build();

        return recipeRepository.save(recipe);
    }

    // 레시피 수정
    public Recipe updateRecipe(Long id, RecipeDto recipeDto, String token) {
        String username = getUsernameFromToken(token);
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("레시피를 찾을 수 없습니다."));

        // 작성자 확인
        if (!recipe.getAuthor().getUsername().equals(username)) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

        recipe.setTitle(recipeDto.getTitle());
        recipe.setDescription(recipeDto.getDescription());
        recipe.setCategory(recipeDto.getCategory());
        recipe.setCookingTime(recipeDto.getCookingTime());
        recipe.setServings(recipeDto.getServings());
        recipe.setDifficulty(recipeDto.getDifficulty());
        recipe.setImageUrl(recipeDto.getImageUrl());
        recipe.setIngredients(new ArrayList<>(recipeDto.getIngredients()));
        recipe.setSteps(new ArrayList<>(recipeDto.getSteps()));
        if (recipeDto.getTags() != null) {
            recipe.setTags(new ArrayList<>(recipeDto.getTags()));
        }

        return recipeRepository.save(recipe);
    }

    // 레시피 삭제
    public boolean deleteRecipe(Long id, String token) {
        String username = getUsernameFromToken(token);
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("레시피를 찾을 수 없습니다."));

        // 작성자 확인
        if (!recipe.getAuthor().getUsername().equals(username)) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }

        recipeRepository.delete(recipe);
        return true;
    }

    // 조회수 증가
    @Transactional
    public void incrementViewCount(Long id) {
        recipeRepository.incrementViewCount(id);
    }

    // 좋아요 토글
    @Transactional
    public int toggleLike(Long id, String token) {
        String username = getUsernameFromToken(token);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("레시피를 찾을 수 없습니다."));

        List<Long> favorites = user.getFavoriteRecipeIds();
        if (favorites.contains(id)) {
            favorites.remove(id);
            recipe.setLikeCount(recipe.getLikeCount() - 1);
        } else {
            favorites.add(id);
            recipe.setLikeCount(recipe.getLikeCount() + 1);
        }

        userRepository.save(user);
        recipeRepository.save(recipe);

        return recipe.getLikeCount();
    }

    // 인기 레시피 조회
    public Page<Recipe> getPopularRecipes(Pageable pageable) {
        return recipeRepository.findAll(
                PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                        Sort.by(Sort.Direction.DESC, "viewCount"))
        );
    }

    // 최신 레시피 조회
    public Page<Recipe> getRecentRecipes(Pageable pageable) {
        return recipeRepository.findAll(
                PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                        Sort.by(Sort.Direction.DESC, "createdAt"))
        );
    }

    // 카테고리별 레시피 조회
    public Page<Recipe> getRecipesByCategory(String category, Pageable pageable) {
        return recipeRepository.findByCategory(category, pageable);
    }

    // 사용자별 레시피 조회
    public Page<Recipe> getUserRecipes(Long userId, Pageable pageable) {
        return recipeRepository.findByAuthorId(userId, pageable);
    }

    // 토큰에서 사용자명 추출
    private String getUsernameFromToken(String token) {
        String actualToken = token.replace("Bearer ", "");
        return jwtUtil.getUsernameFromToken(actualToken);
    }
}