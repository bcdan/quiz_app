document.addEventListener("DOMContentLoaded", init);
let examIDarray = [];
let dataArray = [];
let studentForm; 

function init(){
  initStudents();
  initCharts();
}

function initStudents(){
  studentForm = document.querySelector('#bystudent_form');
  studentForm.addEventListener("submit",async (event)=>{
    event.preventDefault();
    let studentid = studentForm.querySelector('.form-control.studentid');
    let response = await fetch(`/teachers/getgrades/bystudent/${studentid.value}`);
    if (response.ok) {
      let res = await response.json();
      studentChart(res.titles,res.grades);
    }
    else alert("No such student ID");
  });
}

function alert(message){
  let h = document.querySelector('.card-title')
  let wrapper = document.createElement("div");
  wrapper.innerHTML=`<div class="alert alert-danger alert-dismissible fade show" role="alert">${message} <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`
  h.appendChild(wrapper);
}

function studentChart(titleArray,gradesArray){
  let mean = gradesArray.reduce((a, b) => a + b, 0) / gradesArray.length || 0;
  let std = getStandardDeviation(gradesArray);
  Highcharts.chart('student-chart-container', {
    title: {
      text: `Mean: ${mean.toFixed(2)}  |  Std: ${std.toFixed(2)}`,
      visible: true,
    },

  chart: {
    type: 'bar'
},

xAxis: {
    categories: titleArray,
    labels:{
      style:{
        fontSize: '20px'
      }
    },
    title: {
        text: 'Exams',
        style:{
          fontSize: '30px',
          color: 'black'
        }
        
    },


},
yAxis: {
  min: 0,
  max: 100,
  tickInterval: 10,
    title: {
        text: 'Grades (0-100)',
        align: 'high',
        style:{
          fontSize: '20px',
          color: 'black'
        }
    },
    labels: {
        overflow: 'justify',
        style:{
          fontSize: '15px'
        }
    }
},
tooltip: {
    valueSuffix: ' points',
    style:{
      fontSize: '15px'
    }

},
plotOptions: {
    bar: {
        dataLabels: {
            enabled: true,
            style:{
              fontSize: '15px'
            }
        }
    }
},
series: [{
    name: 'Grade',
    data: gradesArray,
}]







  });

}

async function initCharts() {
  let cards = document.querySelectorAll(".card-chart");
  cards.forEach((card) => examIDarray.push(card.id));
  for (const id of examIDarray) {
    const data = await initData(id);
  }
  for (let i = 0; i < dataArray.length; i++) {
    chart(i, dataArray[i]);
  }
}

async function getGradesByExam(examID) {
  let response = await fetch(`/teachers/getgrades/byexam/${examID}`);
  if (response.ok) {
    let res = await response.json();
    return res.scores;
  }
}

function getStandardDeviation(array) {
  if (array.length != 0) {
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(
      array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
    );
  }
  return 0;
}

async function initData(id) {
  let temp = await getGradesByExam(id);
  dataArray.push(temp.sort());
}
function chart(index, data) {
  data.sort(function(a, b){return a-b});
  let mean = data.reduce((a, b) => a + b, 0) / data.length || 0;
  let std = getStandardDeviation(data);
  Highcharts.chart(`container_${index}`, {
    title: {
      style:{
        fontSize: '20px',
        color: 'black'
      },
      text: `Mean: ${mean.toFixed(2)}  |  Std: ${std.toFixed(2)}`,
      visible: true,
    },

    xAxis: {
      visible: false,
    },

    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 10,
      labels:{
        style:{
          fontSize: '15px',
          color: 'black'
        }
      },
      title: {
        style:{
          fontSize: '25px',
          color: 'black'
        },
        text: "Grades",
      },

      plotLines: [
        {
          color: "#FF0000",
          width: 2,
          value: mean,
        },
      ],
    },
    tooltip: {
      style:{
        fontSize: '15px'
      }
  },
    series: [
      {
        style:{
          fontSize: '20px',
          color: 'black'
        },
        data: data,
        showInLegend: false,
        name: "Grade",
      },
    ],
    
  });
}
