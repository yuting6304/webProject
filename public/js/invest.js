let hours;
let minutes;
let seconds;
let count_down_val = [];

window.onload = function(){
    let table = document.getElementById('table');
    let time = document.getElementById('time');
    let time_value = time.innerHTML.split(',');

    count_down_val = time_value;

    // console.log('here : ' + table.rows[1].cells[12].innerHTML);
    // console.log('here : ' + table.rows[2].cells[12].innerHTML);
    // console.log('here : ' + table.rows[3].cells[12].innerHTML);
    // console.log('here : ' + table.rows[4].cells[12].innerHTML);

    for(let i = 0; i < count_down_val.length; i++){

        seconds = (count_down_val[i]%60);
        minutes = count_down_val[i]/60;
        minutes = (parseInt(minutes, 10)%60);
        hours = count_down_val[i]/3600;
        hours = (parseInt(hours, 10));
        console.log('hours : ' + hours + "\nminutes : " + minutes + "\nseconds : " + seconds);
        
        table.rows[i+1].cells[11].innerHTML = hours.toString()+":"+minutes.toString()+":"+seconds.toString();
    
    }

        window.setTimeout(countdown, 1000, count_down_val);
}

function countdown(count_down_time){
    for(let i = 0; i < count_down_time.length; i++){
        if(count_down_time[i] == 0 && table.rows[i+1].cells[9].innerHTML == 1){
            console.log(count_down_time[i]);

            console.log(table.rows[i].cells[9].innerHTML);

            var serverURL = "http://localhost:8088/invest/changeStatus?"+"user="+table.rows[i+1].cells[1].innerHTML+"&index="+table.rows[i+1].cells[10].innerHTML;
            var xhr = new XMLHttpRequest();
            xhr.open('POST',serverURL,true);
            xhr.withCredentials=false;
            xhr.send();
        }
        count_down_time[i] = count_down_time[i]-1;
        if(count_down_time[i] >= 0){
            seconds = (count_down_val[i]%60);
            minutes = count_down_val[i]/60;
            minutes = (parseInt(minutes, 10)%60);
            hours = count_down_val[i]/3600;
            hours = (parseInt(hours, 10));
            table.rows[i+1].cells[11].innerHTML = hours.toString()+":"+minutes.toString()+":"+seconds.toString();
        }
    }
    window.setTimeout(countdown, 1000, count_down_time);
}



function getValue(val){

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
    var serverURL = "http://localhost:8088/invest?"+"index="+invest_detail[10]+"&user="+invest_detail[1]+"&reliable="+invest_detail[2]+"&money="+invest_detail[3]+"&rate="+invest_detail[4]+"&period="+invest_detail[5]+"&reason="+invest_detail[6]+"&type="+invest_detail[7]+"&status="+invest_detail[9]+"&msg="+invest_money+"&rest_money="+invest_detail[8];
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


