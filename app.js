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
    this.dateReady = false;
    this.dateDone = false;
    this.dateCounter = 0;
    this.evalCounter = 0;
    this.eventOn = true;
}

/*
  Adds an order to to the queue
*/


Data.prototype.numberOfClients = function() {
    return (this.maleUsers.length + this.femaleUsers.length);
};

function Matches() {
    this.matchesArray = [];
}

var data = new Data();
var matches = new Matches();

io.on('connection', function(socket) {
  // Send list of orders when a client connects

    socket.on('saveUserMale', function(name, email, age, preferredAgeMin, preferredAgeMax, selectedHobbies){
	console.log("saveUserMale");
	const user = {id: 'm'+(data.maleUsers.length+1), name: name, email: email, age: age, gender: "male", preferredAgeMin, preferredAgeMax, hobbies: selectedHobbies};
	data.maleUsers.push(user);
	console.log(data.maleUsers);
	
    });
    
    socket.on('saveUserFemale', function(name, email, age, preferredAgeMin, preferredAgeMax, selectedHobbies){
	console.log("saveUserFemale");
	const user = {id: 'f'+(data.femaleUsers.length+1), name: name, email: email, age: age, gender: "female", preferredAgeMin: preferredAgeMin, preferredAgeMax: preferredAgeMax, hobbies: selectedHobbies};
	data.femaleUsers.push(user);
	console.log(data.femaleUsers);
    });
    
    socket.on('getNumberOfUsers', function(callback){
	callback(data.numberOfClients());
    });

    socket.on('getUsersFromServer', function(callback){
	callback(data);
    });

    socket.on('updateEvalCounter', function(callback){
	callback(data.evalCounter);
    });

    socket.on('incrementEvalCounter', function() {
	data.evalCounter ++;
    });

    socket.on('resetEvalCounter', function() {
	data.evalCounter = 0;
    });

    socket.on('pushMatchesToServer', function(matchesFromAdmin){
	matches.matchesArray = matchesFromAdmin;
    });

    socket.on('getDateFromServer', function(name, callback){
	callback(matches.matchesArray.find(date => date.female.name == name || date.male.name == name));
    });

    socket.on('setDateStatusTrue', function() {
	data.dateReady = true;
	data.dateCounter ++;
    });

    socket.on('setDateStatusFalse', function() {
	data.dateReady = false;
    });

    socket.on('getDateStatus', function(callback){
	callback(data);
    });

    socket.on('isDateDone', function(callback){
	callback(data);
    })

    socket.on('setDateDoneStatusTrue', function() {
	data.dateDone = true;
    });

    socket.on('setDateDoneStatusFalse', function() {
	data.dateDone = false;

    });

    socket.on('eventOver', function() {
	data.eventOn = false;
    });

    socket.on('eventOn', function() {
	data.eventOn = true;
    });

    socket.on('isEventOver', function(callback){
	callback(data.eventOn);
    });

});

/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
