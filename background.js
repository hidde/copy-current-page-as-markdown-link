/*
Alerts Markdown syntax for a link to this current page,
 with the page title as its link text.
*/
function logMarkdown(tab) {
  browser.tabs.executeScript({code: 'const clipboard = `[${document.title}](${window.location})`; alert(clipboard);'});
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
    browser.pageAction.show(tab.id);
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

/*
Toggle CSS when the page action is clicked.
*/
browser.pageAction.onClicked.addListener(logMarkdown);

