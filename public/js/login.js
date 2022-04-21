let LOGINTYPE="Attempt Quiz";

function checkSession() {
if(typeof sessionStorage.EMAIL != 'undefined'){
      window.location.href = "landingPage.html"
  }
}
window.onload = checkSession;

function validatelogin(){
var formdetails={
  email: document.myform.email.value,
  password: document.myform.password.value,
  type: document.myform.type.value
};
if(formdetails.email==null || formdetails.email==""){
  alert("Name can't be blank.");
  return false;
}else if(formdetails.password==null || formdetails.password==""){
  alert("Password can't be blank.");
  return false;
}else if(formdetails.type=="select login type"){
  alert("Please select login type");
  return false;
}else{
  //form details are correctly entered so checkin from db
  fetch('/login', {
  method: 'POST', // or 'PUT'
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',                                                                                                
    'Access-Control-Origin': '*'
  },
  body: JSON.stringify(formdetails),
  }).then(res=>{
      if(res.status=='200'){
        LOGINTYPE=formdetails.type;
        sessionStorage.setItem('LOGINTYPE',LOGINTYPE);
        sessionStorage.setItem('EMAIL',formdetails.email);
        window.location.href = "landingPage.html";
      }
      else{
        alert("Login failed");
      }

    });
  }
}
