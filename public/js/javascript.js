/* JAVASCRIPT */
'use strict';
const socket = io();
var dateStatus = false;
var dateDoneStatus = false;
var dateCounterStatus = 0;

const vm = new Vue({
    el: '#main',
    data: {
	dateReady: false,
	dateDone: false,
	mapOn: false,
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
	myDates: [{name:"Kim Johansson", dateNumber: 0},{name:"Alex Andersson", dateNumber: 1}, {name:"Jamie Karlsson", dateNumber:2}],
	myMatches: [{name: "Kim Johansson", dateNumber: 0, phoneNumber: "112", email: "superduperlångmegamail@mail.se"},
		    {name: "Alex Andersson", dateNumber: 1, phoneNumber: "112", email: "e@mail.se"},
		    {name: "Jamie Karlsson", dateNumber: 2, phoneNumber: "112", email: "e@mail.se"}],
	sendContactInfo: [], //dateNumbers of the dates to send info to.
	currentDate: {name: "Kim Johansson", table: "1"},
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
	submitEval: function(match, interests, rating){
	    console.log(match);
	    console.log(interests);
	    console.log(rating);
	    var block = document.getElementById("evalFormDiv");
	    block.style.display = "none";
	    var myDates = document.getElementById("myDates"); //TODO: get this info from the back-end
	    myDates.style.display = "grid"; //TODO: Show this when all 3 dates are finished.
	},
	sendContactInfoFunction: function(){
	    var evaluation = document.getElementById("evalFormDiv");
	    evalutation.style.display = "none";
	    for(number in this.sendContactInfo)
		console.log(this.myDates[this.sendContactInfo[number]].name);
	    var block = document.getElementById("myDates");
	    block.style.display = "none";
	    var myMatches = document.getElementById("myMatches");
	    myMatches.style.display = "grid";
	    var thankYouMessage = document.getElementById("thankYouMessage");
	    thankYouMessage.style.display = "block";
	    thankYouMessage.style.fontStyle = "italic";
	    thankYouMessage.style.fontSize = "3em";
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
	    if(gender == "male"){
		socket.emit('saveUserMale', name, email, age, ageMinimum, ageMinimum, this.selectedHobbies);
	    }
	    if(gender == "female"){
		socket.emit('saveUserFemale', name, email, age, ageMinimum, ageMinimum, this.selectedHobbies);
	    }
	    var skapaProfil = document.getElementById("skapaProfil");

	    if((name && this.reg.test(email) && age && gender && ageMinimum && ageMaximum && this.selectedHobbies.length > 0)){
		skapaProfil.style.display = "none";
		
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
	    setInterval(this.dateViewTemp, 1000);
	},
	hideButtons: function() {
	    var skapaButton = document.getElementById("skapaProfilButton");
	    var tillButton = document.getElementById("tillProfilButton");
	    skapaButton.style.display = "none";
	    tillButton.style.display = "none";
	},
	skapaProfil: function() {
	    console.log("Click");
	    this.hideButtons();
	    var skapaProfil = document.getElementById("skapaProfil");
	    skapaProfil.style.display = "block";
	},
	tillProfil: function() {
	    console.log("Click");
	    this.hideButtons();
	},
	dateViewTemp: function() {

	    socket.emit('getDateStatus', function(result){
		dateStatus = result.dateReady;
		dateCounterStatus = result.dateCounter;
	    });
	    this.dateCounter = dateCounterStatus;
	    this.dateReady = dateStatus;
	    
	    if (this.dateReady == true) {
		var waitingScreen = document.getElementById("waitingScreen");
		waitingScreen.style.display = "none";
		
		var dateInProgressTemp = document.getElementById("dateInProgressTemp");
		dateInProgressTemp.style.display = "block";
		this.currentDateNumber++;

		setInterval(this.goToEvalTemp, 1000);
	
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
