describe("directoryEntryWrapper", function(){

    var service,
	    fileName,
	    options,
	    directoryEntryMock,
	    result,
	    errorResult,
	    fileEntryMock,
	    fileEntryWrapperMock,
	    $rootScope;

    beforeEach(module("chromeApps"));
    beforeEach(module("mocks.chromeApps.services.native.html5.html5Mocks"));
    beforeEach(module("mocks.chromeApps.services.adapters.html5.fileEntryWrapper"));

    beforeEach(inject(["chromeApps.services.adapters.html5.directoryEntryWrapper",
	                   "mocks.html5.directoryEntry",
					    "mocks.html5.fileEntry",
					    "chromeApps.services.adapters.html5.fileEntryWrapper",
	                    "$rootScope",
	    function(directoryEntryWrapper,
	             directoryEntry,
	             fileEntry,
	             fileEntryWrapper,
		         _$rootScope){
		    directoryEntryMock = directoryEntry;
            service = directoryEntryWrapper(directoryEntryMock);
		    fileEntryMock = fileEntry;
		    fileEntryWrapperMock = fileEntryWrapper;
		    $rootScope = _$rootScope;

    }]));

    describe("getting the file entry", function(){
		var mockError = "Some Error";
        When(function(){
	        service.gettingFileEntry(fileName, options)
	        .then(function success(value){
		        result = value;
		     },
		       function (error){
			     errorResult = error;
		    })
	        $rootScope.$apply();
        });

	    Then(function(){
		    expect(directoryEntryMock.getFile).toHaveBeenCalled();
	    });

	    describe("should get a wrapper on success", function () {
		    Given(function(){
			    directoryEntryMock.getFile.andCallFake(function(fileName,options,successCallback,errorCallback){
				    successCallback(fileEntryMock);
			    })
		    });
		    Then(function(){
			    expect(fileEntryWrapperMock).toHaveBeenCalledWith(fileEntryMock);
			    expect(result).toBe(fileEntryWrapperMock(fileEntryMock));
		    });
	    });

	    describe("should reject a promise on error", function () {
		    Given(function(){
			    directoryEntryMock.getFile.andCallFake(function(fileName,options,successCallback,errorCallback){
				    errorCallback(mockError);
			    })
		    })
		    Then(function(){
			    expect(errorResult).toBe(mockError);
		    });
	    });
    });
    
});