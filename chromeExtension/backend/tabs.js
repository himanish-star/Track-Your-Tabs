chrome.tabs.onActivated.addListener(sendData);
chrome.tabs.onRemoved.addListener(sendData);

chrome.runtime.onMessage.addListener(function (message) {
	let messageAction = message.action;

	switch (messageAction) {
		case 'fetch tabs':
			sendData();
			break;
	}
});

function sendData() {
	chrome.windows.getAll({"populate": true}, getWindows);

  function getWindows(windows) {
    let listOfTabs = [];
    for(let window of windows) {
    	for(let tabs of window.tabs) {
    		listOfTabs.push(tabs);
			}
		}
		chrome.runtime.sendMessage({
			action: 'tabs fetched',
			tabs: listOfTabs
		})
  }
}
