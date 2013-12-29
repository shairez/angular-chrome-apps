angular.module("chromeApps")
	.factory("chromeApps.services.adapters.chrome.syncFileSystemAdapter",
		["$q", "chromeApps.services.adapters.html5.fileSystemWrapper",
		 "chromeApps.services.native.chrome.chromeAppsApi",
		 function ($q, fileSystemWrapper,
		           chrome) {
			var sfs = chrome.syncFileSystem;
			return {
				requestingFileSystem: function(){
					var deferred = $q.defer();
					sfs.requestFileSystem(function(fileSystem){
						deferred.resolve(fileSystemWrapper(fileSystem));
					})
					return deferred.promise;
				}
			};
	}]);