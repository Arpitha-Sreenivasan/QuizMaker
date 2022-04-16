let eleNum = 0;

async function setCheckBoxValue(event,eleId,count){
    event.preventDefault();
    var val=event.target.value    
    var ch = document.getElementById("checkbox-"+eleId+"-"+count);
    ch.setAttribute("value",val);
}

function addOptionFunc(event){
    event.preventDefault();
    const btnId=event.target.id;
    
    let eleID = parseInt(btnId.split("-")[1]);
    
    let chs=document.getElementsByName("checkbox-"+eleID);
    let count=chs.length;
    count++;


    let opCheck=document.createElement("input");
    opCheck.setAttribute("type","checkbox");
    opCheck.setAttribute("id","checkbox-"+eleID+"-"+count);
    opCheck.setAttribute("name","checkbox-"+eleID);
    //setting value in setCheckBoxValue
    
    var opText = document.createElement("input");
    opText.setAttribute("type","text");
    opText.setAttribute("id","textOpt-"+eleID+"-"+count);
    opText.setAttribute("name","textOpt-"+eleID);
    opText.setAttribute("onchange","setCheckBoxValue(event,"+eleID+","+count+")");

    let opContainer=document.getElementById("ques"+eleID+"-options-container");
    opContainer.appendChild(opCheck);
    opContainer.appendChild(opText);

}

function addQuestion(){
    eleNum++;

    var quesDiv=document.createElement("div");
    quesDiv.setAttribute("id","ques"+eleNum+"-container");
    
    var queLabel = document.createElement("label");
    queLabel.innerText = "Question Text: ";

    var quesTextInput=document.createElement("input");
    quesTextInput.setAttribute("type", "text");
    quesTextInput.setAttribute('id', "ques-"+eleNum);
    quesTextInput.setAttribute('name', "ques-"+eleNum);

    var optLabel = document.createElement("label");
    optLabel.innerText = "Options: ";

    var addOptBtn=document.createElement("button");
    addOptBtn.innerHTML = "Add option";
    addOptBtn.setAttribute('id', "addOpt-"+eleNum);
    addOptBtn.setAttribute("onclick","addOptionFunc(event)");    
    
    var optDiv=document.createElement("div");
    optDiv.setAttribute("id","ques"+eleNum+"-options-container");

    quesDiv.appendChild(queLabel);
    quesDiv.appendChild(quesTextInput);
    quesDiv.appendChild(optLabel);
    quesDiv.appendChild(addOptBtn);
    quesDiv.appendChild(optDiv);
    


    var mainCtn = document.getElementById("questionDiv"); 
    mainCtn.appendChild(quesDiv);
    
    document.getElementById("questionCount").setAttribute("value",eleNum);

}

async function submitForm(event){
    event.preventDefault();
    let res=await document.getElementById("myForm").submit();   
    
}
async function redirect(){
    window.location.href="landingPage.html";
}