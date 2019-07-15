function showTransactInfo(val){
    let invest_detail = [];
    for(let i = 0; i < 12; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML)
    }
    console.log('type : ' + invest_detail[5]);
    var serverURL = "http://localhost:8088/member/transact_Info?"+"addr="+invest_detail[11];
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
    
    window.location = "/member/transact_Info";
}

function showMatchInfo(val){

    let invest_detail = [];
    for(let i = 0; i < 12; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML)
    }
    console.log('type : ' + invest_detail[5]);

    var serverURL = "http://localhost:8088/member/match_Info?"+"addr="+invest_detail[11]+"&reason="+invest_detail[6]+"&mode="+"借款者";
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
    
    window.location = "/member/match_Info";
}
