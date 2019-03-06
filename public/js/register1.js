var nx1; // button 
var step1, step2, step3;
var name, msg;
var form1, form2, form3;
var form1_val, form2_val;
var confirmMsg;

var name, account, password, email, phone, fname, lname, date, credit;



window.onload = function(){ 
    // page1
    form1 = document.getElementById("form1");
    // page1's next button
    nx1 = document.getElementById("nx1");
            
    // get each step
    step1 = document.getElementById("step1");
    step2 = document.getElementById("step2");
    step3 = document.getElementById("step3");

    step1.style.backgroundColor = "#61d1d3";
    step1.style.opacity = "0.9"
    step2.style.color = "grey";
    step3.style.color = "grey";

    // used to get input value
    form1_val = document.forms["form1"];  
}

function checkInfo(){
    if(name == ""){
        name.focus();
        return false;
    }
    else if(account == ""){
        account.focus();
        return false;
    }
    else if(password == ""){
        password.focus();
        return false;
    }
    else if(email == ""){
        email.focus();
        return false;
    }
    else if(phone == ""){
        phone.focus();
        return false;
    }
    return true;
}
