window.onload = function () {
  chrome.runtime.sendMessage({
    action: 'fetch tabs'
  });

  chrome.runtime.onMessage.addListener(function (message) {
    let messageAction = message.action;

    switch (messageAction) {
      case 'tabs fetched':
        displayInfo(message.tabs);
        break;
    }
  });

  function displayInfo(tabsData) {
    let currentTabs = $('#currentTabs');
    currentTabs.html('');
    for(let tab = 0; tab < tabsData.length; tab ++) {
      if(tabsData[tab].title === '{{username}}' || tabsData[tab].title === 'Extensions') {
        continue;
      }
      let newTab = $(`
        <div class="w3-container w3-card w3-white w3-round w3-margin">
          <br>
          <img src="${tabsData[tab].favIconUrl}" alt="Avatar" class="dashboardNewsAvatar w3-left w3-circle w3-margin-right">
          <h4>${tabsData[tab].title}</h4><br>
        </div>
      `);
      currentTabs.append(newTab);
    }
  }

  let followersButton = document.getElementById('followers'),
    followingButton = document.getElementById('following'),
    followersList = document.getElementById('followersList'),
    followingList = document.getElementById('followingList')

  followingList.style.display = 'none'

  followersButton.onclick = function () {
    followingList.style.display = 'none'
    followersList.style.display = 'inherit'
  }

  followingButton.onclick = function () {
    followersList.style.display = 'none'
    followingList.style.display = 'inherit'
  }
}
