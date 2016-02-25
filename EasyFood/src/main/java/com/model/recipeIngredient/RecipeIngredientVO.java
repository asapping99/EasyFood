package com.model.recipeIngredient;

import com.common.vo.BaseVO;

public class RecipeIngredientVO extends BaseVO {
	
	// 레시피 ID
	private String recipeID;
	public String getRecipeID() {
		return recipeID;
	}
	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}
	
	// 재료 ID
	private String ingredientID;
	public String getIngredientID() {
		return ingredientID;
	}
	public void setIngredientID(String ingredientID) {
		this.ingredientID = ingredientID;
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
		return "RecipeIngredientVO [recipeID=" + recipeID + ", ingredientID="
				+ ingredientID + ", sortOrder=" + sortOrder + "]";
	}
	
}
