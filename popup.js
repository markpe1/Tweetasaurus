                
var dict = {}
dict["shit"] = ["crap", "poop", "deuce", "bollocks"]
dict["bitch"] = ["floozy", "hussy", "wench", "shrew"]
dict["asshole"] = ["bastard", "idiot", "schmuck"]
dict["fucker"] = ["fornicator", "perjurer", "phony"]

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    for (var i=0; i<tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, {"message": "clicked_browser_action"});
    }
  });

  chrome.runtime.onMessage.addListener(
  	function(request, sender, sendResponse) {
      if (isNaN(request.message))
      {
        var html = document.getElementById("test").innerHTML
        html += '<div class="dropdown"> <button class="dropbtn">' + request.message + '</button> <div id='+ request.message + ' class="dropdown-content">'
        var synonyms = dict[request.message]
        for (var i = 0; i<synonyms.length; i++)
        {
          html += '<a id=' + synonyms[i] + ' href="#">' + synonyms[i] + '</a>'
        }
        html += ' </div> </div>'
        // '<a onclick= >' + request.message + '</a>';
        // html += '<div></div>'
        document.getElementById("test").innerHTML = html;


        var gridButtons = document.querySelectorAll('button.dropbtn');
        var gridButtonItems = [].slice.call(gridButtons);
            gridButtonItems.forEach(function (item, idx) {
              item.addEventListener('click', function () {
                document.getElementById(item.firstChild.nodeValue).classList.toggle("show");
              });
 
        });

        var anchors = document.getElementsByTagName('a')
        for (var i = 0; i<anchors.length; i++)
        {
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

