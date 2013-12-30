angular.module("mocks.chromeApps.services.facades.syncFileSystemFacadeFacade", [])
	.factory("chromeApps.services.facades.syncFileSystemFacadeFacade", function ($q) {

		var mock = jasmine.createSpyObj("chromeApps.services.facades.syncFileSystemFacadeFacade",
			["gettingTextFromFile",
			 "savingTextToFile"]);

		mock.$deferred = {
			gettingTextFromFile: $q.defer()
		}
		mock.gettingTextFromFile.andReturn(mock.$deferred.gettingTextFromFile.promise);
		return mock;
	});