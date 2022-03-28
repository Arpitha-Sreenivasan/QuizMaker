//USING STATIC DATA FOR NOW
let quizCode=["abc123","def456","ghi789"];
let quizTitle=["Mid-Sem Quiz","Sem1 Quiz","Mock Quiz"];
let inputCode;

//function to remove all children added before so multiple quiz elements are not present
function removeAllChildren(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
//ADD CODE TO CHECK QUIZ FROM DB
function getQuiz(codeToSearch){
    let ind=quizCode.indexOf(codeToSearch);
    return ind;
}
function searchQuiz(){
    
    inputCode=document.getElementById("input-quiz-code").value;
    
    removeAllChildren(document.getElementById("display-result"));
    
    //ADD CODE TO CHECK QUIZ CODE IN DB AND RETURN QUIZ DETAILS
    let index=getQuiz(inputCode);
    if(index>=0){
        console.log("YES");
        //ADD CODE TO GO THROUGH QUIZ DETAILS AND PRINT THEM

        var quizTextTag=document.createElement("p");
        // ADD STYLING TO P AND BUTTON
        quizTextTag.innerHTML=quizTitle[index];
        
        var takeQuizBtnContainer=document.createElement("div");
        var takeQuizBtn=document.createElement("button");
        takeQuizBtn.setAttribute("onclick","loadQuestions()");
        takeQuizBtn.innerHTML="Take Quiz";

        
        takeQuizBtnContainer.appendChild(takeQuizBtn);

        document.getElementById("display-result").appendChild(quizTextTag);
        document.getElementById("display-result").appendChild(takeQuizBtnContainer);
        
    }
    else{
        console.log("NO");
        var quizTextTag=document.createElement("p");
        // ADD STYLING TO P TAG
        quizTextTag.innerHTML="No such quiz found!";
        document.getElementById("display-result").appendChild(quizTextTag);
    }

}

//USING STATIC DATA FOR NOW
let questionText=["Question1","Question2","Question3-text"];
let questionOptions=["option1:option2","option1:option2:option3","option1:option2"];

function loadQuestions(){
    removeAllChildren(document.getElementById("display-result"));
    removeAllChildren(document.getElementById("searchquiz-container"));
    let questionsContainer=document.createElement("div");
    questionsContainer.setAttribute("id","questions-container");
    console.log("hello");
    for(let i=0;i<questionText.length;i++){
        let quesElem=document.createElement("p");
        quesElem.innerHTML=questionText[i];
        questionsContainer.append(quesElem);

        let opts=questionOptions[i].split(":");
        for(let j=0;j<opts.length;j++){
            let checkbox=document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = opts[j];
            checkbox.value = opts[j];
            checkbox.id = opts[j];

            let label=document.createElement("label");
            label.htmlFor = opts[j];
            label.appendChild(document.createTextNode(opts[j]));

            questionsContainer.appendChild(label);
            questionsContainer.appendChild(checkbox);
        }
    }
    let submitbtn=document.createElement("button");
    //submitbtn.setAttribute("onclick","loadQuestions()");
    submitbtn.innerHTML="Submit Quiz";
    questionsContainer.appendChild(submitbtn);


    document.getElementById("searchquiz-container").appendChild(questionsContainer);
}