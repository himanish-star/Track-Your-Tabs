window.onload = function () {
	let userPic = $('#userPic');
	let fetch = $('#fetch');
  let withCapture = $('#withCapture');
  let withoutCapture = $('#withoutCapture');

  fetchWithoutCapture();

  fetch.click(function () {
      fetchwithCapture()
    }
  );

	userPic.click(setUserData);

  chrome.tabs.onActivated.addListener(fetchWithoutCapture);
  chrome.tabs.onRemoved.addListener(fetchWithoutCapture);

	chrome.runtime.onMessage.addListener(function (message) {
		let messageAction = message.action;
		
		switch (messageAction) {
			case 'tabs fetched with screenshot':
				displayInfoWithScreenshot(message.tabs);
				break;
			case 'tabs fetched normally':
				displayInfoNormally(message.tabs);
				break;
		}
	});

	function displayInfoWithScreenshot(tabsData) {
	  if(withCapture) {
      withCapture.html('');
	    for (let i=0; i<tabsData.length; i++) {
		    if (tabsData[i].tab.url.startsWith('chrome-extension://')) {
			    continue;
		    }

		    let tab = (` 
 					<div class="col-lg-4 col-xlg-3 col-md-5">
            <div class="card">
              <img class="card-img-top" src="${tabsData[i].url}" alt="Card image cap" style="width: 100%; height: 100%">
              <div class="card-block little-profile text-center">
              	<div class="pro-img"><img src="${tabsData[i].tab.favIconUrl}" alt="user" /></div>
              	<h3 class="m-b-0" style="overflow: hidden;">${tabsData[i].tab.title}</h3>
              	<!--<p>Web Designer &amp; Developer</p>-->
              	<a href="${tabsData[i].tab.title.substring(0,10)}" class="m-t-10 waves-effect waves-dark btn btn-primary btn-md btn-rounded">Open in new tab</a>
              	<div class="row text-center m-t-20">
                	<div class="col-lg-4 col-md-4 m-t-20">
                  	<h3 class="m-b-0 font-light">1099</h3><small>Articles</small></div>
                	<div class="col-lg-4 col-md-4 m-t-20">
                  	<h3 class="m-b-0 font-light">23,469</h3><small>Followers</small></div>
                	<div class="col-lg-4 col-md-4 m-t-20">
                  	<h3 class="m-b-0 font-light">6035</h3><small>Following</small></div>
              	</div>
           	 	</div>
          	</div>
        	</div>
                  `)
		    withCapture.append(tab);
      }
    }
	}
	
	function displayInfoNormally(tabsData) {
		if (withoutCapture) {
			withoutCapture.html('');
			for (let i = 0; i < tabsData.length; i++) {
				if (tabsData[i].url.startsWith('chrome-extension://')) {
					continue;
				}
				let tab = $(` 
 					<div class="tab-pane active" id="home" role="tabpanel">
           <div class="card-block">
             <div class="profiletimeline">
               <div class="sl-item">
                 <div class="sl-left"><img src="${tabsData[i].favIconUrl}" alt="" class="img-circle"> 
                 </div>
                 <div class="sl-right">
                   <div>
                     <a href="${tabsData[i].url}" target="_blank" class="link">${tabsData[i].title}</a> <span class="sl-date"></span>
                   </div>
                 </div>
               </div>
             </div>
             <hr>
           </div>
          </div>
        `)
				withoutCapture.append(tab);
			}
		}
	}
	
	function setUserData() {
		let userDetails = JSON.parse(localStorage.getItem('userDetails'));
		userPic.html("");
		let newRow = $(`
			<a class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="${userDetails.picture}" alt="user" class="profile-pic m-r-10" />${userDetails.name}</a>	
		`);
		userPic.append(newRow)
	}
	
	function fetchWithoutCapture() {
		if (withoutCapture) {
			chrome.runtime.sendMessage({
				action: 'fetch tabs normally'
			})
		}
	}
	
	function fetchwithCapture() {
	  if(withCapture) {
		  chrome.runtime.sendMessage({
			  action: 'fetch tabs with screenshot'
		  })
    }
	}
	

	
};
