// content.js


// Gets the text in the tweet-box if there is existing text
// --> Need to figure out how to make event handlers for Chrome extensions
setTimeout(function() { 
    if (document.querySelector("#tweet-box-home-timeline") && document.querySelector("#tweet-box-home-timeline").querySelector("div")) {
        console.log(document.querySelector("#tweet-box-home-timeline").querySelector("div").innerText);
    }
}, 0);

  addEventListener("keypress", function(event) {
  	if (document.querySelector("#tweet-box-home-timeline") && document.querySelector("#tweet-box-home-timeline").querySelector("div")) {
        var textBox = document.querySelector("#tweet-box-home-timeline").querySelector("div").innerText
        console.log(textBox)
	}
  	function abbreviate(string) {
	  var words = string.split(" ");
	  for (var i = 0; i < words.length; i += 1) {

	  var count = words[i].length - 2;
	  var last = words[i].charAt(words[i].length - 1);
	  answer= answer + words[i][0] + count + last;
	  }
	return answer;
	}
    console.log(String.fromCharCode(event.charCode));
  });

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "clicked_browser_action" ) {
//       var firstHref = $("a[href^='http']").eq(0).attr("href");

//       console.log(firstHref);

//       // This line is new!
//       chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
//     }
//   }
// );