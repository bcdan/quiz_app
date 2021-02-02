
const form = document.getElementById("examform");
form.addEventListener('submit',async function getExamFromApi(event){
    event.preventDefault();
    let input =  document.querySelector('#examid');
    let target = '/exams/'+input.value;
        fetch(target,{
        method:'GET',
        headers: {
            'Accept': 'application/json'
          }
       }).then(response=>{
            if(!response.ok){
                console.log("Error fetching");
                return;
            }
            response.json().then(data=>{
                localStorage.setItem(data._id,JSON.stringify(data));
                window.location.replace('/exams');
            });
       })

       
});


