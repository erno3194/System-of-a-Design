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
	myDates: [{name:"Kajsa Långtefternamnsson", dateNumber: 0},{name:"Bengt Testson", dateNumber: 1}, {name:"Felix Ketchup", dateNumber:2}],
	sendContactInfo: [], //dateNumbers of the dates to send info to.
	reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    },
    methods: {
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
	    var myDates = document.getElementById("myDates"); //TODO: get this info from the back-end
	    if((name && this.reg.test(email) && age && gender && preferredAge)){
		skapaProfil.style.display = "none";
		myDates.style.display = "grid"; //TODO: Show this when all 3 dates are finished.
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
	}
    }
    
})
