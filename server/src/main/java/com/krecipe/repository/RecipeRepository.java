package com.krecipe.repository;

import com.krecipe.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    // 카테고리별 레시피 조회
    Page<Recipe> findByCategory(String category, Pageable pageable);

    // 난이도별 레시피 조회
    Page<Recipe> findByDifficulty(String difficulty, Pageable pageable);

    // 카테고리와 난이도로 레시피 조회
    Page<Recipe> findByCategoryAndDifficulty(String category, String difficulty, Pageable pageable);

    // 제목으로 검색
    Page<Recipe> findByTitleContaining(String title, Pageable pageable);

    // 제목 또는 설명으로 검색
    Page<Recipe> findByTitleContainingOrDescriptionContaining(String title, String description, Pageable pageable);

    // 제목과 카테고리로 검색
    Page<Recipe> findByTitleContainingAndCategory(String title, String category, Pageable pageable);

    // 제목, 카테고리, 난이도로 검색
    Page<Recipe> findByTitleContainingAndCategoryAndDifficulty(String title, String category, String difficulty, Pageable pageable);

    // 작성자별 레시피 조회
    Page<Recipe> findByAuthorId(Long authorId, Pageable pageable);

    // 작성자명으로 레시피 조회
    Page<Recipe> findByAuthorUsername(String username, Pageable pageable);

    // 조회수 기준 인기 레시피
    @Query("SELECT r FROM Recipe r ORDER BY r.viewCount DESC")
    Page<Recipe> findTopByViewCount(Pageable pageable);

    // 좋아요 기준 인기 레시피
    @Query("SELECT r FROM Recipe r ORDER BY r.likeCount DESC")
    Page<Recipe> findTopByLikeCount(Pageable pageable);

    // 최신 레시피
    @Query("SELECT r FROM Recipe r ORDER BY r.createdAt DESC")
    Page<Recipe> findLatestRecipes(Pageable pageable);

    // 조리시간 범위로 검색
    Page<Recipe> findByCookingTimeBetween(Integer minTime, Integer maxTime, Pageable pageable);

    // 인분 수로 검색
    Page<Recipe> findByServings(Integer servings, Pageable pageable);

    // 태그로 검색
    @Query("SELECT r FROM Recipe r WHERE :tag MEMBER OF r.tags")
    Page<Recipe> findByTag(@Param("tag") String tag, Pageable pageable);

    // 재료로 검색
    @Query("SELECT r FROM Recipe r WHERE EXISTS (SELECT i FROM r.ingredients i WHERE i LIKE %:ingredient%)")
    Page<Recipe> findByIngredientsContaining(@Param("ingredient") String ingredient, Pageable pageable);

    // 조회수 증가
    @Modifying
    @Query("UPDATE Recipe r SET r.viewCount = r.viewCount + 1 WHERE r.id = :id")
    void incrementViewCount(@Param("id") Long id);

    // 좋아요 증가
    @Modifying
    @Query("UPDATE Recipe r SET r.likeCount = r.likeCount + 1 WHERE r.id = :id")
    void incrementLikeCount(@Param("id") Long id);

    // 좋아요 감소
    @Modifying
    @Query("UPDATE Recipe r SET r.likeCount = r.likeCount - 1 WHERE r.id = :id AND r.likeCount > 0")
    void decrementLikeCount(@Param("id") Long id);

    // 특정 기간 내 작성된 레시피
    Page<Recipe> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    // 카테고리별 레시피 수 조회
    @Query("SELECT r.category, COUNT(r) FROM Recipe r GROUP BY r.category")
    List<Object[]> countByCategory();

    // 난이도별 레시피 수 조회
    @Query("SELECT r.difficulty, COUNT(r) FROM Recipe r GROUP BY r.difficulty")
    List<Object[]> countByDifficulty();

    // 평균 조리시간 조회
    @Query("SELECT AVG(r.cookingTime) FROM Recipe r")
    Double findAverageCookingTime();

    // 인기 태그 조회
    @Query("SELECT t, COUNT(r) FROM Recipe r JOIN r.tags t GROUP BY t ORDER BY COUNT(r) DESC")
    List<Object[]> findPopularTags(Pageable pageable);

    // 사용자가 좋아요한 레시피 조회
    @Query("SELECT r FROM Recipe r WHERE r.id IN :favoriteIds")
    Page<Recipe> findFavoriteRecipes(@Param("favoriteIds") List<Long> favoriteIds, Pageable pageable);

    // 추천 레시피 (같은 카테고리에서 좋아요가 많은)
    @Query("SELECT r FROM Recipe r WHERE r.category = :category AND r.id != :currentId ORDER BY r.likeCount DESC")
    List<Recipe> findRecommendedRecipes(@Param("category") String category, @Param("currentId") Long currentId, Pageable pageable);

    // 검색 키워드가 포함된 레시피 (제목, 설명, 재료, 태그 모두 검색)
    @Query("SELECT DISTINCT r FROM Recipe r WHERE " +
           "r.title LIKE %:keyword% OR " +
           "r.description LIKE %:keyword% OR " +
           "EXISTS (SELECT i FROM r.ingredients i WHERE i LIKE %:keyword%) OR " +
           "EXISTS (SELECT t FROM r.tags t WHERE t LIKE %:keyword%)")
    Page<Recipe> searchRecipes(@Param("keyword") String keyword, Pageable pageable);
}
