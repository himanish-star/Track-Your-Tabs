const express = require('express');
const app = express();
const path = require('path');
const server = require('./config.json').server;

const routes = {
  dashboard: require('./routes/dashboard').route
};


app.use('/',express.static(path.join(__dirname,'frontend')));
app.use('/dashboard',routes.dashboard);

app.listen(server.SERVERPORT, () => {
  console.log('server is running at http://localhost:' + server.SERVERPORT)
});

