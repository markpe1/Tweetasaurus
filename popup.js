/* popup.js */
// The code in this file includes the code for the popup (appears when
// the browser action button is clicked).

// Thesaurus for synonyms
var thesaurus = {};

// Dictionary for negative words
var dictionary = ["fuckwit", "fagot", "cocksucker", "dumbass", "asshat", "shithead", "slit", "prick", "horseshit", "dogshit",
    "shitty", "apeshit", "arsehole",  "asshole", "bastard", "bitch", "bollocks", "bullshit", "bunghole", "butthole",
    "cock", "cunt", "dick", "dickhead", "faggot", "fucker", "fucking", "goddamn", "jackass", "motherfucker", "penis", "pussy",
    "damn", "shit", "slut", "puss", "fuck", "whore", "ass", "fag", 'walk out', 'disagree with', 'hawkshaw', 'sporting lady',
    'kitty-cat', 'walk out', 'disagree with', 'bust up', 'come down', 'resort to', 'lavigne', 'birth control', 'slip up',
    'one another', 'get over', 'each other', 'feel for', 'go out','shut up', 'rid of', 'look after', 'white people',
    'suck off', 'preanal', 'fingerer', 'dasypygal', 'effluvium', 'shitfaced', 'misbegotten', 'illegitimate child',
    'backbite', 'bollix', 'screw up', 'fuck up', 'mess up', 'shnook', 'stopcock', 'poove', 'bally', 'zany','glans',
    'purulent',  'slattern', 'fornicatress', 'loose woman', 'slovenly woman', 'douche bag', 'numskull', 'buncombe',
    'cocotte', 'cyprian'];

var xhr = new XMLHttpRequest(); // Javascript HTTP request
var count = 0; // Count for number of synonyms
var arr = []; // Array for synonyms
var word = ""; // String for original offensive word

// Ensure that correct window/tab is open
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  for (var i=0; i<tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, {"message": "clicked_browser_action"});
  }
});

// Event listener for request (front content.js)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  word = request.message; // Set the original offensive word
  if (isNaN(request.message)) { // Ensure requeest message is not a number
    // Create url for word and send a GET request
    var url = "https://api.datamuse.com/words?ml=" + request.message;
    xhr.open("GET", url, false);
    xhr.send();
    
    // Retrieve response from request and parse as JSON object
    var result = xhr.response;
    var jResult = JSON.parse(result);
    
    // Save first five words in the JSON object for now
    for (var i = 0; i < 5; i++) {
      getRecursiveWord(jResult, i);
    }
  } 
})

// Successful callback for synonyms Promise
function successCallback(result) {
  arr[count] = result; // Save result into array
  count++;
  if (count == 5) { // Check that we have five synonyms
    thesaurus[word] = arr;
    
    // Concatenate HTML for dropdown on menu that contains synonyms
    var html = document.getElementById("test").innerHTML;
    html += '<div class="dropdown"> <button class="dropbtn">' + word + '</button> <div id='+ word + ' class="dropdown-content">'
    var synonyms = thesaurus[word]
    
    for (var i = 0; i < synonyms.length; i++) {
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
          getCurrentTab().then(function(tab) {
            chrome.tabs.sendMessage(tab.id, {"message": this.id + " " + this.parentNode.id});
          }.bind(this));
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
      })
    }
    count = 0; // Reset the count for the other words
  }
}

// Failure callback for synonyms Promise
function failureCallback(error) {
  console.log("It failed with: " + error);
}

// Recursive function to find synonyms that are not in the dictionary
function getRecursiveWord(jResult, j) {
  if (dictionary.indexOf(jResult[j].word) == -1) {
    // return jResult[j].word;
    var p = Promise.resolve(jResult[j].word);
    p.then(successCallback, failureCallback);
    return p;
  }
  else {
    getRecursiveWord(jResult, j+5);
  }
}

function getCurrentTab() {
  return new Promise(function(resolve, reject){
    chrome.tabs.query({
      active: true,               // Select active tabs
      lastFocusedWindow: true     // In the current window
    }, function(tabs) {
      resolve(tabs[0]);
    });
  });
}

function assignTab() {
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

