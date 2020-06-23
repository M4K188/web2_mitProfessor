const database = require('./database')
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');



function createMessage(creatorUserName, content, threadID){
    var newMessage = new database.MessageModel({
        creator: creatorUserName,
        content: content,
        id: uuidv4(),
        timestamp: Date.now()
    })
    return newMessage.save()
      .then(function (newMessage, err) {
        if (err){
            return database.handleError(err)
        }
        const messageId = newMessage.id
        return database.ThreadModel.update(
            { id: threadID },
            { $push: { messageList: newMessage.id } }
        )
        .then(function(newMessage, err){
          return messageId
        })
    })
}


//TODO delete from thread as well
function deleteMessage(messageId){
    return database.MessageModel.deleteOne({ id: messageId }, function (err) {
        if (err) return handleError(err);
        return messageId
    })
}


function editMessage(messageId, new_content){
    return database.MessageModel.updateOne({"id": messageId}, { content: new_content })
    .then(function (newMessage, err){
      if (err){
          return database.handleError(err)
      }
      return messageId
    })
}



function isMessageExisting(messageId){
  return database.MessageModel.find({id: messageId}, "id")
  .then(function (content, err){
    return content.length != 0
  }
  )
}


exports.createMessage = createMessage
exports.deleteMessage = deleteMessage
exports.editMessage = editMessage
exports.isMessageExisting = isMessageExisting