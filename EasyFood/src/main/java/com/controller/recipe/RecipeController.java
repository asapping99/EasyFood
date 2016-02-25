package com.controller.recipe;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.recipe.RecipeService;
import com.model.recipe.RecipeVO;

@Controller
@RequestMapping(value = "/recipe")
public class RecipeController {

	@Resource(name="recipeService")
    private RecipeService recipeService;

	@RequestMapping(value = "create", method = RequestMethod.POST)
	public @ResponseBody RecipeVO create(@ModelAttribute("recipe") RecipeVO recipe, BindingResult error, HttpServletRequest request, HttpServletResponse response) {
		recipeService.create(recipe);
		return recipe;
	}
}
