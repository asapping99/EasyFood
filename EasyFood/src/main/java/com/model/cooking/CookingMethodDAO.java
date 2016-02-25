package com.model.cooking;


public interface CookingMethodDAO {

	void create(CookingMethodVO cookingMethod);
	void update(CookingMethodVO cookingMethod);
	void delete(String id);
	
}
