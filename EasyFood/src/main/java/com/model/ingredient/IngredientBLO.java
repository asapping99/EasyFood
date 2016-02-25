package com.model.ingredient;

public interface IngredientBLO {

	void create(IngredientVO ingredient);
	void update(IngredientVO ingredient);
	void delete(String id);

}
