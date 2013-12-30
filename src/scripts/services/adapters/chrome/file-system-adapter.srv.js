angular.module("chromeApps")
	.factory("chromeApps.services.adapters.chrome.fileSystemAdapter",
		["$q", "chromeApps.services.adapters.html5.fileEntryWrapper",
		 "chromeApps.services.native.chrome.chromeAppsApi",
		 function ($q, fileEntryWrapper,
		           chrome) {
			var fs = chrome.fileSystem;
			return {
				choosingEntry: function(options){
					var deferred = $q.defer();
					fs.chooseEntry(options, function(fileEntry){
						deferred.resolve(fileEntryWrapper(fileEntry));
					})
					return deferred.promise;
				}
			};
	}]);