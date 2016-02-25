package com.model.recipe;


public interface RecipeDAO {

	void create(RecipeVO recipe);
	void update(RecipeVO recipe);
	void delete(String id);
	
}
