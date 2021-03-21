const examTitle = document.querySelector(".title");
const examCard = document.getElementById("exam_card");
const timer = document.querySelector("#timer");
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const progress_bar = document.querySelector("#progress-bar");
const rules_duration = document.querySelector('#rules_duration');
let localExam = allStorage();
let questions;
examTitle.innerText=localExam[0].title;
let examID = localExam[0]._id;
getQuestionsFromDb();
let userAnswers;
let timerCount = 0;
let interval ;
let localDuration = localExam[0].duration*60;
// let localDuration = 10;

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
        response.json().then(data=>{questions=data;userAnswers=Array(questions.length).fill(-1);});
    }
  }


// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
    rules_duration.innerHTML=`${localExam[0].duration} minutes `;
}



//timer logic

function convertSeconds(s){
    function pad(n) {
        return (n < 10 ? "0" + n : n);
      }
    let min = Math.floor(s/60);
    let sec = s % 60;
    return pad(min) + ':' + pad(sec);
}

function timerSetup(){
    interval = setInterval(timeIt,1000);
    timer.innerHTML=(convertSeconds(localDuration-timerCount));
}

function timeIt(){
    timerCount++;
    let prog = timerCount/localDuration * 100;
    progress_bar.style = `width: ${prog}%`;
    timer.innerHTML=convertSeconds(localDuration-timerCount);
    if(timerCount==localDuration){
        showResult();
    }
}

function stopTimer(){
    clearInterval(interval)
    timer.innerHTML='DONE';
    timerCount=0;
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    timerSetup(localDuration);

}

let que_count = 0;
let que_numb = 1;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.replace("/"); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const prev_btn = document.querySelector("footer .prev_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuestions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
    }else{
        showResult(); //calling showResult function
    }
}

// if Next Que button clicked
prev_btn.onclick = ()=>{
    if( que_count >0){ //if question count is less than total question length
        que_count--; //increment the que_count value
        que_numb--; //increment the que_numb value
        showQuestions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
    }
}

// getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+  questions[index].title +'</span>';
    let option_tag ="" ;
    for(let j = 0 ;j<questions[index].choices.length;j++){
        option_tag+='<div class="option"><span>'+ questions[index].choices[j].text +'</span></div>';
    }
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    const option = option_list.querySelectorAll(".option");
    if(userAnswers[que_count]!=-1)
        option[userAnswers[que_count]].classList.add("picked");
    // set onclick attribute to all available options
    for( i=0; i < option.length; i++){
        option[i].setAttribute("onclick", `optionSelected(this,${i})`);
    }
    if(index<questions.length-1){
        next_btn.classList.add("show"); //show the prev button if user selected any option
        next_btn.innerText="Next";

    }
        else
            next_btn.innerText="Submit";
    if(index!=0)
        prev_btn.classList.add("show"); //show the prev button if user selected any option
    else
        prev_btn.classList.remove("show"); //show the prev button if user selected any option


}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer,answerIndex){
    if(userAnswers[que_count]!=-1){
        option_list.children[userAnswers[que_count]].classList.remove("picked");
    }
    userAnswers[que_count]=answerIndex;
    answer.classList.add("picked"); //adding green color to correct selected option
}

function showResult(){
    userScore = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] != -1){
            if (questions[i].choices[userAnswers[i]].isCorrect == true){
                userScore+= 1;
            }
        }
    }

    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    let grade_div = document.querySelector('.grade');
    let score = 100/questions.length;
    grade_div.innerText = score*userScore;
    let scoreTag = '<span><p>'+ userScore +'</p> out of <p>'+ questions.length+' Correct Answers'+'</p></span>';
    scoreText.innerHTML = scoreTag;
    stopTimer();
}


function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}











