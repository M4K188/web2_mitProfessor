const thread_api = require('express').Router();
const thread_db = require('../database/thread')
const requestHelpers = require('./requestHelpers')
const authentificationService = require('../permission/authentificationService')



thread_api.get('/all', async function(request,response){
  let threadList = await thread_db.getThreadList()
  response.json(threadList)
  response.end()
})


//chec if exists
thread_api.get('/:threadId', async function(request,response){
  if (!requestHelpers.checkValidLogin(request,response)){
    return
  }
  //check if threadId is set
  if (!requestHelpers.checkValidParameters(["threadId"], request.params,response)){
    return
  }

  let threadId = request.params.threadId
  let threadResult = await thread_db.getMessageOfThread(threadId)
  response.json({thread: threadResult})
  response.end()
})



//suthentification
//autorisatiob
thread_api.delete('/:threadId', async function(request,response){
  if (!requestHelpers.checkValidLogin(request,response)){
    return
  }
  //check if threadId is set
  if (!requestHelpers.checkValidParameters(["threadId"], request.params,response)){
    return
  }
  let threadId = request.params.threadId
  let userName = requestHelpers.getLogginInUserName(request)

  let status = await thread_db.deleteThread(threadId)
  response.send("OK")
  response.end()

})


//authentification_api
//authorisationService
//Edit thread
thread_api.post('/:threadId', async function(request,response){
  if (!requestHelpers.checkValidLogin(request,response)){
    return
  }
  //check if threadId is set
  if (!requestHelpers.checkValidParameters(["threadId"], request.params,response)){
    return
  }
  let threadId = request.params.threadId
  let userName = requestHelpers.getLogginInUserName(request)

//  let status = await thread_db.deleteMessage(threadId)
  response.send("OK")
  response.end()
})

//create new thread
thread_api.put('/', async function(request,response){
  if (!requestHelpers.checkValidLogin(request,response)){
    return
  }

  let threadTitle = request.query.title
  let threadID = await thread_db.createThread(threadTitle, userName)
  response.send(threadID)
  response.end()
})


module.exports = thread_api
