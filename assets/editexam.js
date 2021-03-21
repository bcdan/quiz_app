let questionForms = document.querySelectorAll('.editQuestionForm')
let dropdownMenues = document.querySelectorAll('.dropdown-menu');
questionForms.forEach(form=>{
    form.addEventListener("submit",updateQuestion(form.id));
});
dropdownMenues.forEach(drop=>{
  drop.addEventListener("click",updateOption(drop.id));
});
function updateOption(dropdownID){
  return function(event){
    event.preventDefault();
    let dropdown = document.getElementById(dropdownID);
    let option = dropdown.querySelectorAll('.dropdown-item');
    option.forEach(opt=>{
        opt.classList.remove('active');
    });
    event.target.classList.add('active');
  }


  
}
 function updateQuestion(formID){
    return async function(event){
        show();
        event.preventDefault();
        let form = document.getElementById(`${formID}`);
        let title = form.querySelector('.form-control.question');
        let choicesArray = form.querySelectorAll('.form-control.choice');
        let selection = document.getElementById(`drop_${formID}`);
        let correctAnswer = selection.querySelector('.dropdown-item.active').innerText;
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
          hide();
          console.log("error fetching");
        } else {
          hide();
            let res = await resp.json();
            console.log(res);
            location.reload();
          return res;
        }
    }

  }

async function deleteQuestion(questionID){
  show();
    let resp = await fetch(`http://localhost:3000/questions/${questionID}`, {
      method: "DELETE",
    });
    if (!resp.ok) {
      hide();
      console.log("error fetching");
    } else {
      hide();
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
  show();
  let resp = await fetch(`http://localhost:3000/questions/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(question),
  });
  if (!resp.ok) {
    hide();
    console.log("error fetching");
    let res = await resp.json();
    console.log(res);
  } else {
    hide();
      let res = await resp.json();
      console.log(res);
      location.reload();
    return res;
  }

}


function show(){
  document.getElementById("spinner-front").classList.add("show");
}
function hide(){
  document.getElementById("spinner-front").classList.remove("show");
}

  
  
  