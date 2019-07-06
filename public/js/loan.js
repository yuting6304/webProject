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
    alert('確定送出');
}