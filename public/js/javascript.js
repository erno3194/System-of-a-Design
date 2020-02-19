/* JAVASCRIPT */

const vm = new Vue({
    el: '#main',
    data: {
	malesRender: maleArray,
	femalesRender: femaleArray,
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
	    var waitingScreen = document.getElementById("waitingScreen");
	    waitingScreen.style.display = "grid";
	},
	dateViewTemp: function() {
	    var waitingScreen = document.getElementById("waitingScreen");
	    waitingScreen.style.display = "none";
	    var dateInProgress = document.getElementById("dateInProgress");
	    dateInProgressTemp.style.display = "grid";
	},
	exitEvent: function() {
	    console.log("Click");
	    this.hideButtons();
	    
	},
	expand: function(person){
	    var block = document.getElementById(person.id);
	    var sndBlock = block.childNodes[0];
	    block.style.width="20em";
	    block.style.height="5em";
	    sndBlock.style.width="20em";
	    sndBlock.style.height="4.75em";
	    sndBlock.innerHTML += person.email;
	},
	
    }
    
})

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

var children = [];
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");   
    var block = document.getElementById(data);
    if(ev.target.id == "dropoffMale" || ev.target.id == "dropoffFemale") block.style.marginTop = "0.5em";
    else block.style.marginTop = "0em";
    ev.target.appendChild(block);
    
}




