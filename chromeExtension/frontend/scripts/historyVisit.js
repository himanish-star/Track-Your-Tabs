window.onload = function () {
  let userPic = $('#userPic');
  let visitList = $('#visitList');
	let getVisitsBtn = $('#getVisitsBtn');
	let inputURL = $('#inputURL');
  let userDetails = JSON.parse(localStorage.getItem('userDetails'));

  getVisitsBtn.click(function () {
		chrome.runtime.sendMessage({
			action: "fetch records of visit to a particular url",
			url: inputURL.val()
		});
	});

  if(userDetails){
    setUserData();
  }

	getVisitsBtn.click();
	
	chrome.runtime.onMessage.addListener(function (message) {
		let messageAction = message.action;
		
		switch (messageAction) {
			case "visits to the url fetched":
				displayVisitsToURL(message.visits);
				break;
		}
	});

  function setUserData() {
    userPic.html("");
    let newRow = $(`
			<a class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="${userDetails.image.url}" alt="user" class="profile-pic m-r-10" />${userDetails.displayName}</a>
		`);
    userPic.append(newRow)
  }

	function displayVisitsToURL(visits) {
		visitList.html(`
      <thead>
        <tr>
          <th scope="col">Sr. No.</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `);
		for(let i=0; i<visits.length; i++) {
			let time = visits[i].visitTime;
			time = new Date(time);
			let newRow = $(`
        <tr>
          <th scope="row">${visits.length-(i)}</th>
          <td class="text-primary">${time}</td>
        </tr>
      `);
			visitList.prepend(newRow);
		}
	}
	
};

