const user_api = require('express').Router();
const user_db = require('../database/user')
const permission_service = require('../permission/authorisationService')


user_api.get('/:userId', function(request,response){
  let userId = request.params.userId
  console.log(userId)
  response.json({ userId: userId})
  response.end()
})


user_api.delete('/:userId', function(request,response){
  let userId = request.params.userId
  console.log(userId)
  response.send("OK")
  response.end()
})



//register
user_api.put('/', function(request,response){
  let userId = request.params.userId
  console.log(userId)
  response.send("OK")
  response.end()
})

//register route
user_api.post('/register', function(request,response){
 let userReg = request.params.userId
  userReg.user_db.createUser()
      .then(result => {
          res.status(result.code).json({
              result: result.result,
              code: result.code,
              message: result.message
          })
      })
      .catch(err => {
          console.log(err)
          res.status(err.code).json({
              result: err.result,
              code: err.code,
              error: err.error
          })
      })
})

user_api.get('/login', async function(request,response){
  let username = request.params.username
  let passWord = request.params.passWord

  let isLoginValid = await user_db.isLoginValid(userName, passWord)
  console.log(isLoginValid)
  response.send(isLoginValid)
  response.end()
})



user_api.get('/logout', function(request,response){
  response.send("OK")
  response.end()
})


module.exports = user_api
