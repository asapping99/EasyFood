/**
 * @createRecipe.js
 * - createRecipe 스크립트
 */
(function(){
	recipeModule.createRecipe = function(options){
		this.scope = options.scope;
		this.scope.addDescription = this.addDescription;
		this.scope.removeDescription = this.removeDescription;
		this.scope.renderCount = this.renderCount;
		this.scope.getRecipe = this.getRecipe;
		this.scope.clickSubmitPopup = this.clickSubmitPopup;
	};
	recipeModule.createRecipe.prototype = {
		templates: [ { name: 'mainPopup.html', url: 'html/recipe/createRecipe.html'} ],
		
		render: function() {
			this.count = 0;
			this.scope.mainPopup = this.templates[0];
			this.scope.title = sentence.recipe.create;
			this.scope.recipeName = sentence.recipe.name;
			this.scope.recipeDescription = sentence.recipe.description;
			this.scope.recipeIngredient = sentence.recipe.ingredient;
			this.scope.create = sentence.common.create;
			this.scope.add = sentence.common.add;
		},
		
		renderDescription: function() {
			this.addDescription();
			this.renderCount();
		},
		
		addDescription: function() {
			var self = this;
			var divDescription = jQuery('<div/>').addClass("descriptionInput");
			var divCount = jQuery('<div/>').addClass("descriptionCount");
			var textarea = jQuery('<textarea/>').addClass("descriptionText");
			var deleteBtn = jQuery('<div/>').addClass("deleteButton");
			divDescription.append(divCount);
			divDescription.append(textarea);
			divDescription.append(deleteBtn);
			$(".recipeDescription").append(divDescription);
			this.initialHeight = this.initialHeight || textarea[0].style.height;
			textarea.on("input change", function(event){
				textarea[0].style.height = self.initialHeight;
				textarea[0].style.height = "" + (textarea[0].scrollHeight - 16) + "px";
			});
			deleteBtn.on("click", function(event){
				self.removeDescription(divDescription);
			});
			this.renderCount();
		},
		
		removeDescription: function(divDescription) {
			divDescription.remove();
			this.renderCount();
		},
		
		renderCount: function() {
			var countEls = $(".recipeDescription .descriptionCount");
			if(countEls.length > 0) {
				$.each(countEls, function(idx, countEl){
					$(countEl).text((idx+1) + " : ");
					$(countEl).data("count", (idx+1));
				});
			}
		},
		
		getRecipe: function() {
			var name = $(".recipeName").val();
			var descriptions = {};
			var divDescriptions = $(".recipeDescription .descriptionInput");
			$.each(divDescriptions, function(idx, divDescription){
//				descriptions[idx] =.description = $(divDescription).find(".descriptionText").val();
//				descriptions[idx].sortOrder = $(divDescription).find(".descriptionCount").data("count");
				var description = {};
				description.description = $(divDescription).find(".descriptionText").val();
				description.sortOrder = $(divDescription).find(".descriptionCount").data("count");
				descriptions[idx] = description;
//				descriptions.push(description);
			});
			
			var recipe = {
				name: name
			};
			recipe["cookingMethods"] = descriptions;
			return recipe;
		},
		
		clickSubmitPopup: function() {
			var recipe = this.getRecipe();
			$.ajax({
				url: "/recipe/create.m",
				dataType : 'json',
				data: recipe,
				method: "POST",
//				traditional: true,
				success: function(data, status, xhr) {
					console.log(data);
					mainApp.popupScope.mainPopupSlide = true;
					$(".markup").hide();
				},
				error: function(data, xhr) {
					alert(sentence.recipe.createFail);
					console.log(data);
					console.log(xhr);
				}
			});
		}
	};
})();
