var i = 0;

function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

function loadFun(){
    const div1 = document.createElement("div");
    div1.setAttribute('id','myProgress');
    const div2 = document.createElement("div");
    div2.setAttribute('id','myBar');
    div1.appendChild(div2);
    
    setTimeout(() => {move()}, 5000);
}