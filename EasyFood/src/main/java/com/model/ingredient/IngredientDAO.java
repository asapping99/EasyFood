package com.model.ingredient;


public interface IngredientDAO {

	void create(IngredientVO ingredient);
	void update(IngredientVO ingredient);
	void delete(String id);
	
}
