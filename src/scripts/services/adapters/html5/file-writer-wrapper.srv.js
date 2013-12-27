angular.module("chromeApps")
	.factory("chromeApps.services.adapters.html5.fileWriterWrapper",
		["$q", "chromeApps.constants.ioTypes",
			function ($q, ioTypes) {

		return function(writer){
			var writer = writer;


			function writingContent(content, writeType){

				var deferred = $q.defer(),
					mimeType;

				writer.onerror = function(event){
					console.debug("write error", event.target.error);
					deferred.reject(event.target.error);
				}
				writer.onwrite = function(event){
					console.debug("@writingContent event", event);
					deferred.resolve(event.target);
				}

				switch (writeType){
					case ioTypes.TEXT:
						mimeType = "text/plain";
						break;
				}
				writer.write(new Blob([content]), {type:mimeType});
				return deferred.promise;
			}

			return {
				deleteFileContent: function(){
					var deferred = $q.defer();
					writer.onerror = function(event){
						console.debug("truncate error", event.target.error);
						deferred.reject(event.target.error);
					}
					writer.onwrite = function(event){
						deferred.resolve(event.target);
					}
					writer.truncate(0);
					return deferred.promise;
				},

				writing: function(content, writeType, overwrite){
					if (overwrite && this.getLength() > 0){
						return this.deleteFileContent().then(function success(){
							return writingContent(content, writeType);
						}, function error(error){
							console.debug("@writing Truncate Error", TruncateError);
						})
					}
					return writingContent(content, writeType);
				},
				getLength: function(){
					return writer.length;
				}
			}
		}
	}]);