package com.model.recipe;

public interface RecipeService {

	void create(RecipeVO recipe);
	void update(RecipeVO recipe);
	void delete(String id);

}
