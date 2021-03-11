let questionForms = document.querySelectorAll('.editQuestionForm')

questionForms.forEach(form=>{
    form.addEventListener("submit",updateQuestion(form.id));
});


 function updateQuestion(formID){
    return async function(event){
        event.preventDefault();
        let form = document.getElementById(`${formID}`);
        let title = form.querySelector('.form-control.question');
        let choicesArray = form.querySelectorAll('.form-control.choice');
        let selection = form.querySelector('select');
        let correctAnswer = selection.options[selection.selectedIndex].text;
        let choices = [...choicesArray].map(choice=>{return {isCorrect:false,text:choice.value}});
        choices[correctAnswer-1].isCorrect=true;
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

async function deleteQuestion(questionID){
    let resp = await fetch(`http://localhost:3000/questions/${questionID}`, {
      method: "DELETE",
    });
    if (!resp.ok) {
      console.log("error fetching");
    } else {
        let res = await resp.json();
        console.log(res);
        location.reload();

      return res;
    }
  }

  async function addQuestion(exam) {
  const question = {
    examID:exam,
    choices:[
      {text:"a",isCorrect:false},
      {text:"b",isCorrect:false},
      {text:"c",isCorrect:false},
      {text:"d",isCorrect:false}
      ],
      title:"new question"
    };
  console.log(JSON.stringify(question));
  let resp = await fetch(`http://localhost:3000/questions/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(question),
  });
  if (!resp.ok) {
    console.log("error fetching");
    let res = await resp.json();
    console.log(res);
  } else {
      let res = await resp.json();
      console.log(res);
      location.reload();
    return res;
  }

}
  
  
  