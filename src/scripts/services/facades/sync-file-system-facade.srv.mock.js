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