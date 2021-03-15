

const form = document.getElementById("examform");
form.addEventListener('submit',async function postToApi(event){
     event.preventDefault();
    
    const studentID =  document.querySelector('#studentid').value;
    const examID = document.querySelector('#examid').value
    let data = {studentid:studentID , examid:examID};
    let target = '/exams/postdetails';
    console.log("trying to fetch");
        fetch(target,{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
        body: JSON.stringify(data),
 
        
       }).then(response=>{
            if(!response.ok){
                response.json().then(data=>console.log(myAlert(data.msg)));            
                console.log("Error fetching");
                return;
            }
            response.json().then(data=>{
                console.log(data);
                localStorage.setItem(data._id,JSON.stringify(data));
                window.location.replace('/exams/startquiz');
            });
       }).catch(err=>console.log(err));

       
});

function myAlert(message){
    let h = document.getElementById("alertZone");
    let wrapper = document.createElement("div");
    wrapper.innerHTML=`<div class="alert alert-danger alert-dismissible fade show" role="alert">${message} <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`
    h.appendChild(wrapper);
}




