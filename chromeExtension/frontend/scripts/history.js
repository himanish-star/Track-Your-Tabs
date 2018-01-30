window.onload = function () {
  let historyList = $('#historyList');
  let visitList = $('#visitList');
  let switchHistoryModes = $('#switchHistoryModes').children();
  let viewParticularTop = $('#viewParticularTop');
  let viewAllTop = $('#viewAllTop');
  let viewAllBtn = $('#viewAllBtn');
  let viewParticularBtn = $('#viewParticularBtn');
  let getVisitsBtn = $('#getVisitsBtn');
  let inputURL = $('#inputURL');

  getVisitsBtn.click(function () {
    chrome.runtime.sendMessage({
      action: "fetch records of visit to a particular url",
      url: inputURL.val()
    });
  });

  switchHistoryModes.click(function (event) {
    if (event.target.innerText === 'view all') {
      event.target.classList.remove('btn-secondary');
      event.target.classList.add('btn-primary');
      viewParticularBtn.addClass('btn-secondary');
      viewParticularBtn.removeClass('btn-primary');
      viewParticularTop.hide();
      viewAllTop.show();
      visitList.hide();
      historyList.show();
    } else {
      event.target.classList.remove('btn-secondary');
      event.target.classList.add('btn-primary');
      viewAllBtn.addClass('btn-secondary');
      viewAllBtn.removeClass('btn-primary');
      viewParticularTop.show();
      viewAllTop.hide();
      historyList.hide();
      visitList.show();
    }
  });

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
    visitList.html(`
      <thead>
        <tr>
          <th scope="col">Sr. No.</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `);
    for(let i=0; i<visits.length; i++) {
      let time = visits[i].visitTime;
      time = new Date(time);
      let newRow = $(`
        <tr>
          <th scope="row">${visits.length-(i)}</th>
          <td class="text-primary">${time}</td>
        </tr>    
      `);
      visitList.prepend(newRow);
    }
  }

  function displayHistory(tabs) {
    historyList.html(`
      <thead>
        <tr>
          <th scope="col">Sr. No.</th>
          <th scope="col">Title</th>
          <th scope="col">Visits</th>
          <th scope="col">Link</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `);

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

