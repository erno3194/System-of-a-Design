/* JAVASCRIPT */

const socket = io();
var on = false;
var numberOfUsersInEvent = 0;
var maleArrayNew = [];
var femaleArrayNew = [];



function startTimer() {
    if(on){
	var presentTime = document.getElementById('timer').innerHTML;
	var timeArray = presentTime.split(/[:]+/);
	var m = timeArray[0];
	var s = checkSecond((timeArray[1] - 1));
	if(s==59){m=m-1}
	//if(m<0){alert('timer completed')}
	
	document.getElementById('timer').innerHTML =
	    m + ":" + s;
	setTimeout(startTimer, 1000);
    }
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

const vm = new Vue({
    el: '#main',
    data: {
	c: "c",
	f: "f",
	m: "m",
	malesRender: maleArray,
	femalesRender: femaleArray,
	dateInProgressBool: false,
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

	dateViewTemp: function() {
	    if(numberOfUsersInEvent == 2){
		var waitingScreen = document.getElementById("waitingScreen");
		waitingScreen.style.display = "none";
		var dateInProgress = document.getElementById("dateInProgress");
		dateInProgressTemp.style.display = "grid";
	    }
	},
	
	beginEvent: function() {
	    this.hideButtons();
	    var waitingScreen = document.getElementById("waitingScreen");
	    waitingScreen.style.display = "grid";
	    setInterval(this.updateNumberOfUsers, 1000);
	},
	
	exitEvent: function() {
	    console.log("Click");
	    this.hideButtons();
	    
	},
	expand: function(person){
	    var sndBlock = document.getElementById(person.id);
	    var pairIndex = document.getElementById(this.c + person.id.substring(1));
	    if(person.id[0] == 'm'){
		var pair = document.getElementById(this.f + person.id.substring(1));
	    } else{
		var pair = document.getElementById(this.m + person.id.substring(1));
	    }
	    try{
		var block = document.getElementById(sndBlock.id+this.c);
		var trdBlock = document.getElementById(pair.id+this.c);
	    } catch(e){
		block = null;
	    }
	    if(sndBlock.style.width == "20em"){
		sndBlock.style.width="15em";
		sndBlock.style.height="3.2em";
		if(block){
		    block.style.width="15em";
		    block.style.height="3.2em";
		}
		sndBlock.innerHTML = person.name + "<br>Age:" + person.age + "<br>";
	    } else if(block != null && block.hasChildNodes()){		
		block.style.width="20em";
		block.style.height="5em";
		sndBlock.style.width="20em";
		sndBlock.style.height="5em";
		sndBlock.innerHTML += "Hobbies: " + person.hobbies + "<br> Email: " + person.email;
	    } else {
		sndBlock.style.width="20em";
		sndBlock.style.height="5em";
		sndBlock.innerHTML += person.hobbies + "<br>" + person.email;
		
	    }
	},


	updateNumberOfUsers: function() {
	    socket.emit('getNumberOfUsers', function(result) {
		numberOfUsersInEvent = result;
		document.getElementById("updateUserHeader").innerHTML = result + "/2 users have joined the event";
	    });
	    socket.emit('getUsersFromServer', function(result){
		maleArrayNew = result.maleUsers;
		femaleArrayNew = result.femaleUsers;
	    });
	    if(numberOfUsersInEvent>= 2) {
		document.getElementById("startDateTEMP").style.backgroundColor = "green";
	    }
	    console.log(maleArrayNew);
	    console.log(femaleArrayNew);
	},

	startDate: function(){
	    if(this.dateInProgressBool == false){
		var timer = document.getElementById('timer');
		timer.innerHTML = 005 + ":" + 00;
		var block = document.getElementById("startDateButton");
		this.dateInProgressBool = true;
		let p = document.createElement("p");
		p.innerHTML = "End date";
		block.innerHTML = "";
		block.appendChild(p);
		block.appendChild(timer);
		block.style.backgroundColor = "red";
		on = true;
		startTimer();

	    } else{
		var timer = document.getElementById('timer');
		timer.innerHTML = 005 + ":" + "00";
		var block = document.getElementById("startDateButton");
		let p = document.createElement("p");
		p.innerHTML = "Start date";
		block.innerHTML = "";
		block.appendChild(p);
		block.appendChild(timer);
		block.style.backgroundColor = "green";
		this.dateInProgressBool = false;
		on = false;
	    }
	}
	
    },

    
})

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

var children = [];
function drop(ev, male) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var block = document.getElementById(data);
    if(ev.target.id == "dropoffMale" || ev.target.id == "dropoffFemale"){
	block.style.marginTop = "0.5em";
	ev.target.appendChild(block);
	document.getElementById(block.id+"c").id="c";
    } else if(ev.target.hasChildNodes.length == 0 && ev.target.id.substring(ev.target.id.length-1) == "c"){
	block.style.marginTop = "0em";
	ev.target.id = block.id+"c";
	document.getElementById(ev.target.id).style.width = block.style.width;
	document.getElementById(ev.target.id).style.height = block.style.height;
	ev.target.appendChild(block);
    } else{
	console.log(ev.target.childNodes);
	console.log(ev.target.id);
    }

}
