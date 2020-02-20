/* JAVASCRIPT */

const vm = new Vue({
    el: '#main',
    data: {
	c: "c",
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
	    var block = document.getElementById(person.id+this.c);
	    var sndBlock = document.getElementById(person.id);
	    console.log(sndBlock.id);
	    block = document.getElementById(sndBlock.id+this.c);
	    if(sndBlock.style.width == "20em"){
		sndBlock.style.width="15em";
		sndBlock.style.height="3.2em";
		block.style.width="15em";
		block.style.height="3.2em";
		sndBlock.innerHTML = person.name + "<br>Age:" + person.age + "<br>";
	    } else{		
		block.style.width="20em";
		block.style.height="5em";
		sndBlock.style.width="20em";
		sndBlock.style.height="5em";
		sndBlock.innerHTML += person.hobbies + "<br>" + person.email;
	    }
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
    if(ev.target.id == "dropoffMale" || ev.target.id == "dropoffFemale"){
	block.style.marginTop = "0.5em";
    } else{
	block.style.marginTop = "0em";
	document.getElementById(ev.target.id).style.width = block.style.width;
	document.getElementById(ev.target.id).style.height = block.style.height;
	block.id = ev.target.id.substring(0, ev.target.id.length-1);
	console.log(block.id);
    }
    ev.target.appendChild(block);
}




