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
	
	currentDate: {name: "Vladimir Ivankoriskoslava Stolinchnaya", table: "1"},
	reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    },
    methods: {
	sendContactInfoFunction: function(){
	    for(number in this.sendContactInfo)
		console.log(this.myDates[this.sendContactInfo[number]].name);
	},

	hideButtons: function() {
	    var skapaButton = document.getElementById("exitEventButton");
	    var tillButton = document.getElementById("beginEventButton");
	    skapaButton.style.display = "none";
	    tillButton.style.display = "none";
	},
	beginEvent: function() {
	    console.log("Click");
	    this.hideButtons();
	    var beginEvent = document.getElementById("beginEvent");
	    beginEvent.style.display = "block";
	},
	beginEvent: function() {
	    console.log("Click");
	    this.hideButtons();
	},
	dateViewTemp: function() {
	    var waitingScreen = document.getElementById("waitingScreen");
	    waitingScreen.style.display = "none";
	    var dateInProgress = document.getElementById("dateInProgress");
	    dateInProgressTemp.style.display = "block";
	}
    }
    
})
