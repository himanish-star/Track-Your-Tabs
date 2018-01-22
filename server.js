const express = require('express');
const app = express();
const path = require('path');
// const config = require('./config.JSON');

app.use('/',express.static(path.join(__dirname,'frontend')));

/*app.listen(config.SERVERPORT, () => {
  console.log('server is running at http://localhost:' + config.SERVERPORT)
});*/

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')});
