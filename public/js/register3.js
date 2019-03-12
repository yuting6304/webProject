var step1, step2, step3;
var form3;
window.onload = function(){ 
    // page3
    form3 = document.getElementById("form3");
           
    // get each step
    step1 = document.getElementById("step1");
    step2 = document.getElementById("step2");
    step3 = document.getElementById("step3");

    step3.style.backgroundColor = "#61d1d3";
    step3.style.opacity = "0.9"
    step1.style.color = "grey";
    step2.style.color = "grey"; 
}

function sendMail(){
    // var addr = document.getElementById("mail").value;
    // console.log(addr);
    // form3.setAttribute("action", "//formspree.io/" + addr);
               
    // document.getElementById("from").value = "P2P Borrowing Platform";
    // document.getElementById("subject").value = "Confirm your register";
    // document.getElementById("msg").value = "Go to the following website to start your account";
    // document.getElementById("url").value = "http://127.0.0.1:8080/frontend/hall.html";


    // console.log(addr);
}

