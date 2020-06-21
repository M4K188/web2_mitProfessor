const authentification_api = require('express').Router();
const user_db = require('../database/user')
const authentificationService = require('../permission/authentificationService')

authentification_api.get('/login', async function(request,response){
  let userName = request.query.username
  let password = request.query.password
  let isLoginValid = await user_db.isPassWordValid(userName, password)
  if (isLoginValid){
    let loginToken = authentificationService.createLoginToken(userName)
    response.send(loginToken)
    response.end()
  }
  else{
    response.status(401).send({ error: 'Login failed!' })
    response.end()
  }


})




module.exports = authentification_api
