var app = require('../app')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register2', { title: 'Express' });
});

module.exports = router;
