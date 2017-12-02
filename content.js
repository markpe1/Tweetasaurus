/* content.js */

// var head = document.getElementsByTagName('head')[0];
// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = "https://apis.google.com/js/client.js?onload=callbackFunction";
// head.appendChild(script);

var count = 0; // Count for number of offensive words detected in the tweet

// Dictionary for negative words
var dictionary = ["fagot", "fuckwit", "cocksucker", "dumbass", "asshat", "shithead", "prick", "horseshit", "dogshit", "shitty", "apeshit", "arsehole", "asshole", "bastard", "bitch", "bollocks", "bullshit", "bunghole", "butthole",
"cock", "cunt", "dickhead", "faggot", "fucker", "fucking", "goddamn", "jackass", "motherfucker", "penis", "pussy", "fucker",
"damn", "shit", "slut", "puss", "fuck", "ass", "whore", "fag", "dick", "cock"];

// // Display for toxicity level
// var tox = '<div id="tox">Toxicity Level: <span id="level">0</span></div>';
// document.querySelector(".tweet-content").innerHTML += tox;

// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = "https://apis.google.com/js/client.js?onload=callbackFunction";

// /* ---Code where I'm trying to use Perspective API--- */
// function start() {
// 	// Initializes the client with the API key and the Translate API.
// 	gapi.client.init({
// 		'apiKey': 'AIzaSyCBaDLlgq68ndq2SfBUH22cnhYaNBB0f7Q',
// 	  	'discoveryDocs': ['https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1'],
// 	}).then(function() {
// 	  	// Executes an API request, and returns a Promise.
// 	  	var analyzeRequest = {
// 			comment: {text: 'Jiminy cricket! Well gosh durned it! Oh damn it all!'},
// 			requestedAttributes: {'TOXICITY': {}}
// 	  	};
	
// 	  	return gapi.client.comments.analyze({key: API_KEY, resource: analyzeRequest}, (err, response) => {
// 			if (err) throw err;
// 			console.log(JSON.stringify(response, null, 2));
// 	  	});
// 		// }).then(function(response) {
// 		//   console.log(response.result.data.translations[0].translatedText);
// 		// }, function(reason) {
// 		//   console.log('Error: ' + reason.result.error.message);
// 	});
// };

// // Loads the JavaScript client library and invokes `start` afterwards.
// gapi.load('client', start);
// /* ---End Perspective API code--- */


// Event listener for getting text from tweet
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
		// Select the div that includes the text
		var addedWords = [];
		var contains = false;
		var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div");
		var orig = elem.outerHTML;
		var textBox = orig.toLowerCase();
		var style = orig;
			
		// Change the color of the text for negative words
		for (var i = 0; i < dictionary.length; i++) {
			if (textBox.indexOf(dictionary[i]) !== -1) {
				for (var j = 0; j < addedWords.length; j++) {
					if (addedWords[j].indexOf(dictionary[i]) !== -1) {
						contains = true;
					}
				}
				if (!contains) {
					var newstyle = style.replace(new RegExp(preg_quote( dictionary[i] ), 'gi' ), '<span style="color:red ! important;">' + dictionary[i] + '</span>');
					style = newstyle;
					chrome.runtime.sendMessage({"message": dictionary[i]});
					addedWords.push(dictionary[i])
				}
				contains = false;
			} 
		}

		// Update the style and the tweet box
		elem.outerHTML = style;
    }
    else {
        var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div");
        var textBox = elem.outerHTML;
		var style = textBox;
		
    	pair = request.message.split(" ")
    	var newstyle = style.replace(new RegExp(pair[1], 'g'), '<span style="color:black ! important;">' + pair[0] + '</span>');
        style = newstyle
        textBox = style;
        elem.outerHTML = textBox;
    }
  }
)

addEventListener("keyup", function(event) {
  var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div");
  var addedWords = [];
  var contains = false;
  var textBox = elem.outerHTML;
  var style = textBox;
	
	// Change the color of the text for negative words
	for (var i = 0; i < dictionary.length; i++) {
    	for (var j = 0; j < addedWords.length; j++) {
      		if (addedWords[j].indexOf(dictionary[i]) !== -1) {
        		contains = true;
      		}
    	}
		if (contains == false) {
			var newstyle = style.replace(new RegExp(preg_quote( dictionary[i] ), 'gi' ), '<span style="color:red ! important;">' + dictionary[i] + '</span>');
			if (!(newstyle === style)) {
				count++;
				addedWords.push(dictionary[i])
			}
    	}
		contains = false;
	}
	chrome.runtime.sendMessage({"message": count});
	count = 0;
})

function preg_quote( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: preg_quote("$40");
    // *     returns 1: '\$40'
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: '\*RRRING\* Hello\?'
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

    return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}
