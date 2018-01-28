chrome.runtime.onMessage.addListener(function (message) {
  let messageAction = message.action;

  switch(messageAction) {
    case 'open home page':
      chrome.tabs.create({
        url: "./frontend/index.html"
      });
      break;
    case 'open dashboard':
      chrome.tabs.query({'currentWindow':true, 'active': true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: "./frontend/templates/dashboard.html"});
      });
      break;
    case 'open profile':
      chrome.tabs.query({'currentWindow':true, 'active': true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: "./frontend/templates/profile.html"});
      });
      break;
    case 'open history':
      break;
  }
});
