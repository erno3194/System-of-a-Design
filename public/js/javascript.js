/* JAVASCRIPT */

const vm = new Vue({
    el: '#main',
    data: {
	name: "",
	email: "",
	age: "",
	gender: "male",
	preferredAge: "18-25",
	hobbies: ["Sports", "Food", "Outdoors", "Fitness", "Movies", "Other"],
	selectedHobbies: [],
	reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
	currentDate: {name: "Vladimir Ivankoriskoslava Stolinchnaya", table: "1"},
	currentDateNumber: 1,
    },
    methods: {
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
	    if(name && email && age && gender && preferredAge){
		skapaProfil.style.display = "none";
		var waitingScreen = document.getElementById("waitingScreen");
		waitingScreen.style.display = "block";

	    } else {
		var button = document.getElementById("submitProfileButton");
		button.style.color = "red";
		setTimeout(function(){button.style.color = "black";},600);

		if(!name){
		    document.getElementById("nameParagraph").style.color = "red";
		} else document.getElementById("nameParagraph").style.color = "black";
		if(!this.reg.test(email) || !email){
		    document.getElementById("emailParagraph").style.color = "red";
		} else document.getElementById("emailParagraph").style.color = "black";
		if(!age){
		    document.getElementById("ageParagraph").style.color = "red";
		} else document.getElementById("ageParagraph").style.color = "block";
		if(this.selectedHobbies.length == 0){
		    document.getElementById("intressenLabel").style.color = "red";
		} else document.getElementById("intressenLabel").style.color = "black";
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
	}
    }
    
})
