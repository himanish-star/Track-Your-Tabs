chrome.runtime.onMessage.addListener(function (message) {
  let messageAction = message.action

  if (messageAction === 'allow login') {
    chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
			// if (chrome.runtime.lastError) {
			// 	console.log(token);
			// } else {
      chrome.runtime.sendMessage({
        action: 'open dashboard'
      })
			// }
	  })
  }
})

// chrome.identity.getProfileUserInfo(function (userData) {
// 	console.log(userData);
// 	chrome.runtime.sendMessage({
// 		action: 'user data',
// 		data: userData
// 	})
// });
