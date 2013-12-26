angular.module("chromeApps")
	.factory("chromeApps.services.adapters.html5.directoryEntryWrapper",
		["$q", "chromeApps.services.adapters.html5.fileEntryWrapper",
			function ($q, fileEntryWrapper) {

		return function(directoryEntry){
			var directoryEntry = directoryEntry;
			return {
				gettingFileEntry: function(fileName, options){
					var deferred = $q.defer();
					directoryEntry.getFile(fileName, options,
											function success(fileEntry){
												var wrappedEntry = fileEntryWrapper(fileEntry);
												deferred.resolve( wrappedEntry );
											},
											function error(error){
												deferred.reject( error );
											}
					)
					return deferred.promise;
				}
			}
		}
	}]);