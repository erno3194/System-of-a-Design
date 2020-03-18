/* JAVASCRIPT */
'use strict';
const socket = io();
var dateStatus = false;
var dateDoneStatus = false;
var dateCounterStatus = 0;
var eventStatusGlobal = true;
var matchGlobal = {male: "", female: "", table: ""};
var myMatchesGlobal = [];

const vm = new Vue({
    el: '#main',
    data: {
	dateReady: false,
	dateDone: false,
	mapOn: false,
	helpButtonText: "HELP",
	helpTextOn: false,
	eventStatus: true,
	mapButtonText: "Show map",
	rating: "",
	interests: "",
	match: "",
	name: "",
	email: "",
	age: "",
	gender: "male",
	ageMinimum: "",
	ageMaximum: "",
	hobbies: ["Sports", "Food", "Outdoors", "Fitness", "Movies", "Other"],
	selectedHobbies: [],
	myDates: [],
	myMatches: [],
	sendContactInfo: [], //dateNumbers of the dates to send info to.
	currentDate: {name: "", table: ""},
	currentDateNumber: 1,
	match: {male: "", female: "", table: ""},
	dateCounter: 0,
	reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

    },
    methods: {
	goToEvalTemp: function(){
	    socket.emit('isDateDone', function(result) {
		dateDoneStatus = result.dateDone;
	    });

	    this.dateDone = dateDoneStatus;
	    if (this.dateDone == true) {	
		var dateInProgress = document.getElementById("dateInProgressTemp");
		dateInProgress.style.display = "none";
		var evaluation = document.getElementById("evalFormDiv");
		evaluation.style.display = "block";
		socket.emit('setDateDoneStatusFalse');
		
	    }
	},

	displayHelp: function() {
	    if(!this.helpTextOn){
		var loginButton = document.getElementById("tillProfilButton");
		var createProfileButton = document.getElementById("skapaProfilButton");
		loginButton.style.display = "none";
		createProfileButton.style.display = "none";
		var helpText = document.getElementById("helpText");
		helpText.style.display = "block";
		helpText.innerHTML = "Welcome to Speed Dejting! <br> You will soon go on three dates. But first you need to login or create a profile! Just click on either the Login button or the Create Profile button if it is your first time. Have fun!";
		helpText.style.fontSize = "4em";
		helpText.style.textAlign = "center";
		this.helpButtonText = "HIDE HELP";
		this.helpTextOn = true;
	    }
	    else{
		var loginButton = document.getElementById("tillProfilButton");
		var createProfileButton = document.getElementById("skapaProfilButton");
		loginButton.style.display = "block";
		createProfileButton.style.display = "block";
		var helpText = document.getElementById("helpText");
		helpText.style.display = "none";
		this.helpButtonText = "HELP";
		this.helpTextOn = false;
	    }
	},
	submitEval: function(match, interests, rating){
	    console.log(match);
	    console.log(interests);
	    console.log(rating);
	    this.myDates.push({name: this.currentDate.name, dateNumber: this.myDates.length});
	    socket.emit('incrementEvalCounter');
	    
	    this.incrementEvalCounter;
	    if(this.dateCounter == 3){
		var block = document.getElementById("evalFormDiv");
		block.style.display = "none";
		var myDates = document.getElementById("myDates"); //TODO: get this info from the back-end
		myDates.style.display = "grid"; //TODO: Show this when all 3 dates are finished.
	    }
	    else {
		var block = document.getElementById("evalFormDiv");
		block.style.display = "none";
		var waitingScreen = document.getElementById("waitingScreen");
		waitingScreen.style.display = "block";
	    }
	},
	sendContactInfoFunction: function(){
	    var evaluation = document.getElementById("evalFormDiv");
	    evaluation.style.display = "none";	    
	    socket.emit('shareContactInfo',this.name, this.email, this.sendContactInfo);
	    

	    
	    var block = document.getElementById("myDates");
	    block.style.display = "none";
	    var myMatches = document.getElementById("myMatches");
	    myMatches.style.display = "grid";
	    var thankYouMessage = document.getElementById("thankYouMessage");
	    thankYouMessage.style.display = "block";
	    thankYouMessage.style.fontStyle = "italic";
	    thankYouMessage.style.fontSize = "3em";

	    setInterval(this.getContacts,100);
	    
	},
	getContacts: function(){
	    socket.emit('getContactInfo', this.name, function(result){
		myMatchesGlobal = result;
	    });
	    this.myMatches = myMatchesGlobal;
	},
	submitProfile: function(name, email, age, gender, ageMinimum, ageMaximum){
	    this.name = name,
	    this.email = email,
	    this.age = age,
	    this.gender = gender,
	    this.ageMinimum = ageMinimum;
	    this.ageMaximum = ageMaximum;
	    console.log(name);
	    console.log(email);
	    console.log(age);
	    console.log(gender);
	    console.log(ageMinimum);
	    console.log(ageMaximum);
	    console.log(this.selectedHobbies);
	    
	    var skapaProfil = document.getElementById("skapaProfil");

	    if((name && this.reg.test(email) && age && gender && ageMinimum && ageMaximum && this.selectedHobbies.length > 0)){
		skapaProfil.style.display = "none";
		if(gender == "male"){
		    socket.emit('saveUserMale', name, email, age, ageMinimum, ageMaximum, this.selectedHobbies);
		}
		if(gender == "female"){
		    socket.emit('saveUserFemale', name, email, age, ageMinimum, ageMaximum, this.selectedHobbies);
		}
		var waitingScreen = document.getElementById("waitingScreen");
		waitingScreen.style.display = "block";
	    } else {
		var fail = document.getElementById("failedProfile");
		fail.style.display = "block";
		var button = document.getElementById("submitProfileButton");
		
		button.style.color = "red";
		setTimeout(function(){button.style.color = "black";},600);

		if(!name){
		    document.getElementById("nameParagraph").style.color = "red";
		} else document.getElementById("nameParagraph").style.color = "green";
		if(!this.reg.test(email) || !email){
		    document.getElementById("emailParagraph").style.color = "red";
		} else document.getElementById("emailParagraph").style.color = "green";
		if(!age || age < 18 || age > 101){
		    document.getElementById("ageParagraph").style.color = "red";
		} else document.getElementById("ageParagraph").style.color = "green";
		if(this.selectedHobbies.length == 0){
		    document.getElementById("intressenLabel").style.color = "red";
		} else document.getElementById("intressenLabel").style.color = "green";
		if(!ageMinimum || ageMinimum < 18 || ageMinimum > 101){
		    document.getElementById("ageMinParagraph").style.color = "red";
		}else document.getElementById("ageMinParagraph").style.color = "green";
		if(!ageMaximum || ageMaximum < 18 || ageMaximum > 101){
		    document.getElementById("ageMaxParagraph").style.color = "red";
		}else document.getElementById("ageMaxParagraph").style.color = "green";
	    }
	    setInterval(this.dateViewTemp, 100);
	},
	hideButtons: function() {
	    var skapaButton = document.getElementById("skapaProfilButton");
	    var tillButton = document.getElementById("tillProfilButton");
	    var userHelp = document.getElementById("userHelp");
	    userHelp.style.display = "none";
	    skapaButton.style.display = "none";
	    tillButton.style.display = "none";
	},

	getEventStatus: function() {
	    socket.emit('isEventOver', function(result) {
		eventStatusGlobal = result;
		console.log(result);
	    });
	    this.eventStatus = eventStatusGlobal;
	    if(this.eventStatus == false){
		this.eventOverScreen();
	    }
	},

	eventOverScreen: function() {
	    var screen = document.getElementById("main");
	    screen.style.display = "none";
	    var eventOverScreen = document.getElementById("eventOverDiv");
	    eventOverScreen.innerHTML = "This event has been closed, goodbye!";
	    eventOverScreen.style.fontWeight = "bold";
	    eventOverScreen.style.fontSize = "5em";
	    eventOverScreen.style.textAlign = "center";
	},
	skapaProfil: function() {
	    setInterval(this.getEventStatus, 1000);
	    console.log("Click");
	    this.hideButtons();
	    var skapaProfil = document.getElementById("skapaProfil");
	    skapaProfil.style.display = "block";
	},
	tillProfil: function() {
	    console.log("Click");
	    this.hideButtons();
	},

	incrementEvalCounter: function(){
	    console.log(":)");
	    socket.emit('incrementEvalCounter');
	},
	
	dateViewTemp: function() {

	    
	    socket.emit('getDateStatus', function(result){
		dateStatus = result.dateReady;
		dateCounterStatus = result.dateCounter;
	    });
	    this.dateCounter = dateCounterStatus;
	    this.dateReady = dateStatus;
	    
	    if (this.dateReady == true) {
		socket.emit('getDateFromServer', this.name, function(result){
		    matchGlobal = result;
		});
		this.match = matchGlobal;	
		
		
		// setInterval(this.dateViewTemp, 1000);	    
		this.match = matchGlobal;		    
		if(this.match.female.name == this.name) this.currentDate = {name: this.match.male.name, table: this.match.table};
		else this.currentDate = {name: this.match.female.name, table: this.match.table};
		
		
		var waitingScreen = document.getElementById("waitingScreen");
		waitingScreen.style.display = "none";
		
		var dateInProgressTemp = document.getElementById("dateInProgressTemp");
		dateInProgressTemp.style.display = "block";
		this.currentDateNumber++;

		setInterval(this.goToEvalTemp, 100);
	
	    }


	},
	showMap: function() {
	    var dateInfo = document.getElementById("currentDateInfo");
	    dateInfo.style.display = "none";
	    var map = document.getElementById("map");
	    map.style.display = "block";
	    this.mapButtonText = "Close map";
	    var helpText = document.getElementById("tableMapHelp");
	    helpText.style.display = "none";
	},
	hideMap: function() {
	    var map = document.getElementById("map");
	    map.style.display = "none";   
	    var dateInfo = document.getElementById("currentDateInfo");
	    dateInfo.style.display = "block";
	    this.mapButtonText = "Open map";
	    var helpText = document.getElementById("tableMapHelp");
	    helpText.style.display = "block";
	},	
	showOrHideMap: function() {
	    if (!this.mapOn){
		this.showMap();
		this.mapOn = true;
	    }
	    else{
		this.hideMap();
		this.mapOn = false;
	    }
	},

    }
    
})
