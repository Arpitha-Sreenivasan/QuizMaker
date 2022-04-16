function logout(){
    sessionStorage.removeItem('LOGINTYPE');
    sessionStorage.removeItem('EMAIL');
    fetch("/logout").then(()=>{
        window.location.href = "home.html"
    });
}

function home(){
    window.location.href = "home.html"
}