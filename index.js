var express = require("express");
var app = express(); // 產生express application物件
// 當使用者連線到伺服器的跟目錄時，做出回應
app.get("/", function(req, res){
    res.send("Hello World");
});

app.get("/mypath", function(req, res){
    res.send("This is my path");
})

app.listen(3000, function(){
    console.log("伺服器已啟動再 http://localhost:3000/");
});