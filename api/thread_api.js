const thread_api = require('express').Router();
const thread_db = require('../database/thread')
const permission_service = require('../permission/authorisationService')


thread_api.get('/all', async function(request,response){
  let threadList = await thread_db.getThreadList()
  response.json(threadList)
  response.end()
})



thread_api.get('/:threadId', async function(request,response){
  let threadId = request.params.threadId
  let threadResult = await thread_db.getMessageOfThread(threadId)
  response.json({thread: threadResult})
  response.end()
})




thread_api.delete('/:threadId', async function(request,response){
  let  threadId = request.params.threadId
  let status = await thread_db.deleteThread(threadId)
  response.send("OK")
  response.end()

})


//create new thread
thread_api.post('/:threadId', async function(request,response){
  let threadId = request.params.threadId
  let status = await thread_db.deleteMessage(threadId)
  response.send("OK")
  response.end()
})


thread_api.put('/', async function(request,response){
  let threadTitle = request.query.title
  let threadID = await thread_db.createThread(threadTitle)
  response.send(threadID)
  response.end()
})


module.exports = thread_api
