angular.module("mocks.chromeApps.services.adapters.chrome.chromeAppsApi", [])
	.factory("chromeApps.services.adapters.chrome.chromeAppsApi", function ($q) {

		var responses = {
			syncFileSystem: {
				requestFileSystem: "fileSystem"
			}
		}

		var mock = {
			responses: responses,

			syncFileSystem: {
				requestFileSystem: function(callback){
					callback (responses.syncFileSystem.requestFileSystem);
				}
			}
		}


		return mock;
	});
angular.module("mocks.chromeApps.services.adapters.chrome.syncFileSystemAdapter", [])
	.factory("chromeApps.services.adapters.chrome.syncFileSystemAdapter", function ($q) {

		var mock = jasmine.createSpyObj("chromeApps.services.adapters.chrome.syncFileSystemAdapter",
										["requestingFileSystem"]);
		mock.$deferred = {
			requestingFileSystem: $q.defer()
		}
		mock.requestingFileSystem.andReturn(mock.$deferred.requestingFileSystem.promise);
		return mock;
	});
angular.module("mocks.chromeApps.services.adapters.html5.fileReaderFactory", [])
	.factory("chromeApps.services.adapters.html5.fileReaderFactory", function ($q) {

		var factorySpy = jasmine.createSpy("chromeApps.services.html5.fileReaderFactory");

		var fileReaderMock = jamsine.createSpyObj("fileReader",
												   ["abort",
												    "readAsText"])
		factorySpy.andReturn(fileReaderMock);
		return factorySpy;
	});
angular.module("mocks.chromeApps.services.adapters.html5.fileSystemWrapper", [])
	.factory("chromeApps.services.adapters.html5.fileSystemWrapper", function ($q) {

		var spy = jasmine.createSpy("chromeApps.services.adapters.html5.fileSystemWrapper");
		return spy;
	});
angular.module("mocks.chromeApps.services.facades.syncFileSystem", [])
	.factory("chromeApps.services.facades.syncFileSystem", function ($q) {

		var mock = jasmine.createSpyObj("chromeApps.services.facades.syncFileSystem",
			["gettingTextFromFile",
			 "savingTextToFile"]);

		mock.$deferred = {
			gettingTextFromFile: $q.defer()
		}
		mock.gettingTextFromFile.andReturn(mock.$deferred.gettingTextFromFile.promise);
		return mock;
	});