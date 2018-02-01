chrome.runtime.onMessage.addListener(function (message) {
  let messageAction = message.action;

  switch (messageAction) {
    case "open login":
      login();
      break
    case "logout":
      logout()
      break
  }
});

function logout() {
  chrome.identity.getAuthToken(function (token) {
    chrome.identity.removeCachedAuthToken({
      'token': token
    })
  });
  localStorage.removeItem('userDetails')
}

function login() {
  chrome.identity.getAuthToken({"interactive":true}, function (token) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.googleapis.com/plus/v1/people/me?alt=json&access_token=" + token);
    xhr.onload = function () {
      let userDetails = xhr.response;
      localStorage.setItem('userDetails', userDetails);
      chrome.runtime.sendMessage({
        action: 'credentials fetched'
      })
    };
    xhr.send()
  })
}