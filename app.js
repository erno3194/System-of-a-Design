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
function Data() {
    this.maleUsers = [];
    this.femaleUsers = []; 
}

/*
  Adds an order to to the queue
*/


Data.prototype.numberOfClients = function() {
    return (this.maleUsers.length + this.femaleUsers.length);
};

const data = new Data();

io.on('connection', function(socket) {
  // Send list of orders when a client connects

    socket.on('saveUserMale', function(name, email, age, preferredAgeMin, preferredAgeMax){
	console.log("saveUserMale");
	const user = {name, email, age, preferredAgeMin, preferredAgeMax};
	data.maleUsers.push(user);
	console.log(data.maleUsers);
	
    });
    
    socket.on('saveUserFemale', function(name, email, age, preferredAgeMin, preferredAgeMax){
	console.log("saveUserFemale");
	const user = {name, email, age, preferredAgeMin, preferredAgeMax};
	data.femaleUsers.push(user);
	console.log(data.femaleUsers);
    });
    socket.on('getNumberOfUsers', function(incrementNumberOfUsers){
	incrementNumberOfUsers();
	console.log("increment");
    });


});

/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
