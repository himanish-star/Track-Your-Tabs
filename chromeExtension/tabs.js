
chrome.runtime.onMessage.addListener(function (message) {

	let messageAction = message.action;

	if(messageAction === 'window loaded') {
		sendData();
	}
});

chrome.tabs.onActivated.addListener(sendData);

function sendData () {

	chrome.windows.getAll({"populate": true}, getWindows);

  function getWindows(windows) {
    let listOfTabs = [];
    for(let window of windows) {
    	for(let tabs of window.tabs) {
    		listOfTabs.push(tabs);
			}
		}
		getTabs(listOfTabs);
  }
	
	function getTabs(tabs) {
		let allInfo = JSON.stringify(tabs);
		chrome.runtime.sendMessage({
			action: 'info',
			data: allInfo
		});
	}
}
