package com.model.cooking;

import com.common.vo.BaseVO;

public class CookingMethodVO extends BaseVO {
	
	// 레시피ID
	private String recipeID;
	public String getRecipeID() {
		return recipeID;
	}
	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}

	// 설명
	private String description;
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	// 정렬
	private int sortOrder;
	public int getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}
	
	@Override
	public String toString() {
		return "CookingMethodVO [recipeID=" + recipeID + ", description="
				+ description + ", sortOrder=" + sortOrder + "]";
	}
}
