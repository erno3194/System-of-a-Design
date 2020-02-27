/* JAVASCRIPT */

const vm = new Vue({
    el: '#main',
    data: {
	mapOn: false,
	mapButtonText: "Show map",
	rating: "",
	interests: "",
	match: "",
	name: "",
	email: "",
	age: "",
	gender: "male",
	preferredAge: "18-25",
	hobbies: ["Sports", "Food", "Outdoors", "Fitness", "Movies", "Other"],
	selectedHobbies: [],
	myDates: [{name:"Kim Johansson", dateNumber: 0},{name:"Alex Andersson", dateNumber: 1}, {name:"Jamie Karlsson", dateNumber:2}],
	sendContactInfo: [], //dateNumbers of the dates to send info to.
	currentDate: {name: "Kim Johansson", table: "1"},
	currentDateNumber: 1,
	reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

    },
    methods: {
	goToEvalTemp: function(){
	    var dateInProgress = document.getElementById("dateInProgressTemp");
	    dateInProgress.style.display = "none";
	    var evaluation = document.getElementById("evalFormDiv");
	    evaluation.style.display = "block";
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
	    for(number in this.sendContactInfo)
		console.log(this.myDates[this.sendContactInfo[number]].name);
	},
	markDone: function(name, email, age, gender, preferredAge){
	    this.name = name,
	    this.email = email,
	    this.age = age,
	    this.gender = gender,
	    this.preferredAge = preferredAge;
	    console.log(name);
	    console.log(email);
	    console.log(age);
	    console.log(gender);
	    console.log(preferredAge);
	    console.log(this.selectedHobbies);
	    var skapaProfil = document.getElementById("skapaProfil");

	    if((name && this.reg.test(email) && age && gender && preferredAge && this.selectedHobbies.length > 0)){
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
		if(!age){
		    document.getElementById("ageParagraph").style.color = "red";
		} else document.getElementById("ageParagraph").style.color = "green";
		if(this.selectedHobbies.length == 0){
		    document.getElementById("intressenLabel").style.color = "red";
		} else document.getElementById("intressenLabel").style.color = "green";
	    }
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
	    var waitingScreen = document.getElementById("waitingScreen");
	    waitingScreen.style.display = "none";
	    var dateInProgressTemp = document.getElementById("dateInProgressTemp");
	    dateInProgressTemp.style.display = "block";

	},
	dateEvaluationView: function() {
	    var dateInProgress = document.getElementById("dateInProgressTemp");
	    dateInProgress.style.display = "none";
	    this.currentDateNumber++;
	},

	showMap: function() {
	    var dateInfo = document.getElementById("currentDateInfo");
	    dateInfo.style.display = "none";
	    var map = document.getElementById("map");
	    map.style.display = "block";
	    this.mapButtonText = "Close map";
	},

	hideMap: function() {
	    var map = document.getElementById("map");
	    map.style.display = "none";
	    
	    var dateInfo = document.getElementById("currentDateInfo");
	    dateInfo.style.display = "block";

	    this.mapButtonText = "Open map";
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
