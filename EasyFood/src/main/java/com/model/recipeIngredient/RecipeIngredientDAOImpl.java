package com.model.recipeIngredient;

import org.springframework.stereotype.Service;

import com.common.dao.AbstractDAO;

@Service("recipeIngredientDAO")
public class RecipeIngredientDAOImpl extends AbstractDAO implements RecipeIngredientDAO {

	@Override
	public void create(RecipeIngredientVO recipeIngredient) {
		insert("recipeIngredient.create", recipeIngredient);
	}

	@Override
	public void update(RecipeIngredientVO recipeIngredient) {
		update("recipeIngredient.update", recipeIngredient);
	}

	@Override
	public void delete(String id) {
		delete("recipeIngredient.delete",id);
	}
	
}
