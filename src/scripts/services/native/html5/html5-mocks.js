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