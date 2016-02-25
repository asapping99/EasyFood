package com.model.recipe;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("recipeService")
public class RecipeServiceImpl implements RecipeService {

	@Resource(name="recipeBLO")
	private RecipeBLO recipeBLO;
	
	@Override
	public void create(RecipeVO recipe) {
		recipeBLO.create(recipe);
	}

	@Override
	public void update(RecipeVO recipe) {
		recipeBLO.update(recipe);
	}

	@Override
	public void delete(String id) {
		recipeBLO.delete(id);
	}

}
