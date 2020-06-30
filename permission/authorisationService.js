const message_db = require('../database/message')
const user_db = require('../database/user')
const thread_db = require('../database/thread')





async function isPermissionGrantedForMessage(messageId, userName){
  if (userName === "admin"){
    return true
  }
  return await message_db.getMessageCreator(messageId) === userName
}


function isPermissionGrantedForThread(threadId, userName){
  return userName === "admin"
}


function isPermissionGrantedForUserChange(loggedInName, userName){
  if (loggedInName === "admin"){
    return true
  }
  return loggedInName === userName
}


function isPermissionGrantedForUserCreation(loggedInName){
  return loggedInName === "admin"
  }


exports.isPermissionGrantedForMessage = isPermissionGrantedForMessage
exports.isPermissionGrantedForThread = isPermissionGrantedForThread
exports.isPermissionGrantedForUserChange = isPermissionGrantedForUserChange
exports.isPermissionGrantedForUserCreation = isPermissionGrantedForUserCreation
