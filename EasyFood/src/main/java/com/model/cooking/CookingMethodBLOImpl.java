package com.model.cooking;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("cookingMethodBLO")
public class CookingMethodBLOImpl implements CookingMethodBLO {

	@Resource(name="cookingMethodDAO")
	private CookingMethodDAO cookingMethodDAO;
	
	@Override
	public void create(CookingMethodVO cookingMethod) {
		cookingMethodDAO.create(cookingMethod);
	}

	@Override
	public void update(CookingMethodVO cookingMethod) {
		cookingMethodDAO.update(cookingMethod);
	}

	@Override
	public void delete(String id) {
		cookingMethodDAO.delete(id);
	}

}
