function checkDetails(formdetails){
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
  return true;
}

function validateform(){
  var formdetails = {
    password: document.myform.password.value,
    retypepassword: document.myform.retypepassword.value,
    email: document.myform.email.value,
  };
  let ret=checkDetails(formdetails);
  if(ret){
    //form details are correctly entered so checkin from db
    fetch('/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',                                                                                                
        'Access-Control-Origin': '*'
      },
      body: JSON.stringify({'email':formdetails.email,'password':formdetails.password}),
      }).then(res=>{
          if(res.status=='200'){
            window.location.href = 'successful.html';
          }
          else{
            alert("Email already exists!");
          }
      });
    } 
}
