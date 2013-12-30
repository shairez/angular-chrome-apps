angular.module("chromeApps")
	.factory("chromeApps.services.facades.fileSystemFacade",
			 ["chromeApps.services.adapters.chrome.fileSystemAdapter",
			  "chromeApps.services.adapters.html5.fileReaderAdapter",
			  "chromeApps.constants.ioTypes",
			  function (fileSystemAdapter,
			            fileReaderAdapter,
	                    ioTypes) {

		function writingFileTextByEntry(fileEntryWrapper, text){
			return fileEntryWrapper.creatingWriter().then(function (writerWrapper){
				text = text || "";
				return writerWrapper.writing(text, ioTypes.TEXT, true);
			})
		}

		return {
			loadingTextFile: function(){
			    return fileSystemAdapter.choosingEntry({type:"openFile"})
				    .then(function success(fileEntryWrapper){
				    return fileEntryWrapper.gettingFile().then(function success(file){
					    return fileReaderAdapter.gettingFileContent(file, ioTypes.TEXT);
				    })
			    })
			}
//			savingTextToFile: function(filename, text){
//				return gettingFileEntryByName(filename).then(function(fileEntryWrapper){
//					return writingFileTextByEntry(fileEntryWrapper, text);
//				})
//			}
		};

}]);