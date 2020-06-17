const authentification_api = require('express').Router();
const user_db = require('../database/user')


authentification_api.get('/login', async function(request,response){
  let username = request.query.username
  let password = request.query.password
  let isLoginValid = await user_db.isLoginValid(username, password)
  response.send(isLoginValid)
  response.end()
})



authentification_api.get('/logout', function(request,response){
  response.send("OK")
  response.end()
})


module.exports = authentification_api
