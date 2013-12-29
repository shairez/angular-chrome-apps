angular.module("mocks.chromeApps.services.adapters.html5.fileReaderFactory", [])
	.factory("chromeApps.services.adapters.html5.fileReaderFactory", function ($q) {

		var factorySpy = jasmine.createSpy("chromeApps.services.html5.fileReaderFactory");

		var fileReaderMock = jasmine.createSpyObj("fileReader",
												   ["abort",
												    "readAsText"])
		factorySpy.andReturn(fileReaderMock);
		return factorySpy;
	});