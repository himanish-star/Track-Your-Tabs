window.onload = function () {
  let userPic = $('#userPic');
  let historyList = $('#historyList');
  let userDetails = JSON.parse(localStorage.getItem('userDetails'));

  if(userDetails){
    setUserData();
  }

  chrome.runtime.sendMessage({
    action: "fetch history of tabs opened in the past"
  });
  
  chrome.runtime.onMessage.addListener(function (message) {
    let messageAction = message.action;

    switch (messageAction) {
      case "history of tabs fetched":
        displayHistory(message.tabs);
        break;
    }
  });

  function displayHistory(tabs) {
    historyList.html(`
      <thead>
        <tr>
          <th width="7%" style="vertical-align :center;" scope="col">S No.</th>
          <th scope="col">Title</th>
          <th scope="col">Visits</th>
          <th scope="col">Open</th>
          <th scope="col">Copy</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `);

    for(let i=0; i<tabs.length; i++) {
	    tabs[i].title = tabs[i].title.replace('<!--','');
	    
	    if(tabs[i].title.startsWith('Tabs |')) {
	      continue;
      }
      
      let newRow = $(`
        <tr>
          <th scope="row">${i + 1}</th>
          <td class="text-primary" title="${tabs[i].title}"><a href="${tabs[i].url}" target="_blank">${tabs[i].title ? tabs[i].title.substring(0, 80) : tabs[i].url.substring(0, 80)}</a></td>
          <td class="text-danger">${tabs[i].visitCount}</td>
          <td><a href="${tabs[i].url}" target="_blank" class="visitLink"><i class="mdi mdi-link-variant"></i></a></td>
          <td><button class="btn btn-outline-primary copyToClipboard" id="copyToClip${i}" data-id="${tabs[i].url}" class="copyToClipboard"><i class="mdi mdi-content-copy"></i></button></td>
        </tr>
      `);
      newRow.find('.copyToClipboard').click(function (event) {
        let link = event.target.getAttribute('data-id');
        let $temp = $("<input>");
        $("body").append($temp);
        $temp.val(link).select();
        document.execCommand("copy");
        $temp.remove();
      });
	    historyList.append(newRow);
    }
  }
  
  function setUserData() {
    userPic.html("");
    let newRow = $(`
			<a class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="${userDetails.image.url}" alt="user" class="profile-pic m-r-10" />${userDetails.displayName}</a>
		`);
    userPic.append(newRow)
  }
};

