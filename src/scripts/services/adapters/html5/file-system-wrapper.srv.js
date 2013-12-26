angular.module("chromeApps")
	.factory("chromeApps.services.adapters.html5.fileSystemWrapper",
		["$q", "chromeApps.services.adapters.html5.directoryEntryWrapper",
			function ($q, directoryEntryWrapper) {
		return function(fileSystem){
			var fileSystem = fileSystem;

			return {
				getRoot: function(){
					return directoryEntryWrapper(fileSystem.root);
				}
			}

		}

	}]);