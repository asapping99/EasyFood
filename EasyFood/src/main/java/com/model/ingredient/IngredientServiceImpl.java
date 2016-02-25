package com.model.ingredient;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("ingredientService")
public class IngredientServiceImpl implements IngredientService {

	@Resource(name="ingredientBLO")
	private IngredientBLO ingredientBLO;
	
	@Override
	public void create(IngredientVO ingredient) {
		ingredientBLO.create(ingredient);
	}

	@Override
	public void update(IngredientVO ingredient) {
		ingredientBLO.update(ingredient);
	}

	@Override
	public void delete(String id) {
		ingredientBLO.delete(id);
	}

}
