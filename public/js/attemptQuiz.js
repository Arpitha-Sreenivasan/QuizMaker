function checkSession() {
	if(typeof sessionStorage.EMAIL == 'undefined'){
        window.location.href = "home.html"
    }
}
window.onload = checkSession;

//function to remove all children added before so multiple quiz elements are not present
function removeAllChildren(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

async function createResultStruct(quizDetails){
    removeAllChildren(document.getElementById("display-result"));
    let quizContainer = document.createElement("div");

    var quizTextTag=document.createElement("p");
    quizTextTag.innerHTML=quizDetails.details.title;
    quizContainer.appendChild(quizTextTag);

    var takeQuizBtnContainer=document.createElement("div");
    var takeQuizBtn=document.createElement("button");
    takeQuizBtn.setAttribute("onclick","loadQuestions()");
    takeQuizBtn.innerHTML="Take Quiz";

    takeQuizBtnContainer.appendChild(takeQuizBtn);

    document.getElementById("display-result").appendChild(quizContainer);
    document.getElementById("display-result").appendChild(takeQuizBtn);

}

async function getQuiz(codeToSearch){
    let res=await fetch('/searchQuizById?id='+codeToSearch);
    let rj=await res.json();
    return rj;
}
async function searchQuiz(){
    let searchtext=await document.getElementById("input-quiz-code").value;

    let parentDom=await document.getElementById("display-result");
    if(searchtext.length==0){
        alert("Enter quiz code to search");
    }
    else{
        await removeAllChildren(parentDom);

        const quizDetails=await getQuiz(searchtext)
        
        if(typeof quizDetails.error =='undefined'){
            await createResultStruct(quizDetails);
        }
        else
            alert(quizDetails.error);
    }
    
}

//USING STATIC DATA FOR NOW
let questionText=["Question1","Question2","Question3-text"];
let questionOptions=["option1:option2","option1:option2:option3","option1:option2"];

async function loadQuestions(){
    let searchtext=await document.getElementById("input-quiz-code").value;
    const quizDetails=await getQuiz(searchtext)

    removeAllChildren(document.getElementById("display-result"));
    removeAllChildren(document.getElementById("searchquiz-container"));

    const parent=document.getElementById("quiz-details")

    let head=document.createElement("h2");
    head.innerHTML=quizDetails.details.title;

    parent.appendChild(head);

    const formTag=document.createElement('form');
    formTag.setAttribute("method", "post");
    formTag.setAttribute("action", "/submitQuiz");

    let hiddCnt=document.createElement('input');
    hiddCnt.setAttribute('type','hidden');
    hiddCnt.setAttribute('id','quesCount');
    hiddCnt.setAttribute('name','quesCount');
    hiddCnt.setAttribute('value',quizDetails.details.questions.length);

    let hiddId=document.createElement('input');
    hiddId.setAttribute('type','hidden');
    hiddId.setAttribute('id','quid');
    hiddId.setAttribute('name','qid');
    hiddId.setAttribute('value',quizDetails.id);

    formTag.appendChild(hiddCnt);
    formTag.appendChild(hiddId);

    let questions=quizDetails.details.questions;
    for(let i=0;i<questions.length;i++){
        let quesCont=document.createElement("div");
        
        let qtext=document.createElement("p");
        qtext.innerHTML=questions[i].quesNumber+") "+questions[i].questionText;

        quesCont.appendChild(qtext);
        let o=document.createElement("p");
        o.innerHTML="Options:-"
        quesCont.appendChild(o);
        
        let opDiv=document.createElement("div");
        let opArr=questions[i].options;
        for(let j=0;j<opArr.length;j++){
            let opEle=document.createElement("input");
            opEle.setAttribute('type','checkbox');
            opEle.setAttribute('value',opArr[j]);
            opEle.setAttribute('id',questions[i].quesNumber+"_"+opArr[j]);
            opEle.setAttribute('name',questions[i].quesNumber);
            opEle.innerHTML=opArr[j];

            let opTxt=document.createElement("label");
            opTxt.innerHTML=opArr[j];
            
            opDiv.appendChild(opEle);
            opDiv.appendChild(opTxt);
            opDiv.appendChild(document.createElement("br"));
        }
        quesCont.appendChild(opDiv);
        formTag.appendChild(quesCont);
    }
    let submitbtn=document.createElement("button");
    submitbtn.setAttribute("type","submit");
    submitbtn.innerHTML="Submit Quiz";
    formTag.appendChild(submitbtn);

    parent.appendChild(formTag);

}