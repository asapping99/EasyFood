package com.easyfood.controller;

import com.easyfood.entity.Recipe;
import com.easyfood.repository.RecipeRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RecipeController {
    private final RecipeRepository recipeRepository;

    public RecipeController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @GetMapping
    public List<Recipe> list(Pageable pageable) {
        return recipeRepository.findAll(pageable).getContent();
    }

    @GetMapping("/{id}")
    public Recipe get(@PathVariable Long id) {
        return recipeRepository.findById(id).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Recipe create(@RequestBody Recipe recipe) {
        return recipeRepository.save(recipe);
    }
}
