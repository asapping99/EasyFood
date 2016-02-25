/**
 * @main.js
 * - main 스크립트
 */
var recipeModule = {};
(function(){
	mainApp = {
			
		module: angular.module('mainApp', ['ngRoute','ngAnimate']),
		
		init: function() {
			this.module.controller("mainHeaderController", this.headerController);
			this.module.controller("mainMenuController", this.menuController);
			this.module.controller("mainPopupController", this.mainPopupController);
			recipeModule = recipeModule || {};
		},
		
		headerController: function($scope) {
			$scope.title = sentence.common.title;
			$scope.clickMenu = mainApp.clickMenu;
		},
		
		contentController: function($scope) {
		},
		
		menuController: function($scope) {
			mainApp.menuScope = $scope;
			$scope.templates =
			    [ { name: 'mainMenu.html', url: 'html/mainMenu.html'} ];
			$scope.mainMenu = $scope.templates[0];
			$scope.createRecipe = sentence.recipe.create;
			$scope.clickCreateRecipe = mainApp.clickCreateRecipe;
			mainApp.menuScope.mainMenuSlide = true;
		},
		
		mainPopupController: function($scope) {
			mainApp.popupScope = $scope;
			$scope.clickClosePopup = mainApp.clickClosePopup;
			mainApp.createRecipe = new recipeModule.createRecipe({scope: $scope});
			mainApp.popupScope.mainPopupSlide = true;
		},
		
		clickMenu: function(event) {
			var target = event.currentTarget;
			if($(target).hasClass("off")) {
				$(target).removeClass("off");
				$(target).addClass("on");
				mainApp.menuScope.mainMenuSlide = false;
			}else {
				$(target).removeClass("on");
				$(target).addClass("off");
				mainApp.menuScope.mainMenuSlide = true;
			}
		},
		
		clickCreateRecipe: function(event) {
			mainApp.closeMenu();
			mainApp.createRecipe.render();
			mainApp.popupScope.mainPopupSlide = false;
			$(".markup").show();
		},
		
		clickClosePopup: function(event) {
			mainApp.popupScope.mainPopupSlide = true;
			$(".markup").hide();
		},
		
		closeMenu: function() {
			$("#mainHeader .menu").removeClass("on");
			$("#mainHeader .menu").addClass("off");
			mainApp.menuScope.mainMenuSlide = true;
		}
		
	};
	mainApp.init();
})();
