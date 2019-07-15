function getValue(val){
    // let invest_detail = {
    //     index : val.parentNode.parentNode.children[0].innerHTML,
    //     user : val.parentNode.parentNode.children[1].innerHTML,
    //     money : val.parentNode.parentNode.children[2].innerHTML,
    //     rate : val.parentNode.parentNode.children[3].innerHTML,
    //     period : val.parentNode.parentNode.children[4].innerHTML,
    //     reason : val.parentNode.parentNode.children[5].innerHTML,
    //     type : val.parentNode.parentNode.children[6].innerHTML,
    //     status : val.parentNode.parentNode.children[7].innerHTML
    // };

    let invest_money = prompt("輸入想投資的金額", "0");
    if(invest_money == null || invest_money == "" || invest_money == "0") {
        alert("尚未填寫投資金額！！");
        return;
    }

    if (!confirm("確定投資！！")) {
        return;
    } 

    let invest_detail = [];
    for(let i = 0; i < 11; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML)
    }
    // console.log(JSON.stringify(invest_detail));
    var serverURL = "http://localhost:8088/invest?"+"index="+invest_detail[10]+"&user="+invest_detail[1]+"&reliable="+invest_detail[2]+"&money="+invest_detail[3]+"&rate="+invest_detail[4]+"&period="+invest_detail[5]+"&reason="+invest_detail[6]+"&type="+invest_detail[7]+"&status="+invest_detail[9]+"&msg="+invest_money;
    var xhr = new XMLHttpRequest();
    xhr.open('POST',serverURL,true);
    xhr.withCredentials=false;
    xhr.send();
    xhr.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var data=JSON.parse(this.responseText);
            alert("發送成功")
        }
    }

    
    window.location = "/invest_waiting";

}


