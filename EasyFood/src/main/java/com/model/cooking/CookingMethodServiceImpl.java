package com.model.cooking;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("cookingService")
public class CookingMethodServiceImpl implements CookingMethodService {

	@Resource(name="cookingMethodBLO")
	private CookingMethodBLO cookingMethodBLO;
	
	@Override
	public void create(CookingMethodVO cookingMethod) {
		cookingMethodBLO.create(cookingMethod);
	}

	@Override
	public void update(CookingMethodVO cookingMethod) {
		cookingMethodBLO.update(cookingMethod);
	}

	@Override
	public void delete(String id) {
		cookingMethodBLO.delete(id);
	}

}
