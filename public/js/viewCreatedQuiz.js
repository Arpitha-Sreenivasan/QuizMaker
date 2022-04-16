//function to remove all children added before so multiple quiz elements are not present
function removeAllChildren(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function createResultStruct(quizDetails){
    removeAllChildren(document.getElementById("display-result"));
    //QuizDetails:-
    console.log(quizDetails);
    let basicDetails=document.createElement("div");
    basicDetails.setAttribute("id","basic-container");
    let quizTitle=document.createElement("h3");
    quizTitle.innerHTML="Quiz Title: "+quizDetails.details.title;

    basicDetails.appendChild(quizTitle);
    document.getElementById("display-result").appendChild(basicDetails);

    //Questions
    let qtext=document.createElement("h4");
    qtext.innerHTML="Questions-: ";
    document.getElementById("display-result").appendChild(qtext);
    
    const questions=quizDetails.details.questions;
    let questionsContainer=document.createElement("div");
    questionsContainer.setAttribute("id","questions-container");
    
    for(let i=0;i<questions.length;i++){
        let quesContainer=document.createElement("div");
        quesContainer.setAttribute("id","question"+questions[i].quesNumber);
        
        let quesElem=document.createElement("p");
        quesElem.innerHTML=questions[i].quesNumber+") "+questions[i].questionText;
        
        let optionsElem=document.createElement("p");
        optionsElem.innerHTML="Options: "+questions[i].options;
        
        let ansElem=document.createElement("p");
        ansElem.innerHTML="Correct options: "+questions[i].answers;


        quesContainer.appendChild(quesElem);
        quesContainer.appendChild(optionsElem);
        quesContainer.appendChild(ansElem);
        
        questionsContainer.appendChild(quesContainer);
        
    }
    document.getElementById("display-result").appendChild(questionsContainer);
    return questionsContainer;
    
    
}
async function getQuizDetails(codeToSearch){
    let res=await fetch('/searchQuizzes?id='+codeToSearch);
    let rj=await res.json();
    return rj;
}
async function searchQuiz(){
    let searchtext=await document.getElementById("input-quiz-code").value;
    
    let parentDom=await document.getElementById("display-result");
    await removeAllChildren(parentDom);
    let quizStruct;
    if(searchtext.length==0){
        alert("Enter quiz code to search");
    }
    else{
        const quizDetails=await getQuizDetails(searchtext)
        if(typeof quizDetails.error =='undefined')
            quizStruct=createResultStruct(quizDetails);
        else
            alert(quizDetails.error);
    }
}