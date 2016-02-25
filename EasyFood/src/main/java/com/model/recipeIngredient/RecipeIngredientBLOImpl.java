package com.model.recipeIngredient;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("recipeIngredientBLO")
public class RecipeIngredientBLOImpl implements RecipeIngredientBLO {

	@Resource(name="recipeIngredientDAO")
	private RecipeIngredientDAO recipeIngredientDAO;
	
	@Override
	public void create(RecipeIngredientVO recipeIngredient) {
		recipeIngredientDAO.create(recipeIngredient);
	}

	@Override
	public void update(RecipeIngredientVO recipeIngredient) {
		recipeIngredientDAO.update(recipeIngredient);
	}

	@Override
	public void delete(String id) {
		recipeIngredientDAO.delete(id);
	}

}
