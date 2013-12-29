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