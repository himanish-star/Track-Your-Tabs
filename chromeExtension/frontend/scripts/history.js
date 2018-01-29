window.onload = function () {
  let historyList = $('#historyList');

  chrome.runtime.sendMessage({
    action: "fetch history of tabs opened in the past"
  });

  chrome.runtime.onMessage.addListener(function (message) {
    let messageAction = message.action;

    switch (messageAction) {
      case "history of tabs fetched":
        displayHistory(message.tabs);
        break;
      case "visits to the url fetched":
        displayVisitsToURL(message.visits);
        break;
    }
  });

  function displayVisitsToURL(visits) {
    historyList.inner("");
    for(let visit of visits) {
      let li = document.createElement('li');
      li.innerText = visit.visitTime;
      historyList.appendChild(li)
    }
  }

  function displayHistory(tabs) {
    historyList.html("");
    for(let i=0; i<tabs.length; i++) {
      let newRow = $(`
        <tr>
          <th scope="row">${i+1}</th>
          <td class="text-primary" title="${tabs[i].title}">${tabs[i].title ? tabs[i].title.substring(0,80) : 'no title'}</td>
          <td class="text-danger">${tabs[i].visitCount}</td>
          <td><a href="${tabs[i].url}">visit</a></td>
        </tr>    
      `);
      historyList.append(newRow);
    }
  }
};

