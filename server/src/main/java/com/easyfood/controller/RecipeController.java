package com.easyfood.controller;

import com.easyfood.entity.Recipe;
import com.easyfood.repository.RecipeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin
public class RecipeController {
    private final RecipeRepository recipeRepository;

    public RecipeController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @GetMapping
    public List<Recipe> list() {
        return recipeRepository.findAll();
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
