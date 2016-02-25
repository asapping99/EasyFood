package com.model.recipeIngredient;


public interface RecipeIngredientDAO {

	void create(RecipeIngredientVO recipeIngredient);
	void update(RecipeIngredientVO recipeIngredient);
	void delete(String id);
	
}
