package com.model.ingredient;

import org.springframework.stereotype.Service;

import com.common.dao.AbstractDAO;

@Service("ingredientDAO")
public class IngredientDAOImpl extends AbstractDAO implements IngredientDAO {

	@Override
	public void create(IngredientVO ingredient) {
		insert("ingredient.create", ingredient);
	}

	@Override
	public void update(IngredientVO ingredient) {
		update("ingredient.update", ingredient);
	}

	@Override
	public void delete(String id) {
		delete("ingredient.delete",id);
	}
	
}
