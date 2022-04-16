document.addEventListener("DOMContentLoaded",() => {
    let type=sessionStorage.getItem('LOGINTYPE');
    document.getElementById("flow1").innerHTML=type;
    document.getElementById("flow1").value=type;
    
});

function changeFlow1(){
    if(sessionStorage.getItem('LOGINTYPE')=='Attempt Quiz')
        window.location.href = "attemptQuiz.html"
    else
        window.location.href = "createQuiz.html"
}
function changeFlow2(){
    if(sessionStorage.getItem('LOGINTYPE')=='Attempt Quiz')
        window.location.href = "viewQuiz.html"
    else
        window.location.href = "viewCreatedQuiz.html"
}