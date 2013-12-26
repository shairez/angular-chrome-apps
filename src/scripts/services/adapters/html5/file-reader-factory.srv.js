angular.module("chromeApps")
	.factory("chromeApps.services.adapters.html5.fileReaderFactory", [function () {

		return function(){
			return new FileReader();
		};
	}]);