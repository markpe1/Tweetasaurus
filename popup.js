/* popup.js */

var thesaurus = {}; // Thesaurus for synonyms
var dictionary = ["apeshit", "arsehole", "ass", "asshole", "bastard", "bitch", "bollocks", "bullshit", "bunghole", "butthole",
   "cock", "cocks", "cunt", "dick", "dickhead", "faggot", "fuck", "fucker", "fucking", "goddamn", "jackass", "motherfucker", "penis", "pussy", "schlong", "shit", "shitty", "slut"];
var xhr = new XMLHttpRequest(); // Javascript HTTP request

// Ensure that correct window/tab is open
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  for (var i=0; i<tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, {"message": "clicked_browser_action"});
  }
});

// Event listener for request (front content.js)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (isNaN(request.message)) { // Ensure requeest message is not a number

    // Create url for word and send a GET request
    var url = "https://api.datamuse.com/words?ml=" + request.message;
    xhr.open("GET", url, false);
    xhr.send();
    
    // Retrieve response from request and parse as JSON object
    var result = xhr.response;
    var jResult = JSON.parse(result);
    
    // Save first five words in the JSON object for now
    var arr = [];
    for (var i = 0; i < 5; i++) {
      if (dictionary.indexOf(jResult[i].word) < 0)
      {
        arr[i] = jResult[i].word;
      }
      else 
    {
        arr[i] = jResult[i + 5].word;
      }
    }
    thesaurus[request.message] = arr;

    var html = document.getElementById("test").innerHTML
    html += '<div class="dropdown"> <button class="dropbtn">' + request.message + '</button> <div id='+ request.message + ' class="dropdown-content">'
    var synonyms = thesaurus[request.message]
    for (var i = 0; i<synonyms.length; i++) {
      html += '<a id=' + synonyms[i] + ' href="#">' + synonyms[i] + '</a>'
    }
    html += ' </div> </div>';
    document.getElementById("test").innerHTML = html;


    // Create buttons for words + synonyms
    var gridButtons = document.querySelectorAll('button.dropbtn');
    var gridButtonItems = [].slice.call(gridButtons);
        gridButtonItems.forEach(function (item, idx) {
          item.addEventListener('click', function () {
            document.getElementById(item.firstChild.nodeValue).classList.toggle("show");
          });

    });

    // Replace word in textbox on click
    var anchors = document.getElementsByTagName('a')
    for (var i = 0; i<anchors.length; i++) {
      term = document.getElementById(anchors[i].id)
      badTerm = term.parentNode.id
      term.addEventListener('click', function () {
          getCurrentTab().then(function(tab){
            console.log(term)
            console.log(this)
            chrome.tabs.sendMessage(tab.id, {"message": this.id + " " + this.parentNode.id});
          }.bind(this));
        console.log(this)
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
      })
    }
  } 
})

function getCurrentTab(){
  return new Promise(function(resolve, reject){
    chrome.tabs.query({
      active: true,               // Select active tabs
      lastFocusedWindow: true     // In the current window
    }, function(tabs) {
      resolve(tabs[0]);
    });
  });
}

function assignTab(){
  return new Promise(function(resolve, reject){
    chrome.tabs.query({
      active: true,               // Select active tabs
      lastFocusedWindow: true     // In the current window
    }, function(tabs) {
      resolve(tabs[0]);
    });
  });
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

