/* JAVASCRIPT */

const vm = new Vue({
    el: '#main',
    data: {
	name: "",
	email: "",
	age: "",
	gender: "male",
	preferredAge: "18-25" 
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
