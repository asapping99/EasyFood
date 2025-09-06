package com.krecipe.repository;

import com.krecipe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 사용자명으로 찾기
    Optional<User> findByUsername(String username);

    // 이메일로 찾기
    Optional<User> findByEmail(String email);

    // 사용자명 존재 여부 확인
    boolean existsByUsername(String username);

    // 이메일 존재 여부 확인
    boolean existsByEmail(String email);

    // 닉네임으로 찾기
    Optional<User> findByNickname(String nickname);

    // 닉네임 존재 여부 확인
    boolean existsByNickname(String nickname);

    // 활성화된 사용자만 조회
    List<User> findByIsActiveTrue();

    // 비활성화된 사용자만 조회
    List<User> findByIsActiveFalse();

    // 역할별 사용자 조회
    List<User> findByRole(String role);

    // 사용자명 또는 이메일로 로그인
    @Query("SELECT u FROM User u WHERE (u.username = :usernameOrEmail OR u.email = :usernameOrEmail) AND u.isActive = true")
    Optional<User> findByUsernameOrEmail(@Param("usernameOrEmail") String usernameOrEmail);

    // 닉네임으로 검색 (부분 일치)
    List<User> findByNicknameContaining(String nickname);

    // 레시피 수가 많은 사용자 조회
    @Query("SELECT u FROM User u LEFT JOIN u.recipes r GROUP BY u ORDER BY COUNT(r) DESC")
    List<User> findTopChefs();

    // 특정 레시피를 좋아요한 사용자들 조회
    @Query("SELECT u FROM User u WHERE :recipeId MEMBER OF u.favoriteRecipeIds")
    List<User> findUsersWhoLikedRecipe(@Param("recipeId") Long recipeId);

    // 사용자의 즐겨찾기 레시피 수 조회
    @Query("SELECT SIZE(u.favoriteRecipeIds) FROM User u WHERE u.id = :userId")
    Integer countFavoriteRecipes(@Param("userId") Long userId);

    // 사용자가 작성한 레시피 수 조회
    @Query("SELECT COUNT(r) FROM Recipe r WHERE r.author.id = :userId")
    Long countUserRecipes(@Param("userId") Long userId);
}