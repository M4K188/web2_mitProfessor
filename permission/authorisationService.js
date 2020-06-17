const message_db = require('../database/message')
const user_db = require('../database/user')
const thread_db = require('../database/thread')





function isPermissionGrantedForMessage(messageId, userId){
    return true
}


function isPermissionGrantedForThread(messageId, userId){
    return true
}


function isPermissionGrantedForUserUpdate(messageId, userId){
    return true
}


exports.isPermissionGrantedForMessage = isPermissionGrantedForMessage
exports.isPermissionGrantedForThread = isPermissionGrantedForThread
exports.isPermissionGrantedForUserUpdate = isPermissionGrantedForUserUpdate
