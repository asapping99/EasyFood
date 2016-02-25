<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>요리는 즐거워</title>
	<link rel="stylesheet" type="text/css" href="css/common/common.css">
	<link rel="stylesheet" type="text/css" href="css/login/login.css">
	<script src="scripts/openlibs/jquery/jquery-1.11.3.min.js"></script>
	<script src="scripts/openlibs/angular-1.4.7/angular.min.js"></script>
	<script src="scripts/openlibs/angular-1.4.7/angular-route.min.js"></script>
	<script src="scripts/openlibs/angular-1.4.7/angular-animate.min.js"></script>
	<script src="scripts/common/constants.js"></script>
	<script src="scripts/locale/ko.js"></script>
	<script src="scripts/login/login.js"></script>
</head>
<body>
	<section id="loginSection" ng-app="loginApp">
		<section id="loginHeader" ng-controller="loginHeaderController">
			<div class="title">{{title}}</div>
		</section>
		<section id="loginContent"  ng-controller="loginContentController">
			<div class="loginArea">
				<div class="loginInputArea">
					<div class="inputAccountText">
						<input type="text" class="inputAccount" ng-model="account" placeholder="{{placeholderId}}"/>
					</div>
					<div class="inputPasswordText">
						<input type="password" class="inputPassword" ng-model="password" placeholder="{{placeholderPassword}}"/>
					</div>
				</div>
				<div class="submitArea">
					<div class="submit" ng-click="submit($event)">{{login}}</div>
				</div>
			</div>
			<div class="joinArea">
				<div class="joinButton off" ng-click="joinView($event)">{{join}}</div>
			</div>
		</section>
		<section id="loginJoinContent" ng-controller="loginJoinController">
			<section class="animate-hide" ng-include="loginJoinContent.url" ng-hide="joinSlide"></section>
		</section>
	</section>
</body>
</html>
