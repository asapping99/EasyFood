package com.model.recipeIngredient;

public interface RecipeIngredientService {

	void create(RecipeIngredientVO recipeIngredient);
	void update(RecipeIngredientVO recipeIngredient);
	void delete(String id);

}
