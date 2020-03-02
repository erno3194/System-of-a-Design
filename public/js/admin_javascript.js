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
	numbers: [{id:"1"},{id:"2"},{id:"3"},{id:"4"},{id:"5"},{id:"6"},{id:"7"},{id:"8"},{id:"9"},{id:"0"}],
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
	    var subCatContainer = document.getElementsByClassName("scroller");
	    
	    $(".scroller").scroll(function() {
		for(var i in subCatContainer)
		    $(subCatContainer[i]).scrollTop($(this).scrollTop());
	    });
	    dateInProgressTemp.style.display = "grid";
	    
	},
	exitEvent: function() {
	    console.log("Click");
	    this.hideButtons();
	    
	},
	expand: function(person){
	    var sndBlock = document.getElementById(person.id);
	    //var pairIndex = document.getElementById(this.c + person.id.substring(1));
	    try{
		var block = document.getElementById(sndBlock.id+this.c);
		console.log(block.className);

		var pairIndex = document.getElementsByClassName(block.className.substring(block.className.length-1));
	    } catch(e){
		block = null;
	    }
	    if(sndBlock.style.width == "20em"){
		var bothExpanded = pairIndex[0].style.width=="20em" && pairIndex[2].style.width=="20em"; 
		sndBlock.style.width="15em";
		sndBlock.style.height="3.2em";
		if(block){
		    block.style.width="15em";
		    block.style.height="3.2em";

		    console.log(pairIndex);
		    
		    for(blockTmp in pairIndex){
			try{
			    if(bothExpanded) pairIndex[1].style.marginBottom = "2.3em";
			    if(bothExpanded && pairIndex[blockTmp].style.width == "20em") pairIndex[blockTmp].style.marginBottom = "0em";
			    else if (bothExpanded && pairIndex[blockTmp].style.width == "15em"){
				pairIndex[blockTmp].style.marginBottom = "2.3em";	
			    } else{
				pairIndex[blockTmp].style.marginBottom = "0em";	
			    }
			    
			} catch(e){}
		    }
		}
		sndBlock.innerHTML = person.name + "<br>Age:" + person.age + "<br>";
	    } else if(block != null && block.hasChildNodes()){		
		block.style.width="20em";
		block.style.height="5em";
		sndBlock.style.width="20em";
		sndBlock.style.height="5em";
		sndBlock.innerHTML += "Hobbies: " + person.hobbies + "<br> Email: " + person.email;
		for(blockTmp in pairIndex){
		    try{
			if(pairIndex[blockTmp].style.height != "5em") pairIndex[blockTmp].style.marginBottom = "2.3em";
			if(block.style.height == "5em") block.style.marginBottom = "0em";
		    } catch(e){}
		}
		
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
}

var children = [];
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var block = document.getElementById(data);
    try{
	document.getElementById(block.id+"c").id=block.id[0] + "c";
    } catch(e){}
    if(ev.target.id == "dropoffMale" || ev.target.id == "dropoffFemale"){
	if(block.id[0].toUpperCase() == ev.target.id[7]){
	    block.style.marginTop = "0.5em";
	    ev.target.appendChild(block);
	}
    } else if((ev.target.id[0] == block.id[0]) &&ev.target.hasChildNodes.length == 0 && ev.target.id.substring(ev.target.id.length-1) == "c"){
	block.style.marginTop = "0em";
	ev.target.id = block.id+"c";
	ev.target.style.width = block.style.width;
	ev.target.style.height = block.style.height;
	var parentBlock = ev.target;
	
	var pairIndex = document.getElementsByClassName(parentBlock.className.substring(parentBlock.className.length-1));
	console.log(pairIndex);
	var bothExpanded = pairIndex[0].style.width=="20em" || pairIndex[2].style.width=="20em"; 
	if(ev.target.style.width == "20em"){
	    for(blockTmp in pairIndex){
		try{
		    if(pairIndex[blockTmp].style.height != "5em") pairIndex[blockTmp].style.marginBottom = "2.3em";
		    if(parentBlock.style.height == "5em") parentBlock.style.marginBottom = "0em";
		} catch(e){}
		
	    }
	} else {

	    try{
		if(bothExpanded) pairIndex[1].style.marginBottom = "2.3em";
		else pairIndex[1].style.marginBottom = "0em";
		if(pairIndex[0].style.width == "20em"){
		    pairIndex[0].style.marginBottom = "0em";	
		} else if(bothExpanded){
		    pairIndex[0].style.marginBottom = "2.3em";	
		} else {
		    pairIndex[0].style.marginBottom = "0em";	
		}
		
		if(pairIndex[2].style.width == "20em"){
		    pairIndex[2].style.marginBottom = "0em";	
		} else if(bothExpanded){
		    pairIndex[2].style.marginBottom = "2.3em";	
		} else {
		    pairIndex[2].style.marginBottom = "0em";	
		}
	    } catch(e){}

	    
	}
	ev.target.appendChild(block);
    }
}


