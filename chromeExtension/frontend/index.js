$(document).ready(
	function () {
  chrome.runtime.sendMessage({
    action: 'window loaded'
  })

  chrome.runtime.onMessage.addListener(function (message) {
	  if (message.action === 'info') {
		  displayInfo(JSON.parse(message.data))
  }
  })

  let openDashboard = $('#openDashboard')
  let openProfile = $('#openProfile')

  openProfile.click(function () {
    chrome.runtime.sendMessage({
      action: 'open profile'
    })
  })
  openDashboard.click(function () {
    chrome.runtime.sendMessage({
      action: 'open dashboard'
    })
  })

  function displayInfo (tabsData) {
    console.log('ye h tabsdata')
  	console.log(tabsData)

    for (let tab = 0; tab < tabsData.length; tab++) {
      if (tabsData[tab].title === '{{username}}' || tabsData[tab].title === 'Extensions') {
     	continue
      }
	    let newTab = $(`<div class="w3-container w3-card w3-white w3-round w3-margin"><br>
											  <img src="${tabsData[tab].favIconUrl}" alt="Avatar" class="dashboardNewsAvatar w3-left w3-circle w3-margin-right">
											  <a href ="${tabsData[tab].url}" target="_blank"><h4>${tabsData[tab].title}</h4></a>
											  <br>
											 <!--<hr class="w3-clear">
											  <p>
											  Total time spent in this week : {{time}}
									      <br>
										     Number of times opened in a day : {{times}}
									      </p>
									      <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-area-chart"></i>  View analysis</button>
									      <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-bell"></i>  Check your surf limits</button>-->
									   </div>`)
	    $('#tabsList').append(newTab)
    }
  }
})
