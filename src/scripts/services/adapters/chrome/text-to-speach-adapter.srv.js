angular.module("chromeApps")
	.factory("chromeApps.services.adapters.chrome.textToSpeechAdapter",
		["chromeApps.services.native.chrome.chromeAppsApi",
		 function (chrome) {
			var tts = chrome.tts;
			return {
				speak: function(text){
					tts.speak(text);
				}
			};
	}]);