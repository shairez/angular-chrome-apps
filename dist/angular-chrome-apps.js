angular.module("chromeApps", []);
angular.module("chromeApps")
	.constant("chromeApps.constants.ioTypes", {
		TEXT: "text"
	});
angular.module("chromeApps")
	.factory("chromeApps.services.adapters.chrome.chromeAppsApi", [function () {
		return window.chrome;
	}]);
angular.module("chromeApps")
	.factory("chromeApps.services.adapters.chrome.syncFileSystemAdapter",
		["$q", "chromeApps.services.adapters.html5.fileSystemWrapper",
		 "chromeApps.services.adapters.chrome.chromeAppsApi",
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
						console.log("error", event.target.error);
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
angular.module("chromeApps")
	.factory("chromeApps.services.adapters.html5.fileReaderFactory", [function () {

		return function(){
			return new FileReader();
		};
	}]);
angular.module("chromeApps")
	.factory("chromeApps.services.adapters.html5.fileSystemWrapper",
		["$q", "chromeApps.services.adapters.html5.directoryEntryWrapper",
			function ($q, directoryEntryWrapper) {
		return function(fileSystem){
			var fileSystem = fileSystem;

			return {
				getRoot: function(){
					return directoryEntryWrapper(fileSystem.root);
				}
			}

		}

	}]);
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
					deferred.reject(event.target.error);
				}
				writer.onwriteend = function(event){
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
						deferred.reject(event.target.error);
					}
					writer.onwriteend = function(event){
						deferred.resolve(event.target);
					}
					writer.truncate(0);
					return deferred.promise;
				},

				writing: function(content, writeType, overwrite){
					if (overwrite && this.getLength() > 0){
						return this.deleteFileContent(function(){
							return writingContent(content, writeType);
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
angular.module("chromeApps")
	.factory("chromeApps.services.facades.syncFileSystem",
			 ["chromeApps.services.adapters.chrome.syncFileSystemAdapter",
			  "chromeApps.services.adapters.html5.fileReaderAdapter",
			  "chromeApps.constants.ioTypes",
			  function (syncFileSystemAdapter,
			            fileReaderAdapter,
	                    ioTypes) {

		function gettingFileEntryByName(fileName){
			return syncFileSystemAdapter.requestingFileSystem().then(function(fileSystemWrapper){
				return fileSystemWrapper.getRoot().gettingFileEntry(fileName, {create:true});
			})
		}

		function writingFileTextByEntry(fileEntryWrapper, text){
			fileEntryWrapper.creatingWriter().then(function (writerWrapper){
				text = text || "";
				return writerWrapper.writing(text, ioTypes.TEXT, true);
			})
		}

		return {
			gettingTextFromFile: function(fileName){
			    return gettingFileEntryByName(fileName).then(function success(fileEntryWrapper){
				    return fileEntryWrapper.gettingFile().then(function success(file){
					    return fileReaderAdapter.gettingFileContent(file, ioTypes.TEXT);
				    })
			    })
			},
			savingTextToFile: function(filename, text){
				return gettingFileEntryByName(filename).then(function(fileEntryWrapper){
					return writingFileTextByEntry(fileEntryWrapper, text);
				})
			}
		};

}]);