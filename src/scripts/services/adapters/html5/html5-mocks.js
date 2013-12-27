angular.module("mocks.chromeApps.services.adapters.html5.html5Mocks", [])
	.factory("mocks.html5.fileWriter", function ($q) {

		var mock = jasmine.createSpyObj("html5.fileWriter",
			["write", "truncate"]);

		return mock;
	})

	.factory("mocks.html5.directoryEntry", function ($q) {

		var mock = {getDirectory: function(){}}

		return mock;
	})

	.factory("mocks.html5.fileSystem", ["mocks.html5.directoryEntry", "$q",
		function (directoryEntry, $q) {

			var mock = {root: directoryEntry}
			return mock;
	}])