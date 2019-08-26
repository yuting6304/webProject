function showTransactInfo(val){
    let invest_detail = [];
    for(let i = 0; i < 11; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML)
    }

    var serverURL = "http://localhost:8088/member/transact_Info?"+"addr="+invest_detail[10];
    // var serverURL = "https://3ed760d9.ngrok.io/member/transact_Info?"+"addr="+invest_detail[10];
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
    
    window.location = "/member/transact_Info";
}


function showMatchInfo(val){

    let invest_detail = [];
    for(let i = 0; i < 11; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML)
    }
    console.log('reason : ' + invest_detail[4]);
    var serverURL = "http://localhost:8088/member/match_Info?"+"addr="+invest_detail[10]+"&reason="+invest_detail[5]+"&mode="+"借款者";
    // var serverURL = "https://3ed760d9.ngrok.io/member/match_Info?"+"addr="+invest_detail[10]+"&reason="+invest_detail[5]+"&mode="+"借款者";
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
    
    window.location = "/member/match_Info";
}

function cancelBtn(val){
    let invest_detail = [];
    for(let i = 0; i < 11; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML);
        console.log(invest_detail[i]);
    }
    if (!confirm("取消借款！！")) {
        return;
    }
    else{
        alert('借款已取消');
    }
    var serverURL = "http://localhost:8088/member/cancel_transaction?"+"addr="+invest_detail[10]+"&money="+invest_detail[1]+"&mode="+"借款者"+"&time="+invest_detail[7]+"&type="+invest_detail[6];
    // var serverURL = "https://3ed760d9.ngrok.io/member/cancel_transaction?"+"addr="+invest_detail[10]+"&money="+invest_detail[1]+"&mode="+"借款者"+"&time="+invest_detail[7]+"&type="+invest_detail[6];
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();

    window.location = '/member/myLoan';
}

