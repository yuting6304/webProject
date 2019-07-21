function start_match(){
    var serverURL = "http://localhost:8088/match_test?"+"option="+"開始撮合";
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
}


function addDefaultUser1(){
    var serverURL = "http://localhost:8088/match_test?"+"option="+"測資1";
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
}


function addDefaultUser2(){
    var serverURL = "http://localhost:8088/match_test?"+"option="+"測資2";
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
}


function addDefaultUser3(){
    var serverURL = "http://localhost:8088/match_test?"+"option="+"測資3";
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
}


function showInfo1(){
    var serverURL = "http://localhost:8088/match_test?"+"option="+"資訊1";
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
}


function showInfo2(){
    var serverURL = "http://localhost:8088/match_test?"+"option="+"資訊2";
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
}


function showInfo3(){
    var serverURL = "http://localhost:8088/match_test?"+"option="+"資訊3";
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
}

