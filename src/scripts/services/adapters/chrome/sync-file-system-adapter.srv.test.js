describe("syncFileSystemAdapter", function(){

    var service,
	    $rootScope,
	    fileSystemWrapperSpy,
	    chromeAppsApiMock;

    beforeEach(module("chromeApps"));
    beforeEach(module("mocks.chromeApps.services.adapters.html5.fileSystemWrapper"));
    beforeEach(module("mocks.chromeApps.services.adapters.chrome.chromeAppsApi"));

    beforeEach(inject(["$rootScope",
	                   "chromeApps.services.adapters.chrome.syncFileSystemAdapter",
	                   "chromeApps.services.adapters.html5.fileSystemWrapper",
	                    "chromeApps.services.adapters.chrome.chromeAppsApi",
	           function(_$rootScope,
		                syncFileSystemAdapter,
	                    fileSystemWrapper,
	                    chromeAppsApi){
					$rootScope = _$rootScope;
					service = syncFileSystemAdapter;
		            fileSystemWrapperSpy = fileSystemWrapper;
		           chromeAppsApiMock = chromeAppsApi
    }]));

    describe("it should wrap the chrome filesystem object", function(){
	    var fileSystem,
		    wrappedFileSystem,
	        promiseResult;

        Given(function(){
	        fileSystem = "testFileSystem";
	        wrappedFileSystem = "wrappedFileSystem";
	        chromeAppsApiMock.responses.syncFileSystem.requestFileSystem = fileSystem;
	        fileSystemWrapperSpy.andReturn(wrappedFileSystem);
        });
        When(function(){
	        service.requestingFileSystem().then(function(result){
		        promiseResult = result;
	        });
	        $rootScope.$apply();
        });
        Then(function(){
	        expect(fileSystemWrapperSpy).toHaveBeenCalledWith(fileSystem);
	        expect(promiseResult).toBe(wrappedFileSystem);
        });

    });

});