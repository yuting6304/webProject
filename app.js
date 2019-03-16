var express = require("express");
var http = require('http');
var path = require('path');
var bodyParser = require("body-parser");
var mysql  = require('mysql'); 
var dbConnection = require('./models/dbConnection');
// var io = require('socket.io');


var app = express(); // 產生express application物件

// var cookieParser = require('cookie-parser');
// var session = require('express-session');
// app.use(cookieParser());
// app.use(session({
// 	  secret: "fd34s@!@dfa453f3DF#$D&W",
// 	  resave: true,
// 		saveUninitialized: true
// }));
// app.use(router);

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8080);

var indexRouter = require('./controllers/index');
var loginRouter = require('./controllers/login');
var introRouter = require('./controllers/intro');
var registerRouter = require('./controllers/register');//*

var register1Router = require('./controllers/register1');
var register2Router = require('./controllers/register2');
var register3Router = require('./controllers/register3');
// var creatorsRouter = require('./controllers/creators');
// var usersRouter = require('./controllers/users');


app.use('/', indexRouter);
// app.use('/creators', creatorsRouter);
// app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/intro', introRouter);

app.use('/register', registerRouter);//*

app.use('/register1', register1Router);
app.use('/register2', register2Router);
app.use('/register3', register3Router);


var server = app.listen(8080, function () {
	// let host = server.address().address
	// let port = server.address().port
    // console.log("Server start http://%s:%s", host, port)
    // console.log("start login cloudDB.........");
	
		// console.log("finish login cloudDB.........");
		dbConnection.connectDB();
		
		console.log("Server start http://127.0.0.1:8080");
	

	// geth.unlockAdminAccount();
});
module.exports = app;
