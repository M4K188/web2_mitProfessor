const message_api = require('express').Router();
const message_db = require('../database/message')
const thread_db = require('../database/thread')
const authorisationService = require('../permission/authorisationService')
const authentificationService = require('../permission/authentificationService')


message_api.get('/:messageId', function(request,response){
  let messageId = request.params.messageId
  response.json({ messageId: messageId})
  response.end()
})


message_api.delete('/:messageId', async function(request,response){
  let messageId = request.params.messageId
  if(!await message_db.isMessageExisting(messageId)){
      response.status(404).send({ error: 'MessageID not exists' })
      response.end()
  }
  else if(!authentificationService.loggedIn(creatorUserName)){
    response.status(403).send({ error: 'User not logged in' })
    response.end()
  }
  else if (authorisationService.isPermissionGrantedForMessage(messageId, creatorUserName)){
    let status = await message_db.deleteMessage(messageId)
    response.send("OK")
    response.end()
  }
  else {
    response.status(403).send({ error: 'Permission not granted' })
    response.end()
  }
})


//editing message
message_api.post('/:messageId', async function(request,response){
  let creatorUserName = request.body.creatorUserName /// that will be taken from loggedin user
  let messageId = request.params.messageId
  let content = request.body.content
  if(!await message_db.isMessageExisting(messageId)){
      response.status(404).send({ error: 'MessageID not exists' })
      response.end()
  }
  else if(!authentificationService.loggedIn(creatorUserName)){
    response.status(403).send({ error: 'User not logged in' })
    response.end()
  }
  else if (authorisationService.isPermissionGrantedForMessage(messageId, creatorUserName)){
    let editedID = await message_db.editMessage(messageId, content)
    response.send("OK")
    response.end()
  }
  else {
    response.status(403).send({ error: 'Permission not granted' })
    response.end()
  }
})


//creating a message
message_api.put('/', async function(request,response){
  let creatorUserName = request.query.creatorUserName /// that will be taken from loggedin user
  let content = request.query.content
  let threadId = request.query.threadId
  if(!authentificationService.loggedIn(creatorUserName)){
    response.status(403).send({ error: 'User not logged in' })
    response.end()
  }
  else if(!await thread_db.isThreadExisting(threadId)){
    response.status(404).send({ error: 'Thread not exists' })
    response.end()
  }
  else {
    let messageId = await message_db.createMessage(creatorUserName, content, threadId)
    response.send(messageId)
    response.end()
  }
})




module.exports = message_api
