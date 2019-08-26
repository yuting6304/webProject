function showTransactInfo(val){
    let invest_detail = [];
    for(let i = 0; i < 13; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML)
    }
    console.log('type : ' + invest_detail[5]);
    var serverURL = "http://localhost:8088/member/transact_Info?"+"addr="+invest_detail[12];
    // var serverURL = "https://3ed760d9.ngrok.io/member/transact_Info?"+"addr="+invest_detail[12];
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
    
    window.location = "/member/transact_Info";
}

function showMatchInfo(val){

    let invest_detail = [];
    for(let i = 0; i < 13; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML)
    }
    console.log('type : ' + invest_detail[5]);
    console.log('reason : ' + invest_detail[6]);

    var serverURL = "http://localhost:8088/member/match_Info?"+"addr="+invest_detail[12]+"&reason="+invest_detail[6]+"&mode="+"貸款者";
    // var serverURL = "https://3ed760d9.ngrok.io/member/match_Info?"+"addr="+invest_detail[12]+"&reason="+invest_detail[6]+"&mode="+"貸款者";
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
    
    window.location = "/member/match_Info";
}

function cancelBtn(val){
    let invest_detail = [];
    for(let i = 0; i < 13; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML);
        console.log(invest_detail[i]);
    }
    if (!confirm("取消投資！！")) {
        return;
    }
    else{
        alert('投資已取消');
    }
    var serverURL = "http://localhost:8088/member/cancel_transaction?"+"addr="+invest_detail[12]+"&money="+invest_detail[8]+"&mode="+"貸款者"+"&time="+invest_detail[9]+"&type="+invest_detail[7];
    // var serverURL = "https://3ed760d9.ngrok.io/member/cancel_transaction?"+"addr="+invest_detail[12]+"&money="+invest_detail[8]+"&mode="+"貸款者"+"&time="+invest_detail[9]+"&type="+invest_detail[7];
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();

    window.location = '/member/myInvest';
}

