
chrome.runtime.onMessage.addListener(function (message) {
  let messageAction = message.action;

  switch(messageAction) {
    case 'open home page':
      chrome.tabs.create({
        url: "./frontend/index.html"
      })
  }
});
