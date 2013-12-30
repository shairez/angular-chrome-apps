angular.module("chromeApps").directive("caSpeak",
	["chromeApps.services.adapters.chrome.textToSpeechAdapter",
		function (textToSpeechAdapter) {

	return {
		link: function (scope, element, attrs) {
			element.on("click", function(){
				scope.$apply(function(){
					textToSpeechAdapter.speak(attrs.caSpeak);
				})
			})

		}
	}
}])