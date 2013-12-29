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