package com.model.cooking;

import org.springframework.stereotype.Service;

import com.common.dao.AbstractDAO;

@Service("cookingMethodDAO")
public class CookingMethodDAOImpl extends AbstractDAO implements CookingMethodDAO {

	@Override
	public void create(CookingMethodVO cookingMethod) {
		insert("cooking.create", cookingMethod);
	}

	@Override
	public void update(CookingMethodVO cookingMethod) {
		update("cooking.update", cookingMethod);
	}

	@Override
	public void delete(String id) {
		delete("cooking.delete",id);
	}
	
}
