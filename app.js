var express = require("express");
var http = require('http');
var https = require('https');
var path = require('path');
var bodyParser = require("body-parser");
var session = require('express-session');
var mysql  = require('mysql'); 
var dbConnection = require('./models/dbConnection');
var user = require('./models/user');
var geth = require('./models/geth');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./models/CA/server-key.pem'),
    ca: [fs.readFileSync('./models/CA/cert.pem')],
    cert: fs.readFileSync('./models/CA/server-cert.pem')
};

var app = express(); // 產生express application物件

var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({
	secret: "fd34s@!@dfa453f3DF#$D&W",
	resave: true,
	saveUninitialized: true
}));
// app.use(router);

app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
});


app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8081);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var introRouter = require('./routes/intro');
var memberRouter = require('./routes/member');
var memberloanRouter = require('./routes/member');

var registerRouter = require('./routes/register');
var loanRouter = require('./routes/loan');
var investRouter = require('./routes/invest');
var confirmRouter = require('./routes/confirm');
var logoutRouter = require('./routes/logout');


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/intro', introRouter);
app.use('/member', memberRouter);
app.use('/member/myLoan', memberloanRouter);

app.use('/register', registerRouter);
app.use('/loan', loanRouter);
app.use('/invest', investRouter);

app.use('/confirm', confirmRouter);
app.use('/logout', logoutRouter);

// app.use('/register1', register1Router);
// app.use('/register2', register2Router);
// app.use('/register3', register3Router);


var server = app.listen(8081, function () {		
	dbConnection.connectDB();
	geth.gethConnection();
	// user.initUser();
	console.log("Server start http://127.0.0.1:8081");			
});

// https.createServer(options, app).listen(8080, function(){
// 	dbConnection.connectDB();
// 	geth.gethConnection();
// 	// user.initUser();
// 	console.log("Server start https://127.0.0.1:8080");	
// });


module.exports = app;
