let details={
  email:'admin',
  password:'admin'
};
let LOGINTYPE="Attempt Quiz";
function validatelogin(){
var formdetails={
  email: document.myform.email.value,
  password: document.myform.password.value,
  type: document.myform.type.value
};
console.log("Details",details);
console.log("FormDetails",formdetails);
if(formdetails.email==null || formdetails.email==""){
  alert("Name can't be blank.");
  return false;
}else if(formdetails.password==null || formdetails.password==""){
  alert("Password can't be blank.");
  return false;
}else if(formdetails.type=="select login type"){
  alert("Please select login type");
  return false;
}else if(details.email==formdetails.email && details.password==formdetails.password){
  LOGINTYPE=formdetails.type;
  sessionStorage.setItem('LOGINTYPE',LOGINTYPE);
  window.location.href = "landingPage.html";
  return true;
}
else {
  alert("Validation unsuccessful");
  return false;
}
}
