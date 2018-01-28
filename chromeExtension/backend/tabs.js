chrome.runtime.onMessage.addListener(function (message) {
  let messageAction = message.action;

  switch (messageAction) {
    case 'fetch tabs normally':
      fetchTabs(false);
      break;
    case 'fetch tabs with screenshot':
      fetchTabs(true);
      break
  }
});

function getWindowsWithScreenshot(windows) {
  let listOfTabs = [];
  function captureTabs(tabCount, windowCount) {
    if(windowCount === windows.length) {
      chrome.runtime.sendMessage({
        action: 'tabs fetched with screenshot',
        tabs: listOfTabs
      });
      return;
    }
    if(tabCount === windows[windowCount].tabs.length){
      captureTabs(0, windowCount+1);
    }
    chrome.tabs.update(windows[windowCount].tabs[tabCount].id, {active:true}, function () {
      setTimeout(function () {
        chrome.tabs.captureVisibleTab(windows[windowCount].id, function (screenShotURL) {
          let tabData = {
            tab: windows[windowCount].tabs[tabCount],
            url: screenShotURL
          };
          listOfTabs.push(tabData);
          setTimeout(function () {
            captureTabs(tabCount+1, windowCount);
          }, 200)
        })
      }, 100)
    });
  }
  captureTabs(0, 0);
}

function getWindowsNormally(windows) {
  let listOfTabs = [];
  for(let window of windows) {
    for(let tabs of window.tabs) {
      listOfTabs.push(tabs);
    }
  }
  chrome.runtime.sendMessage({
    action: 'tabs fetched normally',
    tabs: listOfTabs
  })
}

function fetchTabs(withScreenshot) {
  if (withScreenshot) {
    chrome.windows.getAll({'populate': true}, getWindowsWithScreenshot)
  } else {
    chrome.windows.getAll({'populate': true}, getWindowsNormally)
  }
}