/* content.js */
// $("#tweet-box-home-timeline").focus( function() {
//     $("#tweet-box-home-timeline").css("color","#FF0000");
// });
// $("#tweet-box-home-timeline").on('mousedown', function(e) { 
//   e.stopImmediatePropagation();
//   e.preventDefault(); 
// });
var count = 0;

// Event listener for getting text from tweet
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
    	console.log($("#tweet-box-home-timeline"))
		// Select the div that includes the text
        var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div");
        var textBox = elem.outerHTML;
		var style = textBox;
		
		// $("#tweet-box-home-timeline").focus( function() {
  //       	$("#tweet-box-home-timeline").css("color","#FF0000");
  //  		});

		// Array for negative test words
		var words = ["shit", "bitch", "asshole", "fucker"];
		
		// Change the color of the text for negative words
        for (var i = 0; i < words.length; i++) {
        	var newstyle = style.replace(new RegExp(words[i], 'g'), '<span style="color:red ! important;">' + words[i] + '</span>');
        	style = newstyle
        	chrome.runtime.sendMessage({"message": words[i]});
        }
	    

	    textBox = style;
		console.log(textBox);
		
		// Update the style
	    elem.outerHTML = textBox;
    }
    else 
    {
        var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div");
        var textBox = elem.outerHTML;
		var style = textBox;
		
    	console.log(request.message)
    	pair = request.message.split(" ")
    	var newstyle = style.replace(new RegExp(pair[1], 'g'), '<span style="color:black ! important;">' + pair[0] + '</span>');
        style = newstyle
        textBox = style;
        elem.outerHTML = textBox;
    }
  }
);

  addEventListener("keypress", function(event) {
  	var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div");
        var textBox = elem.outerHTML;
		var style = textBox;
		
		// $("#tweet-box-home-timeline").focus( function() {
  //       	$("#tweet-box-home-timeline").css("color","#FF0000");
  //  		});

		// Array for negative test words
		var words = ["shit", "bitch", "asshole", "fucker"];
		
		// Change the color of the text for negative words
        for (var i = 0; i < words.length; i++) {
        	var newstyle = style.replace(new RegExp(words[i], 'g'), '<span style="color:red ! important;">' + words[i] + '</span>');
        	if (!(newstyle === style)) 
        	{
        		count++;
        	}
        }
        chrome.runtime.sendMessage({"message": count})
        count = 0
  })

