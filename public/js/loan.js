let send_btn;
let form1;
window.onload = function(){ 
    form1 = document.getElementById('form1');
    send_btn = document.getElementById("send");
    send_btn.disabled = false;
}

function disable_button(){
    // send_btn.disabled = true;
}

function checkInfo(){
    if (confirm("確定送出")) {
        return true;
    } 
    else {
        return false;
    }
}

function gotoMatch(){
    window.location = "/match_test";
}