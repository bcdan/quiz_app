var ExamToApi = {};

function getQuestionsFromExternalAPI() {
  return fetch(
    "https://quizapi.io/api/v1/questions?apiKey=bB5wg05TlOfAPpoDCMJQT7Zd3u1gkp2afISs1nK1&limit=4&category=Linux&multiple_correct_answers=false",
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

function initExamToApi() {
  ExamToApi["title"] = "Linux";
  ExamToApi["duration"] = 60;
  ExamToApi["date"] = Date.now;
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

function getQuestionsAfterExam() {
  return Promise.all([initExamToApi(), getQuestionsFromExternalAPI()]);
}
function getRandomExam() {
  getQuestionsAfterExam().then(([exam, array]) => {
    ExamToApi["_id"] = exam["_id"];
    let examTemp = parseJSON(array);
    postBulk(examTemp);
  });
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
