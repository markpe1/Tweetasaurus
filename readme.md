# Tweetasaurus: User Manual
## User Guide
In order to get the extension working first open up Google Chrome. From here, click on the button with the three dots at the top-right. Next, hover over the option "More tools". Then click on Extensions. On this screen make sure the box that says "Developer Mode" is checked. Then you must click "Load unpacked extension", select the folder where the Tweetasaurus files are saved and it should now display on the screen. Now just make sure it is enabled.

To begin using Tweetasaurus, go to your Twitter account's home page. When you type text into the main entry box, the code will search for the presence of words as you type. If you enter any word that also appears in the dictionary that is inisde of popup.js it will update the badge text on the extension symbol in the top-right. 

Now if you click the extension button, the list of negative words used will appear. From here you can select one of those words and be provided suggestions from the Datamuse API. Clicking on the suggestion will replace all instances of said word with the suggested one. The word will then disappear. From here the user can continue to replace offensive words or submit the tweet as is.

## Included Files
###### manifest.json
JSON file that contains all of the specifications and properties for the extension in the proper format accepted by Google Chrome.
###### content.js
Javascript file that contains the methods that catch the words, update the interface and send the data to popup.js
###### background.js
Javascript file that handles when the browser action button is clickeed and updates the badge text.
###### popup.js
Javascript file that accepts data from content.js, then searches for synonyms for the caught words. Appends results and words to popup.html
###### popup.html
HTML code for the pop-up menu interface that allows the user to replace word instances
###### popup.css
Styling parameters for popup.html
