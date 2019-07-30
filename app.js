var express = require("express");
var http = require('http');
var https = require('https');
var path = require('path');
var bodyParser = require("body-parser");
var session = require('express-session');
var mysql  = require('mysql'); 
var dbConnection = require('./models/dbConnection');
var user = require('./models/user');
var geth = require('./geth/deploy_contract');

// var geth = require('./models/geth');
var fs = require('fs');
var MemcachedStore = require("connect-memcached")(session);


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
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*60
    }
    // store: new MemcachedStore({
    //     hosts: ["127.0.0.1:8081"],
    //     // secret: "12347896" // Optionally use transparent encryption for memcache session data
    // })
   
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
app.set('port', process.env.PORT || 8088);

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
var memberinvestRouter = require('./routes/member');
var memberreturnRouter = require('./routes/member');
var membermoneyRouter = require('./routes/member');

var transactinfoRouter = require('./routes/member');
var matchinfoRouter = require('./routes/member');
var returninfoRouter = require('./routes/member');


var registerRouter = require('./routes/register');
var loanRouter = require('./routes/loan');
var chooseRouter = require('./routes/choose');
var matchRouter = require('./routes/match');
var matchTestRouter = require('./routes/match_test');
var investStatusRouter = require('./routes/invest');

var investRouter = require('./routes/invest');
var confirmRouter = require('./routes/confirm');
var logoutRouter = require('./routes/logout');

var investwaitRouter = require('./routes/invest_waiting');
var returnwaitRouter = require('./routes/member');
var retrunStatusRouter = require('./routes/member');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/intro', introRouter);
app.use('/member', memberRouter);
app.use('/member/myLoan', memberloanRouter);
app.use('/member/myInvest', memberinvestRouter);
app.use('/member/myReturn', memberreturnRouter);
app.use('/member/myMoney', membermoneyRouter);

app.use('/member/transact_Info', transactinfoRouter);
app.use('/member/match_Info', matchinfoRouter);
app.use('/member/return_Info', returninfoRouter);
app.use('/member/return_status', retrunStatusRouter);

app.use('/register', registerRouter);
app.use('/loan', loanRouter);
app.use('/choose', chooseRouter);
app.use('/invest', investRouter);
app.use('/match', matchRouter);

app.use('/confirm', confirmRouter);
app.use('/logout', logoutRouter);
app.use('/invest/changeStatus', investStatusRouter);



app.use('/match_test', matchTestRouter);
app.use('/invest_waiting', investwaitRouter);
app.use('/member/return_waiting', returnwaitRouter);


// app.use('/register1', register1Router);
// app.use('/register2', register2Router);
// app.use('/register3', register3Router);


var server = app.listen(8088, function () {
    geth.gethConnection();
    dbConnection.connectDB(function(err, succ){
        if(err){
            throw err;
        }
        else{
            if(succ == 1){
                user.initContract();
                console.log("\nServer start http://127.0.0.1:8088");
                // user.schedule_event_deploy_constract();
                // user.schedule_event_make_a_match();
            }
        }
    });

	// geth.gethConnection();
	// user.initUser();
    
});

// https.createServer(options, app).listen(8081, function(){
// 	dbConnection.connectDB();
// 	geth.gethConnection();
// 	// user.initUser();
// 	console.log("Server start https://127.0.0.1:8081");	
// });


module.exports = app;
