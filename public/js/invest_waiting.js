let timer;
let button;

window.onload = function(){

    timer = document.getElementById("timer");
    button = document.getElementById("button");
    window.setTimeout(countdown, 2000);

}


function countdown(){
    timer.innerHTML = timer.innerHTML-1;
    if(timer.innerHTML > 0){
        window.setTimeout(countdown, 1000);
    }
    else{
        window.location = '/invest';
    }
}

function gotoInvest(){
    window.location = '/invest';
}
