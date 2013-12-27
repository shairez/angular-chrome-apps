angular.module("chromeApps")
	.factory("chromeApps.services.adapters.html5.fileReaderAdapter",
		["$q", "chromeApps.services.adapters.html5.fileReaderFactory",
		 "chromeApps.constants.ioTypes",
		 function ($q, fileReaderFactory,
			          ioTypes) {

			var reader = fileReaderFactory();
			return {
				gettingFileContent: function(file, readType){
					var deferred = $q.defer();

					reader.onerror = function(event){
						console.debug("read error", event.target.error);
						deferred.reject(event.target.error);
					}
					reader.onload = function(event){
						deferred.resolve(event.target.result)
					}
					switch(readType){
						case ioTypes.TEXT:
							reader.readAsText(file);
						break;
					}
					return deferred.promise;
				}
			};
	}]);