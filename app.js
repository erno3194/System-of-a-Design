/* jslint node: true */
/* eslint-env node */
'use strict';

// Require express, socket.io, and vue
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// Pick arbitrary port for server
const port = 3000;
app.set('port', (process.env.PORT || port));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public/')));
// Serve vue from node_modules as vue/
app.use('/vue',
  express.static(path.join(__dirname, '/node_modules/vue/dist/')));
// Serve index.html directly as root page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
// Serve admin.html as /admin
app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/admin.html'));
});
// Serve evaluation.html as /evaluation
app.get('/evaluation', function(req,res) {
  res.sendFile(path.join(__dirname, 'views/evaluation.html'));
});

// Store data in an object to keep the global namespace clean and
// prepare for multiple instances of data if necessary
var females = [];
var males = [];

function Data(gender) {
  if (gender === 'female') {
    this.females = {};
  } else if (gender === 'male'){
    this.males = {};
  }
};

/*
  Adds a date to to the profile database
*/
Data.prototype.addDate = function(gender) { /* gender = {male or female} */
  // Store a profile in an "associative array" with orderId as key
  if (gender === 'female') {
    this.females[profile.id] = profile;
  } else if (gender === 'male') {
    this.males[profile.id] = profile;
  }
};

Data.prototype.getAllDates = function(gender) { /* gender = {male or female} */
  if (gender === 'female') {
    return this.females;
  } else if (gender === 'male') {
    return this.males;
  }
};

const data = new Data();

io.on('connection', function(socket) {
  // Send list of orders when a client connects
  socket.emit('initialize', { dates: data.getAllDates(gender) });

  // When a connected client emits an "addOrder" message
  socket.on('skapaProfil', function(gender) {
    data.skapaProfil(gender);
    // send updated info to all connected clients,
    // note the use of io instead of socket
    io.emit('currentQueue', { dates: data.getAllDates(gender) });
  });

});

/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
