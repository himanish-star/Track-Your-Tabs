
$(function () {
  let openHome = $('#openHome');

  openHome.click(function () {
    chrome.tabs.create({
      url: "../frontend/index.html"
    })
  })
});