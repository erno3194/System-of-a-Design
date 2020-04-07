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
    this.maleUsers = [{id:"m1", name: "Lucas Lucasson", email: "lucas@test.se", age: 32, gender: "male", hobbies: ["Outdoors", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    		      {id:"m2", name: "Liam Liamsson2", email: "Liam@test.se", age: 22, gender: "male", hobbies: ["Sports", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    		      {id:"m3", name: "William Williamsson", email: "william@test.se", age: 22, gender: "male", hobbies: ["Outdoors", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    		      {id:"m4", name: "Elias Eliasson", email: "Elias@test.se", age: 23, gender: "male", hobbies: ["Outdoors", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    		      {id:"m5", name: "Noah Noahsson", email: "Noah@test.se", age: 27, gender: "male", hobbies: ["Sports", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    		      {id:"m6", name: "Hugo Hugosson", email: "Hugo@test.se", age: 40, gender: "male", hobbies: ["Outdoors", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    		      {id:"m7", name: "Oliver Oliversson", email: "Oliver@test.se", age: 23, gender: "male", hobbies: ["Outdoors", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    		      {id:"m8", name: "Oscar Oscarsson", email: "Oscar@test.se", age: 21, gender: "male", hobbies: ["Movies", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    		      {id:"m9", name: "Adam Adamsson", email: "Adam@test.se", age: 30, gender: "male", hobbies: ["Food"], preferredAgeMin: "23", preferredAgeMax: "33"}];
    this.femaleUsers = [{id:"f1", name: "Maria Mariadotter", email: "maria@test.se", age: 38, gender: "female", hobbies: ["Other", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    			{id:"f2", name: "Anna Annadotter", email: "anna@test.se", age: 28, gender: "female", hobbies: ["Outdoors", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    			{id:"f3", name: "Margareta Margaretadotter", email: "margareta@test.se", age: 21, gender: "female", hobbies: ["Outdoors", "Fitness"], preferredAgeMin: "23", preferredAgeMax: "33"},
    			{id:"f4", name: "Elisabeth Elisabethdotter", email: "Elisabeth@test.se", age: 22, gender: "female", hobbies: ["Outdoors", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    			{id:"f5", name: "Eva Kristinadotter", email: "kristina@test.se", age: 23, gender: "female", hobbies: ["Outdoors", "Sports"], preferredAgeMin: "23", preferredAgeMax: "33"},
    			{id:"f6", name: "Birgitta Birgittadotter", email: "birgitta@test.se", age: 26, gender: "female", hobbies: ["Outdoors", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    			{id:"f7", name: "Karin Karindotter", email: "arin@test.se", age: 25, gender: "female", hobbies: ["Outdoors", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"},
    			{id:"f8", name: "Ingrid Ingriddotter", email: "ingrid@test.se", age: 23, gender: "female", hobbies: ["Movies"], preferredAgeMin: "23", preferredAgeMax: "33"},
			{id:"f9", name: "Christina Christinadotter", email: "christina@test.se", age: 20, gender: "female", hobbies: ["Outdoors", "Food"], preferredAgeMin: "23", preferredAgeMax: "33"}]
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
var shared = [];
io.on('connection', function(socket) {
  // Send list of orders when a client connects

    socket.on('saveUserMale', function(name, email, age, preferredAgeMin, preferredAgeMax, selectedHobbies){
	console.log("saveUserMale");
	const user = {id: 'm'+(data.maleUsers.length+1), name: name, email: email, age: age, gender: "male", preferredAgeMin: preferredAgeMin, preferredAgeMax: preferredAgeMax, hobbies: selectedHobbies};
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
	data.evalCounter = 18;
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

  socket.on('shareContactInfo', function(name, email, sharedInfo){
	shared.push({name: name, email: email, shared: sharedInfo});

    });

    socket.on('getContactInfo', function(name, callback){
	var share = shared.filter(user => user.shared.includes(name));
	console.log(share);
	callback(share);
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
