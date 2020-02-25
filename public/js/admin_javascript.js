/* JAVASCRIPT */
var on = false
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
	    var sndBlock = document.getElementById(person.id);
	    //sndBlock = document.getElementById(sndBlock.id);
	    try{
		var block = document.getElementById(sndBlock.id+this.c);
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
	
    }
    
})

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    document.getElementById(ev.target.id+"c").id="";
}

var children = [];
function drop(ev, male) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var block = document.getElementById(data);
    if(ev.target.id == "dropoffMale" || ev.target.id == "dropoffFemale"){
	block.style.marginTop = "0.5em";
    } else{
	block.style.marginTop = "0em";
	ev.target.id = block.id+"c";
	document.getElementById(ev.target.id).style.width = block.style.width;
	document.getElementById(ev.target.id).style.height = block.style.height;
	//block.id = ev.target.id.substring(0, ev.target.id.length-1);

	console.log(block.id);
    }
    ev.target.appendChild(block);
}
