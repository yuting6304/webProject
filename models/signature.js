var NodeRSA = require('node-rsa')
var fs = require('fs')

function generator() {
  var key = new NodeRSA({ b: 512 })
  key.setOptions({ encryptionScheme: 'pkcs1' })

  var privatePem = key.exportKey('pkcs1-private-pem')
  var publicPem = key.exportKey('pkcs1-public-pem')

  fs.writeFile('./pem/public.pem', publicPem, (err) => {
    if (err) throw err
    console.log('公鑰已儲存！')
  })
  fs.writeFile('./pem/private.pem', privatePem, (err) => {
    if (err) throw err
    console.log('私鑰已儲存！')
  })
}

function encrypt() {
    fs.readFile('./pem/private.pem', function (err, data) {
      var key = new NodeRSA(data);
      fs.readFile('./file.txt', function (err, content) {
            if (err) throw err;
        
            let cipherText = key.encryptPrivate(content, 'base64');
            console.log(cipherText);
        
        });
      
    });
  }
  
function decrypt() {
fs.readFile('./pem/public.pem', function (err, data) {
    var key = new NodeRSA(data);
    let rawText = key.decryptPublic('xMGJOfJ72T3OEE0mZyU4EoCi77WBluNUSJMCKIkSdcicf7+p6GvCSUdzqLoQi8+qPfu0d43UTixiHqlc0Oghew==', 'utf8');
    console.log(rawText);
});
}

//generator();
// encrypt();
decrypt();