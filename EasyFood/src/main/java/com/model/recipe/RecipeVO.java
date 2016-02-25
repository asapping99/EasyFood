package com.model.recipe;

import java.sql.Timestamp;
import java.util.ArrayList;

import com.common.vo.BaseVO;
import com.model.cooking.CookingMethodVO;
import com.model.ingredient.IngredientVO;

public class RecipeVO extends BaseVO {
	
	// 요리제목
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	// 요리재료
	private IngredientVO[] ingredients;
	public IngredientVO[] getIngredients() {
		return ingredients;
	}
	public void setIngredients(IngredientVO[] ingredients) {
		this.ingredients = ingredients;
	}
	
	// 요리방법
	private CookingMethodVO[] cookingMethods;
	public CookingMethodVO[] getCookingMethods() {
		return cookingMethods;
	}
	public void setCookingMethods(CookingMethodVO[] cookingMethods) {
		this.cookingMethods = cookingMethods;
	}
	
	// 요리분류
	private String categoryID;
	public String getCategoryID() {
		return categoryID;
	}
	public void setCategoryID(String categoryID) {
		this.categoryID = categoryID;
	}
	
	// 요리등록자
	private String creator;
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	
	// 요리등록일
	private Timestamp createdAt;
	public Timestamp getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}
	
	// 요리수정일
	private Timestamp modifiedAt;
	public Timestamp getModifiedAt() {
		return modifiedAt;
	}
	public void setModifiedAt(Timestamp modifiedAt) {
		this.modifiedAt = modifiedAt;
	}
	
	// 조회수
	private int viewCount;
	public int getViewCount() {
		return viewCount;
	}
	public void setViewCount(int viewCount) {
		this.viewCount = viewCount;
	}
	
	@Override
	public String toString() {
		return "RecipeVO [name=" + name + ", ingredients=" + ingredients
				+ ", cookingMethods=" + cookingMethods + ", categoryID="
				+ categoryID + ", creator=" + creator + ", createdAt="
				+ createdAt + ", modifiedAt=" + modifiedAt + ", viewCount="
				+ viewCount + "]";
	}
}
