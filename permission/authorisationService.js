const message_db = require('../database/message')
const user_db = require('../database/user')
const thread_db = require('../database/thread')





function isPermissionGrantedForMessage(messageId, userName){
  if (userName === "admin"){
    return true
  }
     return true
}


function isPermissionGrantedForThread(threadId, userName){
  if (userName === "admin"){
    return true
  }
    return true
}


function isPermissionGrantedForUserChange(messageId, userName){
  if (userName === "admin"){
    return true
  }
    return true
}


exports.isPermissionGrantedForMessage = isPermissionGrantedForMessage
exports.isPermissionGrantedForThread = isPermissionGrantedForThread
exports.isPermissionGrantedForUserUpdate = isPermissionGrantedForUserUpdate
