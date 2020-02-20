/* JAVASCRIPT FÖR UTVÄRDERING AV DEJT */

//var answers = {q1, q2, q3};

const vm = new Vue({
  el: "#submitFormButton",
  data: {
  methods: {
    submitEval: function(){
      console.log("TESTING TESTINGS")

      var matchRate = document.getElementById("submitFormButton").elements['matching'];
      var interestRate = document.getElementById("submitFormButton").elements['interest'];
      var overallRate = document.getElementById("submitFormButton").elements['allRate'];

      console.log(matchRate);
      console.log(interestRate);
      console.log(overallRate);

    }
  }
}
})
