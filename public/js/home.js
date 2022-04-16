function checkSession() {
	if(typeof sessionStorage.EMAIL != 'undefined'){
        window.location.href = "landingPage.html"
    }
}
window.onload = checkSession;