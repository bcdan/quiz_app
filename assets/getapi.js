
var ExamToApi = {};

const categories = ["Linux","Code","SQL","DevOps","Docker"];
const durations = [15,30,45,60,90];
const difficulties = ["easy","medium","hard"];



function getQuestionsFromExternalAPI(category,difficulty) {
  return fetch(
    `https://quizapi.io/api/v1/questions?apiKey=bB5wg05TlOfAPpoDCMJQT7Zd3u1gkp2afISs1nK1&limit=4&category=${category}&multiple_correct_answers=false&difficulty=${difficulty}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then((response) => response.json());
}

function parseJSON(array) {
  let Exam = {};
  array.forEach((question) => {
    console.log(question);
    question.correct_answer = Object.entries(question.correct_answers)
      .filter((ans) => ans[1] == "true")[0][0]
      .substring(0, 8);
  });
  Exam = array.map((item) => {
    let question = {};
    let isCorrectAnswer = false;
    question["title"] = item.question;
    question["choices"] = [];
    question["examID"] = ExamToApi._id;
    for (const [key, value] of Object.entries(item.answers)) {
      if (value != null) {
        if (key == item.correct_answer) isCorrectAnswer = true;
        question["choices"].push({ text: value, isCorrect: isCorrectAnswer });
        isCorrectAnswer = false;
      }
    }
    return question;
  });

  return Exam;
}

function postToMyAPI(question) {
  fetch("http://localhost:3000/questions", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(question),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Created Gist:", data);
    });
}

function initExamToApi(teacherID,title,duration) {
  ExamToApi["title"] = title;
  ExamToApi["duration"] = duration;
  ExamToApi["teacherID"]=teacherID;
  console.log(JSON.stringify(ExamToApi));
  return fetch("http://localhost:3000/exams", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(ExamToApi),
  }).then((response) => response.json());
}

function getQuestionsAfterExam(teacherID,title,duration,category,difficulty) {
  show();
  return Promise.all([initExamToApi(teacherID,title,duration), getQuestionsFromExternalAPI(category,difficulty)]);
}
function getRandomExam(teacherID) {
  let randomCategory = randomizeParams(categories);
  getQuestionsAfterExam(teacherID,randomCategory,randomizeParams(durations),randomCategory,randomizeParams(difficulties)).then(([exam, array]) => { // add randomized title,duration,category,difficulty
    ExamToApi["_id"] = exam["_id"];
    let examTemp = parseJSON(array);
    postBulk(examTemp).then(res=>{
      location.reload();
      hide();

      alert("Random exam added successfully!")
    });
  });
}

function randomizeParams(array){
  let randomElement = array[Math.floor(Math.random() * array.length)];
  return randomElement;
}

async function postBulk(bulkOfQuestions) {
  let resp = await fetch("http://localhost:3000/questions/api/post", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(bulkOfQuestions),
  });
  if (!resp.ok) {
    console.log("error fetchin");
  } else {
    return await resp.json();
  }
}


const form = document.getElementById("addExamForm");
form.addEventListener('submit', function customExam(event){
  event.preventDefault();
  const teacherID=event.submitter.id;
  const title =  document.querySelector('#examTitle').value;
  const duration = document.querySelector('#duration').value;
  const category = document.querySelector('#category').value;
  const difficulty = document.querySelector('#difficulty').value.toLowerCase();
  getQuestionsAfterExam(teacherID,title,duration,category,difficulty).then(([exam, array]) => {
    ExamToApi["_id"] = exam["_id"];
    let examTemp = parseJSON(array);
    postBulk(examTemp).then(res=>{
      location.reload();
      hide();

    });
  });
  alert("Exam added successfully!")
    
});

function alert(message){
  let h = document.getElementById("alert");
  let wrapper = document.createElement("div");
  wrapper.innerHTML=`<div class="alert alert-success alert-dismissible fade show" role="alert">${message} <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`
  h.appendChild(wrapper);
}



function show(){
  document.getElementById("spinner-back").classList.add("show");
  document.getElementById("spinner-front").classList.add("show");
}
function hide(){
  document.getElementById("spinner-back").classList.remove("show");
  document.getElementById("spinner-front").classList.remove("show");
}


