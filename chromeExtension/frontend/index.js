$(document).ready(function () {
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
  
  $('#login').click(function () {
	  chrome.runtime.sendMessage({
		  action: 'allow login'
	  })
  })
})
