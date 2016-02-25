package com.model.recipeIngredient;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("recipeIngredientService")
public class RecipeIngredientServiceImpl implements RecipeIngredientService {

	@Resource(name="recipeIngredientBLO")
	private RecipeIngredientBLO recipeIngredientBLO;
	
	@Override
	public void create(RecipeIngredientVO recipeIngredient) {
		recipeIngredientBLO.create(recipeIngredient);
	}

	@Override
	public void update(RecipeIngredientVO recipeIngredient) {
		recipeIngredientBLO.update(recipeIngredient);
	}

	@Override
	public void delete(String id) {
		recipeIngredientBLO.delete(id);
	}

}
