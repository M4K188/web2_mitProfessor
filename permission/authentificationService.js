const fs   = require('fs')
const jwt  = require('jsonwebtoken')
const config = require('../config')

var privateKEY  = fs.readFileSync('./permission/private.key', 'utf8')
var publicKEY  = fs.readFileSync('./permission/public.key', 'utf8')


var signOptions = {
 issuer:  config.certifacateIssuer,
 subject:  config.certifacateSubject,
 audience:  config.certifacateAudience,
 expiresIn:  "1h",
 algorithm:  "RS256"
}


function createLoginToken(userName){
  return jwt.sign({userName: userName}, privateKEY, signOptions)
}


function loggedIn(token){
  try{
    let valid = jwt.verify(token, publicKEY, signOptions)
    return valid
  }
  catch(err){
    return false
  }
}

function decodeLoginToken(token){
   return

    jwt.decode(token, {complete: true});
}



exports.loggedIn = loggedIn
exports.createLoginToken = createLoginToken
exports.decodeLoginToken = decodeLoginToken