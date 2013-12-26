angular.module("chromeApps")
	.factory("chromeApps.services.adapters.html5.fileEntryWrapper",
		["$q", "chromeApps.services.adapters.html5.fileWriterWrapper",
			function ($q, fileWriterWrapper) {

		return function(fileEntry){
			var fileEntry = fileEntry;
			return {
				creatingWriter: function(){
					var deferred = $q.defer();
					fileEntry.createWriter(function(writer){
						deferred.resolve( fileWriterWrapper(writer) );
					})
					return deferred.promise;
				},
				gettingFile: function(){
					var deferred = $q.defer();
					fileEntry.file(function(file){
						deferred.resolve(file);
					})
					return deferred.promise;
				}
			}
		}
	}]);