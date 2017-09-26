// content.js


// Gets the text in the tweet-box if there is existing text
// --> Need to figure out how to make event handlers for Chrome extensions
setTimeout(function() { 
    if (document.querySelector("#tweet-box-home-timeline") && document.querySelector("#tweet-box-home-timeline").querySelector("div")) {
        console.log(document.querySelector("#tweet-box-home-timeline").querySelector("div").innerText);
    }
}, 0);