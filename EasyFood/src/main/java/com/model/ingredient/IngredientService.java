package com.model.ingredient;

public interface IngredientService {

	void create(IngredientVO ingredient);
	void update(IngredientVO ingredient);
	void delete(String id);

}
