package com.model.ingredient;

import com.common.vo.BaseVO;

public class IngredientVO extends BaseVO {
	
	// 요리재료 명
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "IngredientVO [name=" + name + "]";
	}
	
	
}
