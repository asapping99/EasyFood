package com.model.ingredient;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("ingredientBLO")
public class IngredientBLOImpl implements IngredientBLO {

	@Resource(name="ingredientDAO")
	private IngredientDAO ingredientDAO;
	
	@Override
	public void create(IngredientVO ingredient) {
		ingredientDAO.create(ingredient);
	}

	@Override
	public void update(IngredientVO ingredient) {
		ingredientDAO.update(ingredient);
	}

	@Override
	public void delete(String id) {
		ingredientDAO.delete(id);
	}

}
