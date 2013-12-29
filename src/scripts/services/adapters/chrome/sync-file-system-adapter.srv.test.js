describe("syncFileSystemAdapter", function(){

    var service,
	    $rootScope,
	    fileSystemWrapperSpy,
	    chromeAppsApiMock;

    beforeEach(module("chromeApps"));
	beforeEach(module("mocks.chromeApps.services.native.html5.html5Mocks"));
    beforeEach(module("mocks.chromeApps.services.adapters.html5.fileSystemWrapper"));
    beforeEach(module("mocks.chromeApps.services.native.chrome.chromeAppsApi"));


    beforeEach(inject(["$rootScope",
	                   "chromeApps.services.adapters.chrome.syncFileSystemAdapter",
	                   "chromeApps.services.adapters.html5.fileSystemWrapper",
	                    "chromeApps.services.native.chrome.chromeAppsApi",
	                    "mocks.html5.fileSystem",
	           function(_$rootScope,
		                syncFileSystemAdapter,
	                    fileSystemWrapper,
	                    chromeAppsApi){
					$rootScope = _$rootScope;
					service = syncFileSystemAdapter;
		            fileSystemWrapperSpy = fileSystemWrapper;
		            chromeAppsApiMock = chromeAppsApi;
    }]));

    describe("it should wrap the chrome filesystem object", function(){
	    var fileSystemAdapterMock,
	        promiseResult;

        Given(function(){ fileSystemAdapterMock = fileSystemWrapperSpy(); });
        When(function(){
	        service.requestingFileSystem().then(function(result){
		        promiseResult = result;
	        });
	        $rootScope.$apply();
        });
        Then(function(){
	        expect(chromeAppsApiMock.syncFileSystem.requestFileSystem).toHaveBeenCalled();
	        expect(promiseResult).toBe(fileSystemAdapterMock);
        });

    });

});