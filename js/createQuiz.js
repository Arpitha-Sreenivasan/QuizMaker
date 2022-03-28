let eleNum = 0;
let count;

function addOptionFunc(event){
    let text = event.target.id;
    const myArray = text.split("-");
    let eleID = parseInt(myArray[1]);

    var opt = document.getElementById("optDiv-"+eleID.toString());

    if(opt.hasChildNodes()){
        count = opt.childNodes.length;
        console.log(count);
    }
    else{
        count = 1;
    }

    var checkBox = document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("id","checkBox-"+eleID.toString()+"-"+count.toString());

    var textOpt = document.createElement("input");
    textOpt.setAttribute("type","text");
    textOpt.setAttribute("id","textOpt-"+eleID.toString()+"-"+count.toString());

    var brk = document.createElement("br");

    opt.appendChild(checkBox);
    opt.appendChild(textOpt);
    opt.appendChild(brk);
}

function addQuestion(){
    //div element
    eleNum++;
    var queDiv = document.getElementById("questionDiv"); 

    var queLabel = document.createElement("label");
    queLabel.innerText = "Question: ";
    queLabel.setAttribute('id', "label"+"-"+eleNum.toString());

    console.log("label"+"-"+eleNum.toString())

    var queText = document.createElement("INPUT");
    queText.setAttribute("type", "text");
    queText.setAttribute('id', "text"+"-"+eleNum.toString());

    var brk = document.createElement("br");
    brk.setAttribute('id',"brk"+"-"+eleNum.toString())

    var ansLabel = document.createElement("label");
    ansLabel.innerText = "Options: ";
    ansLabel.setAttribute('id', "ansLabel"+"-"+eleNum.toString());

    var addOpt = document.createElement("button");
    addOpt.innerHTML = "add options";
    addOpt.setAttribute('id', "addOpt"+"-"+eleNum.toString());

    addOpt.setAttribute("onclick","addOptionFunc(event)");

    var optDiv = document.createElement("div");
    optDiv.setAttribute("id","optDiv-"+eleNum.toString());

    queDiv.appendChild(brk);
    queDiv.appendChild(queLabel);
    queDiv.appendChild(queText);
    queDiv.appendChild(ansLabel);
    queDiv.appendChild(addOpt);
    queDiv.appendChild(optDiv);
}