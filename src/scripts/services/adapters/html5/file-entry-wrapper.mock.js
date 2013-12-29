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