let nx; // button 
let form1, form2;
let step1, step2;

let money, rate, period, /*credit,*/ reason;
let pass_str;

let checkInput;
let confirm1, confirm2;


window.onload = function(){ 
    // page
    form1 = document.getElementById("form1");
    form2 = document.getElementById("form2");
    
    
    // page next button
    nx = document.getElementById("nx");
   

    // get each step
    // step 1
    step1 = document.getElementById("step1");
    step2 = document.getElementById("step2");
    step3 = document.getElementById("step3");

    step1.style.backgroundColor = "#61d1d3";
    step1.style.opacity = "0.9"
    step1.style.color = "white";
    step2.style.color = "grey";

    // set other invisible
    form2.style.display = "none";  

    checkInput = document.getElementById("checkInput");
    var start_text = checkInput;
    // 把class "effect"加到text中
    start_text.classList.add("effect");

    confirm1 = 0;
    confirm2 = 0;

}

function getInfo1(){
    money = document.getElementById("money");
    rate = document.getElementById("rate");
    period = document.getElementById("period");
    // credit = document.getElementById("credit");
    reason = document.getElementById("reason");

    let moneyrule = /^[1-9]\d*(?:\.\d+)?(?:[kmbt])?$/;

    if(money.value == ""){
        money.focus();
        checkInput.innerHTML = "<p style='color:red'> Please fill in the money you want to loan! </p>";
        return false;
    }
    else if(money.value.search(moneyrule) == -1){
        money.focus();
        checkInput.innerHTML = "<p style='color:red'> The money you want to loan is error format! </p>";
        return false;
    }
    else if(rate.value == ""){
        checkInput.innerHTML = "<p style='color:red'> Please fill in the rate you want to affort! </p>";
        rate.focus();
        return false;
    }
    else if(rate.value > 12 || rate.value <= 0){
        checkInput.innerHTML = "<p style='color:red'> The rate you want to affort is error format! </p>";
        rate.focus();
        return false;
    }
    else if(period.value == ""){
        checkInput.innerHTML = "<p style='color:red'> Please fill in the monthly period you want! </p>";
        period.focus();
        return false;
    }
    else if(period.value <= 0){
        checkInput.innerHTML = "<p style='color:red'> The monthly period you want is error format! </p>";
        period.focus();
        return false;
    }
    // else if(credit.value == ""){
    //     checkInput.innerHTML = "<p style='color:red'> Please fill in your credit card number! </p>";
    //     credit.focus();
    //     return false;
    // }
    // else if(credit.value != "0000000000"){
    //     checkInput.innerHTML = "<p style='color:red'> Your credit card number format is error! </p>";
    //     credit.focus();
    //     return false;
    // }
    else if(reason.value == ""){
        reason.focus();
        checkInput.innerHTML = "<p style='color:red'> Please fill in the reason you want to loan! </p>";
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
}
function getInfo2(){
    pass_str = document.getElementById("pass_str");
    
    if(pass_str.value == ""){
        checkInput.innerHTML = "<p style='color:red'> Please fill in your verify token! </p>";
        pass_str.focus();
        return false;
    }
    
    checkInput.innerHTML = "";

    confirm2 = 1;
}

function checkInfo(){

    if(confirm1 == 1 && confirm2 == 1){
        return true;
    } 
    else{
        return false;
    }
    
}
