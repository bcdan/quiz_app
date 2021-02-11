let examTitle = document.getElementById("exam_title");
let localExam = allStorage();
let questions;
examTitle.innerText=localExam[0].title;
let examID = localExam[0]._id;
let examCard = document.getElementById("exam_card");
getQuestionsFromDb();



function allStorage() {

    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i])) );
    }

    return values;
}


async function getQuestionsFromDb() {
    let response = await fetch(`/questions/byexam/${examID}`);
    if(response.ok){
        response.json().then(data=>{questions=data;insertQuestions()});
    }
  }

  function insertQuestions(){
      for(let i = 0 ; i<questions.length;i++){
        let questionBlock = document.createElement("div");
        questionBlock.className=`questionBlock_${i}`;
        let questionTitle = document.createElement("h4");
        questionTitle.innerText=questions[i].title;
        questionBlock.appendChild(questionTitle);
        for(let j = 0 ;j<questions[i].choices.length;j++){
            let choiceBlock = document.createElement("div");
            choiceBlock.className="form-check choice-block";
            choiceBlock.innerHTML=`<input class="form-check-input" type="radio" name="flexRadioDefault_${i}" id="question_${i}_${j}">
            <label class="form-check-label" for="flexRadioDefault1" style=>
              ${questions[i].choices[j].text}
            </label>`
            questionBlock.appendChild(choiceBlock);
        }
         examCard.appendChild(questionBlock);
      }

  }
