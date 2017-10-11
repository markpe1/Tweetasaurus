// content.js

alert("You are on Twitter");
    

// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
        var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div")
        var textBox = elem.outerHTML
        var style = textBox
        var words = ["idiot", "dummy", "jerk"]
        for (var i = 0; i < words.length; i++)
        {
        	style = style.replace(new RegExp(words[i], 'g'), '<span style="color:red ! important;">' + words[i] + '</span>');
        }
	    
	    textBox = style;
	    console.log(textBox)
	    elem.outerHTML = textBox
    }
  }
);