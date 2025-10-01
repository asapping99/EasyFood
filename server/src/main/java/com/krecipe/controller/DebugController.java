package com.krecipe.controller;

import com.krecipe.entity.Recipe;
import com.krecipe.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/debug")
@RequiredArgsConstructor
public class DebugController {
    
    private final RecipeRepository recipeRepository;
    
    @GetMapping("/recipes/count")
    public ResponseEntity<Map<String, Object>> getRecipeCount() {
        long count = recipeRepository.count();
        List<Recipe> allRecipes = recipeRepository.findAll();
        
        Map<String, Object> response = new HashMap<>();
        response.put("totalCount", count);
        response.put("recipes", allRecipes);
        response.put("message", "전체 레시피 데이터 조회");
        
        return ResponseEntity.ok(response);
    }
}
