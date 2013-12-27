describe("fileWriterWrapper", function(){

	var service,
		fileWriterMock,
		result,
		errorResult,
		ioTypes;

	beforeEach(module("chromeApps"));
	beforeEach(module("mocks.chromeApps.services.adapters.html5.html5Mocks"));

	beforeEach(inject(["chromeApps.services.adapters.html5.fileWriterWrapper",
					   "mocks.html5.fileWriter", "$rootScope",
						"chromeApps.constants.ioTypes",
		function(fileWriterWrapper,
				 fileWriter, _$rootScope,
				 _ioTypes){
			fileWriterMock = fileWriter;
			$rootScope = _$rootScope;
			ioTypes = _ioTypes;
			service = fileWriterWrapper(fileWriter);

	}]));

	describe("writing", function(){
		var overwrite, content, writeType;

		When(function(){
			result = service.writing(content, writeType, overwrite)
				.then(function success(value){
						result = value;
					},
					function error(error){
						errorResult = error;
					});
			$rootScope.$digest();
		});

		Then(function(){
			expect(fileWriterMock.write).toHaveBeenCalled();
		});

		describe("write successful", function () {
			Given(function(){
				fileWriterMock.write.andCallFake(function(){
					fileWriterMock.onwrite({target: "mockTarget"});
				})
			});
			Then(function(){
				expect(result).toBe("mockTarget")
			});

			describe("Called with correct args", function () {
				Given(function(){ writeType = ioTypes.TEXT; });

				Then(function(){
					expect(fileWriterMock.write).toHaveBeenCalledWith(jasmine.any(Object),
																	  {type:"text/plain"});
				});

			});
		});

		describe("return a rejected error on write fail", function () {
			Given(function(){
				fileWriterMock.write.andCallFake(function(){
					fileWriterMock.onerror({target: {error: "ERROR"}});
				})
			});
			Then(function(){
				expect(errorResult).toBe("ERROR")
			});
		});

		describe("overwrite", function () {
			describe("false", function () {
				Given(function(){
					overwrite = false;
				});
				Then(function(){
					expect(fileWriterMock.write).toHaveBeenCalled();
					expect(fileWriterMock.truncate).not.toHaveBeenCalled();
				});
			});
			describe("true", function () {
				Given(function(){
					overwrite = true;

				});
				describe("length is not zero", function () {
					Given(function(){
						fileWriterMock.length = 4;
						fileWriterMock.truncate.andCallFake(function(){
							fileWriterMock.onwrite({target: null});
						})
					});
					Then(function(){
						expect(fileWriterMock.truncate).toHaveBeenCalled();
						expect(fileWriterMock.write).toHaveBeenCalled();
					});
				});

				describe("length is zero", function () {
					Given(function(){
						fileWriterMock.length = 0;
						service.deleteFileContent = jasmine.createSpy("deleteFileContent");
					});
					Then(function(){
						expect(fileWriterMock.write).toHaveBeenCalled();
						expect(service.deleteFileContent).not.toHaveBeenCalled();
					});
				});

			});
		});

	});

	describe("deleteFileContent", function(){

		When(function(){
			result = service.deleteFileContent()
				.then(function success(value){
					result = value;
				},
				function error(error){
					errorResult = error;
				});
			$rootScope.$digest();
		});

		Then(function(){
			expect(fileWriterMock.truncate).toHaveBeenCalledWith(0);
		});

		describe("delete successful", function () {
			Given(function(){
				fileWriterMock.truncate.andCallFake(function(){
					fileWriterMock.onwrite({target: "mockTarget"});
				})
			});
			Then(function(){
				expect(result).toBe("mockTarget")
			});
		});

		describe("return a rejected error on write fail", function () {
			Given(function(){
				fileWriterMock.truncate.andCallFake(function(){
					fileWriterMock.onerror({target: {error: "ERROR"}});
				})
			});
			Then(function(){
				expect(errorResult).toBe("ERROR")
			});
		});
	});
});