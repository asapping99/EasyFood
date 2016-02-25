package com.model.recipeIngredient;

public interface RecipeIngredientBLO {

	void create(RecipeIngredientVO recipeIngredient);
	void update(RecipeIngredientVO recipeIngredient);
	void delete(String id);

}
