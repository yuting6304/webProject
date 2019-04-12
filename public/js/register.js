let nx1, nx2, nx3; // button 
let step1, step2, step3;
let form1, form2, form3;

let username, account, password;
let fname, lname, gender, date, phone, credit;
let mail;

let checkInput;


window.onload = function(){ 
    // page
    form1 = document.getElementById("form1");
    form2 = document.getElementById("form2");
    form3 = document.getElementById("form3");
    
    // page next button
    nx1 = document.getElementById("nx1");
    nx2 = document.getElementById("nx2");
    nx3 = document.getElementById("send");

            
    // get each step
    // step 1
    step1 = document.getElementById("step1");
    step2 = document.getElementById("step2");
    step3 = document.getElementById("step3");

    step1.style.backgroundColor = "#61d1d3";
    step1.style.opacity = "0.9"
    step2.style.color = "grey";
    step3.style.color = "grey";

    // set other invisible
    form2.style.display = "none";  
    form3.style.display = "none";    

    checkInput = document.getElementById("checkInput");
    var start_text = checkInput;
    // 把class "effect"加到text中
    start_text.classList.add("effect");

}

function getInfo1(){
    username = document.getElementById("username");
    // account = document.getElementById("account");
    password = document.getElementById("password");
    if(username.value == ""){
        username.focus();
        checkInput.innerHTML = "<p style='color:red'> Please fill in your name! </p>";
        // alert("Please fill in your name!");
        return false;
    }
    // else if(account.value == ""){
    //     alert("Please fill in your account!");
    //     return false;
    // }
    else if(password.value == ""){
        checkInput.innerHTML = "<p style='color:red'> Please fill in your password! </p>";
        password.focus();
        // alert("Please fill in your password!");
        return false;
    }
    checkInput.innerHTML = "";

    // step 2
    form1.style.display = "none";  
    form2.style.display = "block";  
        
    step1.style.backgroundColor = "";
    step2.style.backgroundColor = "#61d1d3";
    
    step1.style.opacity = "1"
    step2.style.opacity = "0.9";

    step1.style.color = "grey";
    step2.style.color = "white";
    
    confirm1 = 1;

    return true;
    // if(name != "" && account != "" && password != ""){
        // form1.style.display = "none";  
        // form2.style.display = "block";  
        // step1.style.backgroundColor = "none";
        // step2.style.backgroundColor = "#61d1d3";
        // step1.style.opacity = "1"
        // step2.style.opacity = "0.9";
        // step2.style.color = "grey";
        
        // confirm1 = 1;
    // }
}
function getInfo2(){
    fname = document.getElementById("fname");
    lname = document.getElementById("lname");
    // gender = document.getElementsByName("gender");
    date = document.getElementById("date");
    phone = document.getElementById("phone");
    credit = document.getElementById("credit");
    gender=$("input[name='gender']:checked").val();

    let phonerule = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if(fname.value == ""){
        checkInput.innerHTML = "<p style='color:red'> Please fill in first name! </p>";
        fname.focus();
        // alert("Please fill in your first name!");
        return false;
    }
    else if(lname.value == ""){
        checkInput.innerHTML = "<p style='color:red'> Please fill in last name! </p>";
        lname.focus();
        // alert("Please fill in your last name!");
        return false;
    }
    else if(gender == ""){
        checkInput.innerHTML = "<p style='color:red'> Please select your gender! </p>";
        // alert("Please fill in your gender!");
        return false;
    }
    else if(gender == undefined){
        checkInput.innerHTML = "<p style='color:red'> Please select your gender! </p>";
        // alert("Please fill in your gender!");
        return false;
    }
    else if(date.value == ""){
        checkInput.innerHTML = "<p style='color:red'> Please select your birthday! </p>";
        // alert("Please fill in your birthday!");
        return false;
    }
    else if(date.value == undefined){
        checkInput.innerHTML = "<p style='color:red'> Please select your birthday! </p>";
        // alert("Please fill in your birthday!");
        return false;
    }
    else if(phone.value == ""){
        checkInput.innerHTML = "<p style='color:red'> Please fill in your phone number! </p>";
        phone.focus();
        // alert("Please fill in your phone number!");
        return false;
    }
    else if(phone.value.search(phonerule)==-1){
        checkInput.innerHTML = "<p style='color:red'> Your phone number format is error! </p>";
        phone.focus();
        // alert("Please fill the correct phone number!");
        return false;
    }
    else if(credit.value == ""){
        checkInput.innerHTML = "<p style='color:red'> Please fill in your credit card number! </p>";
        credit.focus();
        // alert("Please fill in your credit card number!");
        return false;
    }
    else if(credit.value != "0000000000"){
        checkInput.innerHTML = "<p style='color:red'> Your credit card number format is error! </p>";
        credit.focus();
        // alert("Please fill the correct credit card number!");
        return false;
    }

    checkInput.innerHTML = "";

    // step 3

    form2.style.display = "none";  
    form3.style.display = "block";

    step2.style.opacity = "1"
    step3.style.opacity = "0.9";
    
    step2.style.backgroundColor = "";
    step3.style.backgroundColor = "#61d1d3";
    
    step2.style.color = "grey";
    step3.style.color = "white";

    confirm2 = 1;
    // if(fname != "" && lname != "" && gender != "" && date != "" && phone != "" && credit != ""){
        // form2.style.display = "none";  
        // form3.style.display = "block";  
        // step2.style.backgroundColor = "none";
        // step2.style.opacity = "1"
        // step3.style.opacity = "0.9";
        // step3.style.backgroundColor = "#61d1d3";
        // step2.style.color = "grey";

        // confirm2 = 1;
    // }
}
function getInfo3(){
    mail = document.getElementById("mail");
    if(mail.value == ""){
        checkInput.innerHTML = "<p style='color:red'> please fill in your mail address! </p>";
        mail.focus();
        // alert("Please fill in your mail address!");
        return false;
    }

    checkInput.innerHTML = "";

    confirm3 = 1;
    // if(mail != ""){
    //     confirm3 = 1;
    // }
    // console.log(name+","+account+","+password+"\n"+fname+","+lname+","+gender+","+date+","+phone+","+credit+"\n"+mail);
}

function checkInfo(){
    
    if(confirm1 == 1 && confirm2 == 1 && confirm3 == 1){
        return true;
    } 
    else{
        return false;
    }
    
}
