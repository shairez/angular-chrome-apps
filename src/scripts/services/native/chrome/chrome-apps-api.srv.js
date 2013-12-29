angular.module("chromeApps")
	.factory("chromeApps.services.native.chrome.chromeAppsApi", [function () {
		return window.chrome;
	}]);