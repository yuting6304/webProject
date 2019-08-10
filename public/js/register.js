let nx1, nx2, nx3; // button 
let step1, step2, step3;
let form1, form2, form3;

let username, account, password;
let fname, lname, gender, date, phone, credit;
let mail;

let checkInput;
let confirm1 = 0, confirm2 = 0, confirm3 = 0;


window.onload = function(){ 
    // page
    form1 = document.getElementById("form1");
    
    // page next button
    nx3 = document.getElementById("send");

            
    // get each step
    // step 1

    checkInput = document.getElementById("checkInput");
    var start_text = checkInput;
    // 把class "effect"加到text中
    start_text.classList.add("effect");
    if(confirm('前往徵信中心進行身份認證\n'+'https://apply.jcic.org.tw/CreditQueryInput.do\n'+'完成徵信中心認證後再至此平台完成帳號註冊')){
        window.open('https://apply.jcic.org.tw/CreditQueryInput.do');
    }

}

function getInfo(){
    mail = document.getElementById("mail");

    username = document.getElementById("username");
    // account = document.getElementById("account");
    password = document.getElementById("password");
    if(username.value == ""){
        username.focus();
        checkInput.innerHTML = "<p style='color:red'> Please fill in your name! </p>";
        // alert("Please fill in your name!");
        return false;
    }
    else if(password.value == ""){
        checkInput.innerHTML = "<p style='color:red'> Please fill in your password! </p>";
        password.focus();
        // alert("Please fill in your password!");
        return false;
    }
    else if(mail.value == ""){
        checkInput.innerHTML = "<p style='color:red'> please fill in your mail address! </p>";
        mail.focus();
        // alert("Please fill in your mail address!");
        return false;
    }
    

    checkInput.innerHTML = "";
}
