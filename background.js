/* background.js */
// The code in this file includes the code for the listeners that
// are in the background for browser action.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[1];
    for (var i=0; i<tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, {"message": "clicked_browser_action"});
        console.log(tabs[i])
    }
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (isNaN(request.message) == false) {
      chrome.browserAction.setBadgeText({text: "" + request.message});
    } 
});