
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
          <!--<hr class="w3-clear">
          <p>
            Total time spent in this week : {{time}}
            <br>
            Number of times opened in a day : {{times}}
          </p>
          <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-area-chart"></i>  View analysis</button>
          <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-bell"></i>  Check your surf limits</button>-->
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
