var account, password, login_btn;
window.onload = function(){
    account = document.getElementById("account");
    password = document.getElementById("password");
    login_btn = document.getElementById("login_btn");
}
function loginCheck(){
    var acc, psw;
    acc = account.value;
    psw = password.value;
    if(acc == "" || psw == ""){
        alert("Please enter your account or password!");
    }
    else if(acc == "qweszxc6304"){
        if(psw == "qweszxc6304"){
            window.location.href = "./frontend/hall.html";
        }
        else{
            alert("Login failed : password error");
        }
    }
    else{
        alert("Login failed");
    }
}