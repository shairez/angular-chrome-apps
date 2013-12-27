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