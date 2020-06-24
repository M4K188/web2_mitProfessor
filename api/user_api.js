const user_api = require('express').Router();
const user_db = require('../database/user')
const permission_service = require('../permission/authorisationService')
const requestHelpers = require('./requestHelpers')


user_api.get('/:userId', function(request,response){
  let userId = request.params.userId
  console.log(userId)
  response.json({ userId: userId})
  response.end()
})


user_api.delete('/:userId', function(request,response){
  if (!requestHelpers.checkValidLogin(request,response)){
    return
  }
  else {
    let userId = request.params.userId
    console.log(userId)
    response.send("OK")
    response.end()
  }
})



//register
user_api.put('/', function(request,response){
  let userId = request.params.userId
  console.log(userId)
  response.send("OK")
  response.end()
})





module.exports = user_api
