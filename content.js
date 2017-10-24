/* content.js */
	
// Event listener for getting text from tweet
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
    	console.log($("#tweet-box-home-timeline"))
		// Select the div that includes the text
        var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div");
        var textBox = elem.outerHTML;
		var style = textBox;
		


		// Array for negative test words
		var words = ["idiot", "dummy", "jerk"];
		
		// Change the color of the text for negative words
        for (var i = 0; i < words.length; i++) {
        	style = style.replace(new RegExp(words[i], 'g'), '<span style="color:red ! important;">' + words[i] + '</span>');
        }
	    
	    textBox = style;
		console.log(textBox);
		
		// Update the style
	    elem.outerHTML = textBox;
    }
  }
);