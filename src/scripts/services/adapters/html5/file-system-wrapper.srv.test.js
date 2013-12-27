describe("fileSystemWrapper", function(){

	var service,
		fileSystemMock,
		result,
		directoryEntryWrapperMock;

	beforeEach(module("chromeApps"));
	beforeEach(module("mocks.chromeApps.services.adapters.html5.html5Mocks"));
	beforeEach(module("mocks.chromeApps.services.adapters.html5.directoryEntryWrapper"));

	beforeEach(inject(["chromeApps.services.adapters.html5.fileSystemWrapper",
					   "chromeApps.services.adapters.html5.directoryEntryWrapper",
					   "mocks.html5.fileSystem",
						"mocks.html5.directoryEntry",
						"$rootScope",
		function(fileSystemWrapper,
		         directoryEntryWrapper,
		         fileSystem,
		         directoryEntry,
		         _$rootScope){
			fileSystemMock = fileSystem;
			directoryEntryWrapperMock = directoryEntryWrapper;
			$rootScope = _$rootScope;
			service = fileSystemWrapper(fileSystemMock);

	}]));

	describe("getting root", function(){

		When(function(){ result = service.getRoot(); });

		Then(function(){ expect(directoryEntryWrapperMock).toHaveBeenCalledWith(fileSystemMock.root); });

	});
});