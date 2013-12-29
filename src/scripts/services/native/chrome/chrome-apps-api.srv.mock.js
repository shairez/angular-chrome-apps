angular.module("mocks.chromeApps.services.native.chrome.chromeAppsApi", ["mocks.chromeApps.services.adapters.html5.fileSystemWrapper"])
	.factory("chromeApps.services.native.chrome.chromeAppsApi",
	["chromeApps.services.adapters.html5.fileSystemWrapper", "$q",
		function (fileSystemWrapper, $q) {

		var mock = {
			syncFileSystem: {
				requestFileSystem: jasmine.createSpy("syncFileSystem.requestFileSystem")
					.andCallFake(function(callback){
					callback (fileSystemWrapper);
				})
			},
			setConflictResolutionPolicy: function(){

			},
			getConflictResolutionPolicy: function(){

			},
			getUsageAndQuota: function(){

			},
			getFileStatus: function(){

			},
			getFileStatuses: function(){

			},
			getServiceStatus: function(){

			}

		}

		return mock;
	}]);