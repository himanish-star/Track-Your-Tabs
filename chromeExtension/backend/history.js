chrome.runtime.onMessage.addListener(function (message) {
  let messageAction = message.action;

  switch (messageAction) {
    case "fetch history of tabs opened in the past":
      fetchHistory();
      break
    case "fetch records of visit to a particular url":
      fetchHistoryURL(message.url)
      break
  }

});

function fetchHistoryURL(url) {
  chrome.history.getVisits({url:url}, function (visits) {
    chrome.runtime.sendMessage({
      action: "visits to the url fetched",
      visits: visits
    })
  })
}

function fetchHistory() {
  chrome.history.search({text: ""}, function (tabs) {
    chrome.runtime.sendMessage({
      action: "history of tabs fetched",
      tabs: tabs
    })
  })
}