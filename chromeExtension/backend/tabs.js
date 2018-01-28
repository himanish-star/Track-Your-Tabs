/*
chrome.tabs.onActivated.addListener(sendData);
chrome.tabs.onRemoved.addListener(sendData);
*/

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
  	function kolp(i) {
  		if(i === windows[0].tabs.length){
  			chrome.runtime.sendMessage({
					action: 'tabs fetched',
					tabs: listOfTabs
				});
  			return
			}
			chrome.tabs.update(windows[0].tabs[i].id, {active:true}, function () {
				setTimeout(function () {
					chrome.tabs.captureVisibleTab(windows[0].id, function (screenShotURL) {
						let tabData = {
							tab: windows[0].tabs[i],
							url: screenShotURL
						};
						listOfTabs.push(tabData);
						setTimeout(function () {
							kolp(i+1);
            }, 200)
          })
        }, 100)
      });
    }
    kolp(0);

    /*let listOfTabs = [];
    for(let window of windows) {
    	for(let tabs of window.tabs) {
    		listOfTabs.push(tabs);
			}
		}
		chrome.runtime.sendMessage({
			action: 'tabs fetched',
			tabs: listOfTabs
		})*/
  }
}
