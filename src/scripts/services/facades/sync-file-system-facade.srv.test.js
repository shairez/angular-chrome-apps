xdescribe("syncFileSystem", function () {

	var service,
		$rootScope,
		fileReaderFactorySpy;

	beforeEach(module("chromeApps"));
	beforeEach(module("mocks.chromeApps.services.adapters.html5.fileReaderFactory"));
	beforeEach(module("mocks.chromeApps.services.adapters.chrome.syncFileSystemAdapter"));

	beforeEach(inject(["chromeApps.services.facades.syncFileSystemFacade",
					   "$rootScope", "fileReaderFactory",

		function (syncFileSystem,
				  _$rootScope) {

			service = syncFileSystem
			$rootScope = _$rootScope;
			fileReaderFactorySpy = fileReaderFactory;
	}]));

	describe("it should return a file content promise", function(){
		var content = "test content";
		var fileReaderMock;
		Given(function () {
			fileReaderMock = fileReaderFactorySpy();

		});
		When(function () {

		});
		Then(function () {
		});
	})

});

