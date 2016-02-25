/**
 * @login.js
 * - login 스크립트
 */
(function(){
	loginApp = {
			
		module: angular.module('loginApp', ['ngRoute','ngAnimate']),
		
		init: function() {
			this.module.controller("loginHeaderController", this.headerController);
			this.module.controller("loginContentController", this.contentController);
			this.module.controller("loginJoinController", this.joinController);
		},
		
		headerController: function($scope) {
			$scope.title = sentence.common.title;
		},
		
		contentController: function($scope) {
			this.account = $scope.account;
			this.password = $scope.password;
			$scope.login = sentence.common.login;
			$scope.join = sentence.common.join;
			$scope.placeholderId = sentence.common.placeholder.id;
			$scope.placeholderPassword = sentence.common.placeholder.password;
			$scope.submit = loginApp.submit;
			$scope.joinView = loginApp.joinView;
		},
		
		joinController: function($scope) {
			loginApp.joinScope = $scope;
			this.joinName     = $scope.joinName;
			this.joinAccount  = $scope.joinAccount;
			this.joinPassword = $scope.joinPassword;
			$scope.templates =
			    [ { name: 'join.html', url: 'html/join/join.html'} ];
			$scope.loginJoinContent = $scope.templates[0];
			$scope.join = sentence.common.join;
			$scope.name = sentence.login.name;
			$scope.account = sentence.login.account;
			$scope.password = sentence.login.password;
			$scope.confirm = sentence.common.confirm;
			$scope.placeholderName = sentence.login.placeholder.name;
			$scope.placeholderAccount = sentence.login.placeholder.id;
			$scope.placeholderPassword = sentence.login.placeholder.password;
			
			$scope.cancelJoin = loginApp.cancelJoin;
			$scope.submit = loginApp.joinSubmit;
			loginApp.joinScope.joinSlide = true;
		},
		
		submit: function(event) {
			var user = {
				account: this.account,
				password: this.password
			};
			$.ajax({
				url: "/userInfo/login.m",
				data: user,
				method: "POST",
				success: function(data, status, xhr) {
					if(status == constants.result.success) {
						location.href = "/main.jsp"
					}
				},
				error: function(data, xhr) {
					alert(sentence.common.loginFail);
					console.log(data);
					console.log(xhr);
				}
			});
		},
		
		joinSubmit: function(event) {
			var self = this;
			var user = {
					name: this.joinName,
					account: this.joinAccount,
					password: this.joinPassword
			};
			$.ajax({
				url: "/userInfo/create.m",
				data: user,
				method: "POST",
				success: function(data, status, xhr) {
					if(status == constants.result.success) {
						self.joinName = "";
						self.joinAccount = "";
						self.joinPassword = "";
						$(".joinForm .cancel").trigger("click");
					}
				},
				error: function(data, xhr) {
					alert(sentence.login.joinFail);
					console.log(data);
					console.log(xhr);
				}
			});
		},
		
		joinView: function(event) {
			var target = event.currentTarget;
			if($(target).hasClass("off")) {
				$(target).removeClass("off");
				$(target).addClass("on");
				loginApp.joinScope.joinSlide = false;
			}else {
				$(target).removeClass("on");
				$(target).addClass("off");
				loginApp.joinScope.joinSlide = true;
			}
		},
		
		cancelJoin: function(event) {
			$(".joinButton").removeClass("on");
			$(".joinButton").addClass("off");
			loginApp.joinScope.joinSlide = true;
		}
		
	};
	loginApp.init();
})();
