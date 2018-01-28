window.onload = function () {
  let backToTop = $('#back-to-top');
  let fetchBtn = $('#fetchBtn');

  if (backToTop.length) {
    backToTop.on('click', function (e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 700);
    });
  }

  fetchBtn.click(function () {
    chrome.runtime.sendMessage({
      action: 'fetch tabs'
    });
  });


  chrome.runtime.onMessage.addListener(function (message) {
    let messageAction = message.action

    switch (messageAction) {
      case 'tabs fetched':
        displayInfo(message.tabs)
        break
      case 'user data':
        setUserData(message.data)
        break
    }
  });

  function displayInfo(tabsData) {
    let currentTabs = $('#currentTabs');
    currentTabs.html('');
    for(let i = 0; i < tabsData.length; i ++) {
      if(tabsData[i].tab.title === 'dashboard' || tabsData[i].tab.title === 'Extensions') {
        continue;
      }
      let newTab = $(`
        <div class="col-md-6">
          <div class="a">
            <a href="#test-popup-1" class="open-popup-link">
              <img src="${tabsData[i].url}" class="img-responsive" alt="Responsive image">
              <div class="img-hover glass">
                <div class="c-table">
                  <div class="ct-cell">
                    <h3 class="img-title">Glass</h3>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div id="test-popup-1" class="white-popup mfp-hide">
            <div class="container-fluid">
              <div class="row">
                <div class="pop-up-color">
                  <div class="col-md-8 p-l-0 p-r-0">
                    <img src="../external%20assets/routes/images/1.jpg" class="img-responsive" alt="Responsive image">
                  </div>
                  <div class="col-md-4">
                    <div>
                      <h2 class="popup-head">Glass</h2>
                    </div>
                    <div>
                      <p class="popup-parapraph">Etiam quis viverra lorem, in semper lorem. Sed nisl arcu euismod sit a amet nisi is a euismod sed cursus arcu elementum and ipsum arcu vivamus is quis venenatis orci and nullam dolore. Etiam quis viverra lorem, in semper lorem. Sed nisl arcu euismod still amet nisi aliqua.Eas Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div class="pop-up-icon">
                      <div class="row">
                        <ul class="text-center popup-social-contact">
                          <li class="popup-social-icons">
                            <a href="#" class="icon pop-up fa-facebook"><span class="label">Facebook</span></a>
                          </li>
                          <li class="popup-social-icons">
                            <a href="#" class="icon pop-up fa-twitter"><span class="label">Twitter</span></a>
                          </li>
                          <li class="popup-social-icons">
                            <a href="#" class="icon pop-up fa-google-plus"><span class="label">GooglePlus</span></a>
                          </li>
                          <li class="popup-social-icons">
                            <a href="#" class="icon pop-up fa-pinterest"><span class="label">pinterest</span></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `)
      currentTabs.append(newTab)
    }
  }
};

function setUserData (userData) {
  // set Email
  // set Photo
}

