const user_api = require('express').Router();
const user_db = require('../database/user')
const permission_service = require('../permission/authorisationService')
const requestHelpers = require('./requestHelpers')


user_api.get('/:userId', async function(request,response){
  if (!requestHelpers.checkValidParameters(["userId"], request.params,response)){
    return
  }  else {
    let userId = request.params.userId
    if (await user_db.isUserExisting(userId)){
      console.log(userId)
      response.json({ userId: userId})
      response.end()
    }
    else{
      response.status(404).send({ error: 'User not exists' })
      response.end()
    }
  }
})


user_api.delete('/:userId', async function(request,response){
  if (!requestHelpers.checkValidLogin(request,response)){
    return
  }
  else if (!requestHelpers.checkValidParameters(["userId"], request.params,response)){
    return
  }  else {
    let userId = request.params.userId
    if (await user_db.isUserExisting(userId)){
      console.log(userId)
      response.json({ userId: userId})
      response.end()
    }
    else{
      response.status(404).send({ error: 'User not exists' })
      response.end()
    }
  }
})



//register
user_api.put('/', async function(request,response){
  if (!requestHelpers.checkValidLogin(request,response)){
    return
  }
  else if (!requestHelpers.checkValidParameters(["userName", "email", "password"], request.query,response)){
    return
  }
  let loggedInName = requestHelpers.getLogginInUserName(request)
  if (authorisationService.isPermissionGrantedForUserCreation(loggedInName)){
    let userName = request.query.userName
    let email = request.query.email
    let password = request.query.password
    let userCreationSuccesful = await createUser(userName, email, password, false)
    if (userCreationSuccesful){
      response.send("OK")
    }
    else {
      response.send("User not created")
    }
    response.end()
  }
  else {
    response.status(403).send({ error: 'User has not the required permission' })
    response.end()
  }
})





module.exports = user_api
