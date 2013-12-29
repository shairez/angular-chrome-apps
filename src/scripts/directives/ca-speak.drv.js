angular.module("chromeApps").directive("caSpeak", [function () {

	return {
		link: function (scope, element, attrs) {
			element.on("click", function(){
				scope.$apply(function(){
					chrome.tts.speak(attrs.caSpeak);
				})
			})

		}
	}
}])


