package com.model.recipe;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("recipeBLO")
public class RecipeBLOImpl implements RecipeBLO {

	@Resource(name="recipeDAO")
	private RecipeDAO recipeDAO;
	
	@Override
	public void create(RecipeVO recipe) {
		recipeDAO.create(recipe);
	}

	@Override
	public void update(RecipeVO recipe) {
		recipeDAO.update(recipe);
	}

	@Override
	public void delete(String id) {
		recipeDAO.delete(id);
	}

}
