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