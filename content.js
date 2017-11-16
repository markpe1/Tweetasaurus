/* content.js */

var count = 0;

// Event listener for getting text from tweet
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
		// Select the div that includes the text
        var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div");
        var textBox = elem.outerHTML;
		var style = textBox;

		// Dictionary of negative words
		var dictionary = ["apeshit", "arsehole", "ass", "asshole", "bastard", "bitch", "bollocks", "bullshit", "bunghole", "butthole",
			 "cock", "cocks", "cunt", "dick", "dickhead", "faggot", "fuck", "fucker", "fucking", "goddamn", "jackass", "motherfucker", "penis", "pussy", "schlong", "shit", "shitty", "slut"];
		
		// Change the color of the text for negative words
        for (var i = 0; i < dictionary.length; i++) {
			if (textBox.indexOf(dictionary[i]) !== -1) {
				var newstyle = style.replace(new RegExp(dictionary[i], 'g'), '<span style="color:red ! important;">' + dictionary[i] + '</span>');
				style = newstyle;
				chrome.runtime.sendMessage({"message": dictionary[i]});
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
);

addEventListener("keydown", function(event) {
  	var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div");
	var textBox = elem.outerHTML;
	var style = textBox;

	// Array for negative test words
	var dictionary = ["apeshit", "arsehole", "ass", "asshole", "bastard", "bitch", "bollocks", "bullshit", "bunghole", "butthole",
			 "cock", "cocks", "cunt", "dick", "dickhead", "faggot", "fuck", "fucker", "fucking", "goddamn", "jackass", "motherfucker", "penis", "pussy", "schlong", "shit", "shitty", "slut"];
	
	// Change the color of the text for negative words
	for (var i = 0; i < dictionary.length; i++) {
		var newstyle = style.replace(new RegExp(dictionary[i], 'g'), '<span style="color:red ! important;">' + dictionary[i] + '</span>');
		if (!(newstyle === style)) {
			count++;
		}
	}
	chrome.runtime.sendMessage({"message": count});
	count = 0;
})

