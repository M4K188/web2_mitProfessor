const database = require('./database')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');



function getThreadList(){
  return database.ThreadModel.find({}, "id headline")
  .then(function (content, err){
      if (err) return handleError(err);
      let result = content.map(entry => {return {id : entry.id, headline: entry.headline}})
      return result
    }
  )
}



function getThreadById(threadId){

}


function getMessageOfThread(threadId){
  return database.ThreadModel.findOne({id: threadId}, "headline messageList")
  .then(function (result, err){
    const thread = {
      messages : [],
      headline: result.headline,
      threadId : threadId
    }
    return database.MessageModel.find({id : { "$in": result.messageList}})
    .then( function(messageResult, er){
      //sort thread messages by creation time (f.e. by quicksort)... comparator neccessary
      let temp = messageResult.sort((a, b) => {
        if (a.timestamp < b.timestamp){
          return 1
        }
        if (a.timestamp > b.timestamp){
          return -1
        }
        return 0
      })
      thread.messages = messageResult.map(entry => {
        return {
          creator: entry.creator,
          content: entry.content,
          timestamp: entry.timestamp,
          id: entry.id
        }
      })
      return thread
    })
  })
}


function deleteThread(threadId){
  return database.ThreadModel.deleteOne({ id: threadId })
  .then(function (content, err) {
      if (err) return handleError(err);
      return threadId
  })
}


function createThread(title){
  var newThread = new database.ThreadModel({
      headline: title,
      messageList: [],
      id: uuidv4()
  })
  return newThread.save()
  .then(function (newThread, err) {
    if (err){
        return database.handleError(err)
    }
    return newThread.id
  })
}


function isThreadExisting(threadId){
  return database.ThreadModel.find({id: threadId}, "id")
  .then(function (content, err){
      return content.length != 0
  })
}

exports.createThread = createThread
exports.deleteThread = deleteThread
exports.getThreadList = getThreadList
exports.isThreadExisting = isThreadExisting
exports.getMessageOfThread = getMessageOfThread
