// content.js

// --> Need to figure out how to make event handlers for Chrome extensions
setTimeout(function() { 
    if (document.querySelector("#tweet-box-home-timeline") && document.querySelector("#tweet-box-home-timeline").querySelector("div")) {
    	alert("You are on Twitter")
    	// var old_element = document.querySelector("#tweet-box-home-timeline");
    	// old_element.onfocus = function(){
    	// 	  		var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div")
	     //    var textBox = elem.outerHTML
	     //    // console.log(textBox)
	     //    var style = textBox
	    // style = style.replace('hey', '<span style="color:red ! important;">hey</span>');
	    // // console.log(style)
	    // textBox = style;
	    // console.log(textBox)
	    // elem.outerHTML = textBox


    	}
    	// console.log(old_element.getAttribute("mousedown"))
    	// old_element.removeAttribute("focus")

		// var new_element = old_element.cloneNode(true);
		// old_element.parentNode.replaceChild(new_element, old_element);



		// window.document.removeEventListener("focus", getEventListeners(window.document.keydown[0].listener));  
		// window.document.removeEventListener("focus", getEventListeners(window.document.keydown[0].listener));
    
}, 500);

// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
        var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div")
        var textBox = elem.outerHTML
        // console.log(textBox)
        var style = textBox
        var words = ["idiot", "dummy", "jerk"]
        for (var i = 0; i < words.length; i++)
        {
        	style = style.replace(new RegExp(words[i], 'g'), '<span style="color:red ! important;">' + words[i] + '</span>');
        }
	    
	    // console.log(style)
	    textBox = style;
	    console.log(textBox)
	    elem.outerHTML = textBox
    }
  }
);

  // addEventListener("keypress", function(event) {
  // 	if (document.querySelector("#tweet-box-home-timeline") && document.querySelector("#tweet-box-home-timeline").querySelector("div")) {
  // 		var elem = document.querySelector("#tweet-box-home-timeline").querySelector("div")
  //       var textBox = elem.outerHTML
  //       // console.log(textBox)
  //       var style = textBox
	 //    style = style.replace('hey', '<span style="color:red ! important;">hey</span>');
	 //    // console.log(style)
	 //    textBox = style;
	 //    console.log(textBox)
	 //    elem.outerHTML = textBox

   //     	for (var i = 0; i < words.length; i += 1) {
	  // 		if (words[i] === "hey")
	  // 		{
	  // 			textBox.innerHTML = "<span>" + textBox.split(/\s+/).join("</span> <span") + '</span>';
	  // 			document.querySelector("#tweet-box-home-timeline").querySelector("div").style.borderBottom = "2px red dashed";

	  // 			// console.log(textBox)

	  			
			// 	// style.type = 'text/css';
			// 	// style.innerHTML = '.cssClass { color: #FF0000; }';
			// 	// document.getElementsByTagName('head')[0].appendChild(style);

			// 	// elem.className = 'cssClass';
			// 	console.log("found it")
	  // 		}
	  // }
// 	}
// });


