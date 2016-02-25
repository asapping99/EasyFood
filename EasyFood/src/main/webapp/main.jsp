<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>요리는 즐거워</title>
	<link rel="stylesheet" type="text/css" href="css/common/common.css">
	<link rel="stylesheet" type="text/css" href="css/common/main.css">
	<link rel="stylesheet" type="text/css" href="css/recipe/createRecipe.css">
	<script src="scripts/openlibs/jquery/jquery-1.11.3.min.js"></script>
	<script src="scripts/openlibs/angular-1.4.7/angular.min.js"></script>
	<script src="scripts/openlibs/angular-1.4.7/angular-route.min.js"></script>
	<script src="scripts/openlibs/angular-1.4.7/angular-animate.min.js"></script>
	<script src="scripts/common/constants.js"></script>
	<script src="scripts/locale/ko.js"></script>
	<script src="scripts/main.js"></script>
	<script src="scripts/recipe/createRecipe.js"></script>
</head>
<body ng-app="mainApp">
	<section>
		<section id="mainHeader" ng-controller="mainHeaderController">
			<div class="menu off" ng-click="clickMenu($event)"></div>
			<div class="title">{{title}}</div>
		</section>	
		<section id="mainContent">
		</section>
		<section id="mainMenu" ng-controller="mainMenuController">
			<section class="menuAnimate-hide" ng-include="mainMenu.url" ng-hide="mainMenuSlide"></section>
		</section>
	</section>
	<section id="mainPopupContent" ng-controller="mainPopupController">
		<section class="popupAnimate-hide" ng-include="mainPopup.url" ng-hide="mainPopupSlide"></section>
	</section>
	<section class="markup">
	</section>
</body>
</html>
