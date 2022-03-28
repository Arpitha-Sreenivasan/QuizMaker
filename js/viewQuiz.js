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

function createResultStruct(codeToSearch){
    let quizStruct=document.createElement("div");
    if(codeToSearch=="-1"){
        for(let i=0;i<quizCode.length;i++){
            let quizTextTag=document.createElement("p");
            quizTextTag.innerHTML=quizTitle[i];
            let seeBtn=document.createElement("button");
            seeBtn.setAttribute("onclick","loadQuestions()");
            seeBtn.innerHTML="See Result";
            //ADD ACTION TO SEE RESULT BUTTON

            quizStruct.appendChild(quizTextTag);
            quizStruct.appendChild(seeBtn);
        }
    }
    else{
        let index=getQuiz(codeToSearch);
        if(index==-1){
            var quizTextTag=document.createElement("p");
            // ADD STYLING TO P TAG
            quizTextTag.innerHTML="No such quiz found!";
            quizStruct.appendChild(quizTextTag);
        }
        else{
            let quizTextTag=document.createElement("p");
            quizTextTag.innerHTML=quizTitle[index];
            let seeBtn=document.createElement("button");
            seeBtn.setAttribute("onclick","loadQuestions()");
            seeBtn.innerHTML="See Result";
            //ADD ACTION TO SEE RESULT BUTTON

            quizStruct.appendChild(quizTextTag);
            quizStruct.appendChild(seeBtn);
        }
    }


    return quizStruct;
}

function searchQuiz(){
    let searchtext=document.getElementById("input-quiz-code").value;
    console.log(searchtext);

    let parentDom=document.getElementById("display-result");
    removeAllChildren(parentDom);
    let quizStruct;
    if(searchtext.length==0){
        console.log("0");
        quizStruct=createResultStruct("-1");
    }
    else{
        console.log(searchtext.length);
        quizStruct=createResultStruct(searchtext);
    }
    parentDom.appendChild(quizStruct);
}

//USING STATIC DATA FOR NOW
let questionText=["Question1","Question2","Question3-text"];
let questionOptions=["option1#checked:option2","option1:option2#checked:option3#checked","option1:option2#checked"];
let correctOptions=["option1","option1,option2","option1,option2"]

function loadQuestions(){
    removeAllChildren(document.getElementById("display-result"));

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
            checkbox.disabled="disabled";
            checkbox.name = opts[j].split("#")[0];
            checkbox.value = opts[j].split("#")[0];
            checkbox.id = opts[j].split("#")[0];
            if(typeof opts[j].split("#")[1] != 'undefined'){
                checkbox.checked="checked";
            }

            let label=document.createElement("label");
            label.htmlFor = opts[j].split("#")[0];
            label.appendChild(document.createTextNode(opts[j].split("#")[0]));

            questionsContainer.appendChild(label);
            questionsContainer.appendChild(checkbox);
        }
        let answer=document.createElement("p");
        answer.innerHTML="Correct Answer: "+correctOptions[i];
        questionsContainer.appendChild(answer);
    }
    
    document.getElementById("display-result").appendChild(questionsContainer);
}