function showTransactInfo(val){
    let invest_detail = [];
    for(let i = 0; i < 9; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML)
    }

    var serverURL = "http://localhost:8088/member/transact_Info?"+"addr="+invest_detail[8];
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
    
    window.location = "/member/transact_Info";
}


function showMatchInfo(val){

    let invest_detail = [];
    for(let i = 0; i < 9; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML)
    }

    var serverURL = "http://localhost:8088/member/match_Info?"+"addr="+invest_detail[8]+"&reason="+invest_detail[4]+"&mode="+"貸款者";
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
    
    window.location = "/member/match_Info";
}
