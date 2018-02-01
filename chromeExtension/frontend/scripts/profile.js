window.onload = function () {
  let cardProfile = $('#cardProfile');
  let userDetails = localStorage.getItem('userDetails')

  if(userDetails) {
    userDetails = JSON.parse(userDetails);
    cardProfile.html("");
    let card = $(`
      <div class="card">
        <div class="card-block">
          <center class="m-t-30"> <img src="${userDetails.image.url}" class="img-circle" width="150" />
            <h4 class="card-title m-t-10">${userDetails.displayName}</h4>
            <h6 class="card-subtitle">Accoubts Manager Amix corp</h6>
            <div class="row text-center justify-content-md-center">
              <div class="col-4"><a href="javascript:void(0)" class="link"><i class="icon-people"></i> <font class="font-medium">254</font></a></div>
              <div class="col-4"><a href="javascript:void(0)" class="link"><i class="icon-picture"></i> <font class="font-medium">54</font></a></div>
            </div>
          </center>
        </div>
      </div>
    `)
    cardProfile.append(card);
  }
};