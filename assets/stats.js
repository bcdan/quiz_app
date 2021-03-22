document.addEventListener('DOMContentLoaded', initCharts);
let examIDarray = [];
let dataArray = [];

 async function initCharts(){
    let cards= document.querySelectorAll('.card');
    cards.forEach(card=>examIDarray.push(card.id));
    for(const id of examIDarray){
        const data = await initData(id);

    }
    for(let i = 0 ; i<dataArray.length ; i++){
        chart(i,dataArray[i]);
    }
}

async function getGradesByExam(examID){
    let response = await fetch(`/teachers/getgrades/byexam/${examID}`);
    if(response.ok){
       let res = await response.json();
       return res.scores;
    }
}

function getStandardDeviation (array) {
    if(array.length!=0){
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    }
    return 0;
  }


async function initData(id){
    let temp = await getGradesByExam(id);

    dataArray.push(temp.sort());
}
function chart(index,data){
    let mean = data.reduce((a, b) => a + b, 0)/data.length || 0;
    let std = getStandardDeviation(data);
    Highcharts.chart(`container_${index}`, {
        title: {
            text: `Mean: ${mean.toFixed(2)}  |  Std: ${std.toFixed(2)}`,
            visible: true
        },


        xAxis: {
            visible: false,
        },

        yAxis:{
            min:0,
            max:100,
            tickInterval: 10,
            title: {
                text: 'Grades',
            },

            plotLines: [{
                color: '#FF0000',
                width: 2,
                value: mean
            }]
        },
    
        series: [{
            data: data,
            showInLegend: false,
            name: "Grade"
        }]
    });
}



