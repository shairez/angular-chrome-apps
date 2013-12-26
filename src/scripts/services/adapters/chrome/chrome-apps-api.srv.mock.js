angular.module("mocks.chromeApps.services.adapters.chrome.chromeAppsApi", [])
	.factory("chromeApps.services.adapters.chrome.chromeAppsApi", function ($q) {

		var responses = {
			syncFileSystem: {
				requestFileSystem: "fileSystem"
			}
		}

		var mock = {
			responses: responses,

			syncFileSystem: {
				requestFileSystem: function(callback){
					callback (responses.syncFileSystem.requestFileSystem);
				}
			}
		}


		return mock;
	});