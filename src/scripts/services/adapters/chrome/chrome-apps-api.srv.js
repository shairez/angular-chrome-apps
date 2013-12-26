angular.module("chromeApps")
	.factory("chromeApps.services.adapters.chrome.chromeAppsApi", [function () {
		return window.chrome;
	}]);