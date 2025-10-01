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
    @Transactional(readOnly = true)
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
            Page<Recipe> result;
            if (category != null && !category.isEmpty()) {
                if (difficulty != null && !difficulty.isEmpty()) {
                    result = recipeRepository.findByTitleContainingAndCategoryAndDifficulty(search, category, difficulty, sortedPageable);
                } else {
                    result = recipeRepository.findByTitleContainingAndCategory(search, category, sortedPageable);
                }
            } else {
                result = recipeRepository.findByTitleContainingOrDescriptionContaining(search, search, sortedPageable);
            }
            // Lazy 로딩된 컬렉션들을 초기화
            result.forEach(recipe -> initializeLazyCollections(recipe));
            return result;
        }

        if (category != null && !category.isEmpty()) {
            Page<Recipe> result;
            if (difficulty != null && !difficulty.isEmpty()) {
                result = recipeRepository.findByCategoryAndDifficulty(category, difficulty, sortedPageable);
            } else {
                result = recipeRepository.findByCategory(category, sortedPageable);
            }
            // Lazy 로딩된 컬렉션들을 초기화
            result.forEach(recipe -> initializeLazyCollections(recipe));
            return result;
        }

        if (difficulty != null && !difficulty.isEmpty()) {
            Page<Recipe> result = recipeRepository.findByDifficulty(difficulty, sortedPageable);
            // Lazy 로딩된 컬렉션들을 초기화
            result.forEach(recipe -> initializeLazyCollections(recipe));
            return result;
        }

        Page<Recipe> result = recipeRepository.findAll(sortedPageable);
        
        // Lazy 로딩된 컬렉션들을 초기화
        result.forEach(recipe -> initializeLazyCollections(recipe));
        
        return result;
    }

    // Lazy 컬렉션 초기화 헬퍼 메서드
    private void initializeLazyCollections(Recipe recipe) {
        if (recipe.getAuthor() != null) {
            recipe.getAuthor().getUsername();
        }
        recipe.getIngredients().size();
        recipe.getSteps().size();
        recipe.getTags().size();
    }

    // 레시피 상세 조회
    @Transactional(readOnly = true)
    public Recipe getRecipeById(Long id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe != null) {
            // Lazy 로딩된 컬렉션들을 초기화
            initializeLazyCollections(recipe);
        }
        return recipe;
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
    @Transactional(readOnly = true)
    public Page<Recipe> getPopularRecipes(Pageable pageable) {
        Page<Recipe> recipes = recipeRepository.findAll(
                PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                        Sort.by(Sort.Direction.DESC, "viewCount"))
        );
        // Lazy 로딩된 컬렉션들을 초기화
        recipes.forEach(this::initializeLazyCollections);
        return recipes;
    }

    // 최신 레시피 조회
    @Transactional(readOnly = true)
    public Page<Recipe> getRecentRecipes(Pageable pageable) {
        Page<Recipe> recipes = recipeRepository.findAll(
                PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                        Sort.by(Sort.Direction.DESC, "createdAt"))
        );
        // Lazy 로딩된 컬렉션들을 초기화
        recipes.forEach(this::initializeLazyCollections);
        return recipes;
    }

    // 카테고리별 레시피 조회
    @Transactional(readOnly = true)
    public Page<Recipe> getRecipesByCategory(String category, Pageable pageable) {
        Page<Recipe> recipes = recipeRepository.findByCategory(category, pageable);
        // Lazy 로딩된 컬렉션들을 초기화
        recipes.forEach(this::initializeLazyCollections);
        return recipes;
    }

    // 사용자별 레시피 조회
    @Transactional(readOnly = true)
    public Page<Recipe> getUserRecipes(Long userId, Pageable pageable) {
        Page<Recipe> recipes = recipeRepository.findByAuthorId(userId, pageable);
        // Lazy 로딩된 컬렉션들을 초기화
        recipes.forEach(this::initializeLazyCollections);
        return recipes;
    }

    // 토큰에서 사용자명 추출
    private String getUsernameFromToken(String token) {
        String actualToken = token.replace("Bearer ", "");
        return jwtUtil.getUsernameFromToken(actualToken);
    }
}