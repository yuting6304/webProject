var nx2; // button 
var step1, step2, step3;
var name, msg;
var form2;
var form2_val;
var name, account, password, email, phone, fname, lname, date, credit;



window.onload = function(){ 
    // page2
    form2 = document.getElementById("form2");
    // page2's button
    nx2 = document.getElementById("nx2");

    // get each step
    step1 = document.getElementById("step1");
    step2 = document.getElementById("step2");
    step3 = document.getElementById("step3");


    step2.style.backgroundColor = "#61d1d3";
    step2.style.opacity = "0.9"
    step1.style.color = "grey";
    step3.style.color = "grey";

    // used to get input value
    form2_val = document.forms["form2"]; 
}

function checkInfo(){
    if(fname == ""){
        fname.focus();
        return false;
    }
    else if(lname == ""){
        lname.focus();
        return false;
    }
    else if(date == ""){
        date.focus();
        return false;
    }
    else if(credit == ""){
        credit.focus();
        return false;
    }
    window.location.href = "/register3";

    return true;
}

