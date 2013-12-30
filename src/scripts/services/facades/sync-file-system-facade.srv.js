angular.module("chromeApps")
	.factory("chromeApps.services.facades.syncFileSystemFacade",
			 ["chromeApps.services.adapters.chrome.syncFileSystemAdapter",
			  "chromeApps.services.adapters.html5.fileReaderAdapter",
			  "chromeApps.constants.ioTypes",
			  function (syncFileSystemAdapter,
			            fileReaderAdapter,
	                    ioTypes) {

		function gettingFileEntryByName(fileName){
			return syncFileSystemAdapter.requestingFileSystem().then(function(fileSystemWrapper){
				return fileSystemWrapper.getRoot().gettingFileEntry(fileName, {create:true});
			})
		}

		function writingFileTextByEntry(fileEntryWrapper, text){
			return fileEntryWrapper.creatingWriter().then(function (writerWrapper){
				text = text || "";
				return writerWrapper.writing(text, ioTypes.TEXT, true);
			})
		}

		return {
			gettingTextFromFile: function(fileName){
			    return gettingFileEntryByName(fileName).then(function success(fileEntryWrapper){
				    return fileEntryWrapper.gettingFile().then(function success(file){
					    return fileReaderAdapter.gettingFileContent(file, ioTypes.TEXT);
				    })
			    })
			},
			savingTextToFile: function(filename, text){
				return gettingFileEntryByName(filename).then(function(fileEntryWrapper){
					return writingFileTextByEntry(fileEntryWrapper, text);
				})
			}
		};

}]);