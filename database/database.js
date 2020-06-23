const mongoose = require('mongoose');
const config = require('../config')


var mongoDB = `mongodb+srv://${config.databaseUserName}:${config.databasePassword}@${config.databaseURL}/`
mongoose.connect(mongoDB, { useNewUrlParser: true })

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

var Schema = mongoose.Schema;
var UserSchema  = new Schema({
	username: String,
	hashedPassword: String,
	email: String,
  admin: Boolean
  });

var UserModel = mongoose.model('UserModel', UserSchema )

var MessageSchema  = new Schema({
	creator: String,
	content: String,
	id: String,
  timestamp: Number
  });

var MessageModel = mongoose.model('MessageModel', MessageSchema )
var ThreadSchema  = new Schema({
	headline: String,
  messageList: [],
  id: String,
	creator: String
  });


const handleError = function(err) {
    console.error(err);
};



exports.ThreadModel = mongoose.model('ThreadModel', ThreadSchema )
exports.MessageModel = mongoose.model('MessageModel', MessageSchema )
exports.UserModel = UserModel
exports.ThreadSchema = ThreadSchema
exports.MessageSchema = MessageSchema
exports.UserSchema = UserSchema
exports.handleError = handleError