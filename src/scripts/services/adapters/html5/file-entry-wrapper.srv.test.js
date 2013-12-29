describe("fileEntryWrapper", function(){

    var service,
	    fileEntryMock,
	    result,
	    errorResult,
	    fileWriter,
	    fileWriterWrapperMock,
	    $rootScope,
	    fileMock;

    beforeEach(module("chromeApps"));
    beforeEach(module("mocks.chromeApps.services.native.html5.html5Mocks"));
    beforeEach(module("mocks.chromeApps.services.adapters.html5.fileWriterWrapper"));

    beforeEach(inject(["chromeApps.services.adapters.html5.fileEntryWrapper",
	                   "mocks.html5.fileEntry",
					    "mocks.html5.fileWriter",
					    "chromeApps.services.adapters.html5.fileWriterWrapper",
	                    "$rootScope",
	                    "mocks.html5.file",
	    function(fileEntryWrapper,
	             fileEntry,
	             fileWriter,
	             fileWriterWrapper,
		         _$rootScope,
		         file){
		    fileEntryMock = fileEntry;
            service = fileEntryWrapper(fileEntryMock);
		    fileWriterMock = fileWriter;
		    fileWriterWrapperMock = fileWriterWrapper;
		    $rootScope = _$rootScope;
		    fileMock = file;

    }]));

    describe("Creating a writer", function(){
		var mockError = "Some Error";
        When(function(){
	        service.creatingWriter()
		        .then(function success(value){  result = value; },
			          function (error){ errorResult = error; })
	        $rootScope.$apply();
        });

	    Then(function(){
		    expect(fileEntryMock.createWriter).toHaveBeenCalled();
	    });

	    describe("should return a wrapper on success", function () {
		    Given(function(){
			    fileEntryMock.createWriter.andCallFake(function(successCallback){
				    successCallback(fileWriterMock);
			    })
		    });
		    Then(function(){
			    expect(fileWriterWrapperMock).toHaveBeenCalledWith(fileWriterMock);
			    expect(result).toBe(fileWriterWrapperMock(fileWriterMock));
		    });
	    });

	    describe("should reject a promise on error", function () {
		    Given(function(){
			    fileEntryMock.createWriter.andCallFake(function(successCallback,errorCallback){
				    errorCallback(mockError);
			    })
		    })
		    Then(function(){
			    expect(errorResult).toBe(mockError);
		    });
	    });
    });


	describe("getting a file", function(){
		var mockError = "Some Error";
		When(function(){
			service.gettingFile()
				.then(function success(value){  result = value; },
					  function (error){ errorResult = error; })
			$rootScope.$apply();
		});

		Then(function(){
			expect(fileEntryMock.file).toHaveBeenCalled();
		});

		describe("should return a file on promise success", function () {
			Given(function(){
				fileEntryMock.file.andCallFake(function(successCallback){
					successCallback(fileMock);
				})
			});
			Then(function(){
				expect(fileEntryMock.file).toHaveBeenCalled();
				expect(result).toBe(fileMock);
			});
		});

		describe("should reject a promise on error", function () {
			Given(function(){
				fileEntryMock.file.andCallFake(function(successCallback,errorCallback){
					errorCallback(mockError);
				})
			})
			Then(function(){
				expect(errorResult).toBe(mockError);
			});
		});
	});
    
});