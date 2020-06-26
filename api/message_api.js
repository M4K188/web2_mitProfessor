const message_api = require('express').Router();
const message_db = require('../database/message')
const thread_db = require('../database/thread')
const authorisationService = require('../permission/authorisationService')
const authentificationService = require('../permission/authentificationService')
const requestHelpers = require('./requestHelpers')



async function isPermissionGrantedForMessage(messageId, userName){
  if (!authorisationService.isPermissionGrantedForMessage(messageId, creatorUserName)){
      response.status(403).send({ error: 'Permission not granted' })
      response.end()
      return false
  }
  return true
}


message_api.get('/:messageId', async function(request,response){
  let messageId = request.params.messageId
  if (!requestHelpers.checkValidParameters(["messageId"], request.params,response)){
    return
  }
  if(!await message_db.isMessageExisting(messageId)){
      response.status(404).send({ error: 'MessageID not exists' })
      response.end()
  }
  let message =  await message_db.getMessage(messageId)
  response.json(message)
  response.end()
})


message_api.delete('/:messageId', async function(request,response){
  if (!requestHelpers.checkValidLogin(request,response)){
    return
  }
  //check if messageId is set
  if (!requestHelpers.checkValidParameters(["messageId"], request.params,response)){
    return
  }
  let messageId = request.params.messageId
  let userName = requestHelpers.getLogginInUserName(request)

  if (!await isPermissionGrantedForMessage(messageId,userName)){
    let status = await message_db.deleteMessage(messageId)
    response.send("OK")
    response.end()
  }
})


//editing message
message_api.post('/:messageId', async function(request,response){
  if (!requestHelpers.checkValidLogin(request,response)){
    return
  }
  //check body valid
  if (!requestHelpers.checkValidParameters(["creatorUserName", "content"], request.body,response)){
    return
  }
  //check params valid
  if (!requestHelpers.checkValidParameters(["messageId"], request.params,response)){
    return
  }

  let userName = requestHelpers.getLogginInUserName(request)
  let messageId = request.params.messageId
  let content = request.body.content
  if (!await isPermissionGrantedForMessage(messageId,userName)){
    let editedID = await message_db.editMessage(messageId, content)
    response.send("OK")
    response.end()
  }
})


//creating a message
message_api.put('/', async function(request,response){
  if (!requestHelpers.checkValidLogin(request,response)){
    return
  }
  //check query valid
  if (!requestHelpers.checkValidParameters(["creatorUserName", "content", "threadId"], request.query,response)){
    return
  }
  let userName = requestHelpers.getLogginInUserName(request)
  let content = request.query.content
  let threadId = request.query.threadId

  if(!await thread_db.isThreadExisting(threadId)){
    response.status(404).send({ error: 'Thread not exists' })
    response.end()
  }
  else {
    let messageId = await message_db.createMessage(userName, content, threadId)
    response.send(messageId)
    response.end()
  }
})




module.exports = message_api
