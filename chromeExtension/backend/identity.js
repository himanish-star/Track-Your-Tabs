chrome.runtime.onMessage.addListener(function (message) {
  let messageAction = message.action;

  switch (messageAction) {
    case "open login":
      login();
      break
  }
});

function login() {
  chrome.identity.getAuthToken({"interactive":true}, function (token) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=" + token);
    xhr.onload = function () {
      let userDetails = xhr.response;
      localStorage.setItem('userDetails', userDetails);
    };
    xhr.send()
  })
}