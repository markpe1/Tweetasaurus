/* content.js */

var count = 0; // Count for number of offensive words detected in the tweet

// Dictionary for negative words
var dictionary = ["fagot", "fuckwit", "cocksucker", "dumbass", "asshat", "shithead", "prick", "horseshit", "dogshit", "shitty", "apeshit", "arsehole", "asshole", "bastard", "bitch", "bollocks", "bullshit", "bunghole", "butthole",
"cock", "cunt", "dick", "dickhead", "faggot", "fucker", "fucking", "goddamn", "jackass", "motherfucker", "penis", "pussy", 
"damn", "shit", "slut", "puss", "fuck", "ass", "whore", "fag"];

// Display for toxicity level
var tox = '<div id="tox">Toxicity Level: <span id="level">0</span></div>';
document.querySelector(".tweet-content").innerHTML += tox;

// Event listener for getting text from tweet
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
		// Select the div that includes the text
		var addedWords = [];
		var contains = false;
		var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div");
		var textBox = elem.outerHTML;
		var style = textBox;
			
		// Change the color of the text for negative words
		for (var i = 0; i < dictionary.length; i++) {
			if (textBox.indexOf(dictionary[i]) !== -1) {
				for (var j = 0; j < addedWords.length; j++) {
					if (addedWords[j].indexOf(dictionary[i]) !== -1) {
					contains = true;
					}
				}
				if (contains == false) {
					var newstyle = style.replace(new RegExp(dictionary[i], 'g'), '<span style="color:red ! important;">' + dictionary[i] + '</span>');
					style = newstyle;
					chrome.runtime.sendMessage({"message": dictionary[i]});
					addedWords.push(dictionary[i])
				}
				contains = false;
			} 
		}

		// Update the style and the tweet box
		textBox = style;
		elem.outerHTML = textBox;
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
			var newstyle = style.replace(new RegExp(dictionary[i], 'g'), '<span style="color:red ! important;">' + dictionary[i] + '</span>');
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

