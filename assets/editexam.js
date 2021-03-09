let questionForms = document.querySelectorAll('.editQuestionForm')

//  function updateQuestion(formID){
//     return async function(event){
//         event.preventDefault();
//         console.log(formID);
//     }
// }
questionForms.forEach(form=>{
    form.addEventListener("submit",updateQuestion(form.id));
});




 function updateQuestion(formID){
    return async function(event){
        event.preventDefault();
        let form = document.getElementById(`${formID}`);
        let title = form.querySelector('.form-control.question');
        let choicesArray = form.querySelectorAll('.form-control.choice');
        let choices = [...choicesArray].map(choice=>{return {isCorrect:false,text:choice.value}});
        console.log(choices);

        const question = {choices:choices,title:title.value};
        let resp = await fetch(`http://localhost:3000/questions/${formID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(question),
        });
        if (!resp.ok) {
          console.log("error fetching");
        } else {
            let res = await resp.json();
            console.log(res);
          return res;
        }
    }

  }
  
  
  