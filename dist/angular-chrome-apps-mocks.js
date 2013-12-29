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
angular.module("mocks.chromeApps.services.adapters.html5.directoryEntryWrapper", [])
	.factory("chromeApps.services.adapters.html5.directoryEntryWrapper", function ($q) {

		var wrapperSpy = jasmine.createSpy("chromeApps.services.html5.directoryEntryWrapper");

		var directoryEntryAdapterMock = jasmine.createSpyObj("chromeApps.services.html5.directoryEntryAdapter",
												   ["gettingFileEntry"])
		wrapperSpy.andReturn(directoryEntryAdapterMock);

		directoryEntryAdapterMock.$deferred = {
			gettingFileEntry: $q.defer()
		}
		directoryEntryAdapterMock.gettingFileEntry.andReturn(directoryEntryAdapterMock.$deferred.gettingFileEntry.promise);
		return wrapperSpy;
	});
angular.module("mocks.chromeApps.services.adapters.html5.fileEntryWrapper", [])
	.factory("chromeApps.services.adapters.html5.fileEntryWrapper",
			 ["$q", function ($q) {

		var spy = jasmine.createSpy("chromeApps.services.adapters.html5.fileEntryWrapper");
		var fileEntryAdapterMock = jasmine.createSpyObj("chromeApps.services.adapters.html5.fileEntryAdapter",
									["creatingWriter",
									 "gettingFile"])
		fileEntryAdapterMock.$deferred = {
			creatingWriter: $q.defer(),
			gettingFile: $q.defer()
		}
		 fileEntryAdapterMock.creatingWriter.andReturn(fileEntryAdapterMock.$deferred.creatingWriter.promise);
		 fileEntryAdapterMock.gettingFile.andReturn(fileEntryAdapterMock.$deferred.gettingFile.promise);

		spy.andReturn(fileEntryAdapterMock);
		return spy;
	}]);
angular.module("mocks.chromeApps.services.adapters.html5.fileReaderFactory", [])
	.factory("chromeApps.services.adapters.html5.fileReaderFactory", function ($q) {

		var factorySpy = jasmine.createSpy("chromeApps.services.html5.fileReaderFactory");

		var fileReaderMock = jasmine.createSpyObj("fileReader",
												   ["abort",
												    "readAsText"])
		factorySpy.andReturn(fileReaderMock);
		return factorySpy;
	});
angular.module("mocks.chromeApps.services.adapters.html5.fileSystemWrapper", ["mocks.chromeApps.services.native.html5.html5Mocks", "mocks.chromeApps.services.adapters.html5.directoryEntryWrapper"])
	.factory("chromeApps.services.adapters.html5.fileSystemWrapper",
			 ["mocks.html5.fileSystem", "$q", "chromeApps.services.adapters.html5.directoryEntryWrapper",
				 function (fileSystem, $q, directoryEntryWrapper) {

		var spy = jasmine.createSpy("chromeApps.services.adapters.html5.fileSystemWrapper");
		var fileSystemAdapterMock = jasmine.createSpyObj("chromeApps.services.adapters.html5.fileSystemAdapter",
									["getRoot"])
		fileSystemAdapterMock.getRoot.andReturn(directoryEntryWrapper);

		spy.andReturn(fileSystemAdapterMock);
		return spy;
	}]);
angular.module("mocks.chromeApps.services.adapters.html5.fileWriterWrapper", [])
	.factory("chromeApps.services.adapters.html5.fileWriterWrapper",
			 ["$q", function ($q) {

		var spy = jasmine.createSpy("chromeApps.services.adapters.html5.fileWriterWrapper");
		var fileWriterAdapterMock = jasmine.createSpyObj("chromeApps.services.adapters.html5.fileWriterAdapter",
									["deleteFileContent",
									 "writing"])
		fileWriterAdapterMock.$deferred = {
			deleteFileContent: $q.defer(),
			writing: $q.defer()
		}
		 fileWriterAdapterMock.deleteFileContent.andReturn(fileWriterAdapterMock.$deferred.deleteFileContent.promise);
		 fileWriterAdapterMock.writing.andReturn(fileWriterAdapterMock.$deferred.writing.promise);

		spy.andReturn(fileWriterAdapterMock);
		return spy;
	}]);
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
angular.module("mocks.chromeApps.services.native.chrome.chromeAppsApi", ["mocks.chromeApps.services.adapters.html5.fileSystemWrapper"])
	.factory("chromeApps.services.native.chrome.chromeAppsApi",
	["chromeApps.services.adapters.html5.fileSystemWrapper", "$q",
		function (fileSystemWrapper, $q) {

		var mock = {
			syncFileSystem: {
				requestFileSystem: jasmine.createSpy("syncFileSystem.requestFileSystem")
					.andCallFake(function(callback){
					callback (fileSystemWrapper);
				})
			},
			setConflictResolutionPolicy: function(){

			},
			getConflictResolutionPolicy: function(){

			},
			getUsageAndQuota: function(){

			},
			getFileStatus: function(){

			},
			getFileStatuses: function(){

			},
			getServiceStatus: function(){

			}

		}

		return mock;
	}]);
angular.module("mocks.chromeApps.services.native.html5.html5Mocks", [])
	.factory("mocks.html5.fileWriter", function ($q) {

		var mock = jasmine.createSpyObj("html5.fileWriter",
			["write", "truncate"]);

		return mock;
	})

	.factory("mocks.html5.directoryEntry", function ($q) {

		var mock = {
			getDirectory: function(){},
			getFile: jasmine.createSpy("mocks.html5.directoryEntry.getFile")
		}

		return mock;
	})

	.factory("mocks.html5.fileSystem", ["mocks.html5.directoryEntry", "$q",
		function (directoryEntry, $q) {

			var mock = {root: directoryEntry}
			return mock;
	}])

	.factory("mocks.html5.fileEntry", ["$q",
		function ($q) {

			var mock = jasmine.createSpyObj("mocks.html5.fileEntry",
						["createWriter", "file"])
			return mock;
		}])

	.factory("mocks.html5.file", [
		function () {

			var mock = {};
			mock.name = "fileName";
			mock.lastModified = "lastModified";
			return mock;
		}])