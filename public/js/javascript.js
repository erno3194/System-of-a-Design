/* JAVASCRIPT */

const vm = new Vue({
    el: '#main',
    data: {
	
    },
    methods: {
	hideButtons: function() {
	    var skapaButton = document.getElementById("skapaProfilButton");
	    var tillButton = document.getElementById("tillProfilButton");
	    skapaButton.style.display = "none";
	    tillButton.style.display = "none";
	},
	skapaProfil: function() {
	    console.log("Click");
	    this.hideButtons();
	},
	tillProfil: function() {
	    console.log("Click");
	    this.hideButtons();
	}
    }
    
})
