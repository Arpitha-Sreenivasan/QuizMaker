//WE CAN USE PROMISE HERE TO VALIDATE DETAILS
//AND STORE DATA IN DB THEN RETURN TRUE OR FALSE
//IF TRUE THEN LOGIN PAGE

function checkDetails(formdetails){
  console.log(formdetails);
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(formdetails.password.length<=4){
    alert("Password must be at least 5 characters long.");
    return false;
  }else if(formdetails.password != formdetails.retypepassword){
    alert("Retyped passward mismatch.");
    return false;
  }else if(!formdetails.email.match(validRegex)){//  ==null || formdetails.email==""){
    alert("Enter valid email");
    return false;
  }
  //ADD CODE TO CHECK IN DB AND ADD RECORD
  let record="{ email:'"+formdetails.email+"',password: "+formdetails.password+"}";
  return true;
}

function validateform(){
  var formdetails = {
    password: document.myform.password.value,
    retypepassword: document.myform.retypepassword.value,
    email: document.myform.email.value,
  };
  let ret=checkDetails(formdetails);
  console.log(ret);
  alert(ret);
  if(ret){
    //check this
    window.location.href = 'successful.html';
    //window.open('successful.html');
  } 
    


}
