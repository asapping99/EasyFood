package com.model.recipe;

import org.springframework.stereotype.Service;

import com.common.dao.AbstractDAO;

@Service("recipeDAO")
public class RecipeDAOImpl extends AbstractDAO implements RecipeDAO {

	@Override
	public void create(RecipeVO recipe) {
		insert("recipe.create", recipe);
	}

	@Override
	public void update(RecipeVO recipe) {
		update("recipe.update", recipe);
	}

	@Override
	public void delete(String id) {
		delete("recipe.delete",id);
	}
	
}
