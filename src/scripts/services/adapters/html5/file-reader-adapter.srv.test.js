describe("fileReaderAdapter", function(){

    var service,
	    result,
	    errorResult,
	    fileReaderFactoryMock,
	    fileReaderMock,
	    ioTypes,
	    $rootScope;

    beforeEach(module("chromeApps"));
    beforeEach(module("mocks.chromeApps.services.adapters.html5.fileReaderFactory"));

    beforeEach(inject(["chromeApps.services.adapters.html5.fileReaderAdapter",
	    "chromeApps.services.adapters.html5.fileReaderFactory",
	    "chromeApps.constants.ioTypes", "$rootScope",
	    function(fileReaderAdapter,
	             fileReaderFactory,
	             _ioTypes, _$rootScope){
            service = fileReaderAdapter;
		    fileReaderFactoryMock = fileReaderFactory;
		    fileReaderMock = fileReaderFactoryMock();
		    ioTypes = _ioTypes;
		    $rootScope = _$rootScope;
    }]));

    describe("it should read text when getting text readType", function(){
	    var readText,
		    readType,
		    file;

        Given(function(){
	        readText="some text";
	        readType=ioTypes.TEXT;
	        file = {filename:""};
	        fileReaderMock.readAsText.andCallFake(function(){
		        fileReaderMock.onload({target: {result: readText}});
	        })
        });
        When(function(){
	        service.gettingFileContent(file, readType).then(
		        function success(value){
		        result = value;
	        },
	        function error(error){
		        errorResult = error;
	        });
	        $rootScope.$apply();
        });
        Then(function(){
	        expect(fileReaderMock.readAsText).toHaveBeenCalledWith(file);
	        expect(result).toBe(readText);
        });

	    describe("When no readType", function () {
		    Given(function(){ readType=null; });
		    Then(function(){
			    expect(fileReaderMock.readAsText).not.toHaveBeenCalled();
			    expect(errorResult).toBe("readType is not defined");
		    });
	    });

	    describe("Should reject with error", function () {

		    Given(function(){
			    fileReaderMock.readAsText.andCallFake(function(){
				    fileReaderMock.onerror({target: {error: readText}});
			    })
		    });
		    Then(function(){
			    expect(errorResult).toBe(readText);
		    });
	    });
    });


    
});