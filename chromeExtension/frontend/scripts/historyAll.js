window.onload = function () {
  let historyList = $('#historyList');
  // let copyButton =$('.copyToClipboard')
	
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
          <th scope="col">Sr. No.</th>
          <th scope="col">Title</th>
          <th scope="col">Visits</th>
          <th scope="col">Link</th>
          <th scope="col">Copy To clipboard</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `);

    for(let i=0; i<tabs.length; i++) {
	    let newRow = $(`
        <tr>
          <th scope="row">${i + 1}</th>
          <td class="text-primary" title="${tabs[i].title}">${tabs[i].title ? tabs[i].title.substring(0, 80) : 'no title'}</td>
          <td class="text-danger">${tabs[i].visitCount}</td>
          <td><a href="${tabs[i].url}" target="_blank" class="visitLink">Visit</a></td>
          <td align="center"><button  class="btn btn-outline-primary copyToClipboard" id="copyToClip${i}" data-id="${tabs[i].url}"class="copyToClipboard"> <i class="fa fa-clipboard"></i></button></td>
        </tr>
      `);
	    historyList.append(newRow);
    }
    setClipBoardData(tabs.length)
  }
  
  function setClipBoardData(size) {

    for(let i = 0 ; i < size ;i++) {
	    let el = document.getElementById('copyToClip' + i);

	    el.onclick = function () {
		    let selectedText = el.getAttribute('data-id');
		    selectedText.select;
		    document.execCommand('copy');
		    
	    }
	    
	     
	     /*el.onclick = function () {
		    document.execCommand('copy')
	    }
	
	    el.addEventListener('copy', function (event) {
		    event.preventDefault();
		
		    if (event.clipboardData) {
			    console.log(event.target.getAttribute('data-id'))
			    event.clipboardData.setData('text/plain', event.target.getAttribute('data-id'))
		    }
	    })*/
    }
  }
  
};

