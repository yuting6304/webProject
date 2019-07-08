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
    let invest_detail = [];
    for(let i = 0; i < 8; i++){
        invest_detail.push(val.parentNode.parentNode.children[i].innerHTML)
    }
    // console.log(JSON.stringify(invest_detail));
    var serverURL = "http://localhost:8088/invest?"+"data="+invest_detail[5];
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

}

// $(document).ready(function(){        
//     $("#send").click(function(){
//         $.post("https://localhost:8088/invest",{data : invest_detail}, function(data){
//             console.log(data);
//         });
//     });
// })