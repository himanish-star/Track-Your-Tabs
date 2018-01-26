chrome.runtime.onMessage.addListener(function (message) {
	
	if(message.action === 'window loaded') {
		sendData()
	}
});

chrome.tabs.onActivated.addListener(sendData);

function sendData () {

	chrome.windows.getCurrent(getWindows);
	
	function getWindows(win) {
		targetWindow = win;
		chrome.tabs.getAllInWindow(targetWindow.id, getTabs);
	}
	
	function getTabs(tabs) {
		let allInfo = JSON.stringify(tabs);
		chrome.runtime.sendMessage({
			action : 'info',
			data :allInfo
		})
		chrome.windows.getAll({"populate": true}, moveTabs);
	}
}
