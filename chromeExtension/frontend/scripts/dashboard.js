window.onload = function () {
};

chrome.runtime.onMessage.addListener(function (message) {
  let messageAction = message.action;

  switch (messageAction) {
    case 'tabs fetched with screenshot':
      displayInfoWithScreenshot(message.tabs);
      break;
    case 'tabs fetched normally':
      displayInfoNormally(message.tabs);
      break;
    case 'user data':
      setUserData(message.data);
      break;
  }
});

function displayInfoWithScreenshot(tabsData) {
}

function displayInfoNormally(tabsData) {
}

function setUserData (userData) {
}

