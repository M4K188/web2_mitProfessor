const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const https = require("https")
const fs   = require('fs')
require('rootpath')();
const cors = require('cors');
const errorHandler = require('helpers/error-handler.js');

const app = express();
const userRouter = require('./api/user_api')
const messageRouter = require('./api/message_api')
const threadRouter = require('./api/thread_api')
const authentificationRouter = require('./api/authentification_api');
const helper = require('./meta/helper')
const config = require('./config')

app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.use('/user', userRouter)
app.use('/message', messageRouter)
app.use('/thread', threadRouter)
app.use('/authentification', authentificationRouter)
// api routes
app.use('/users', require('users/user.controller.js'));

// global error handler
app.use(errorHandler);


var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var passPhrase = "federtasche123"

var credentials = {key: privateKey, cert: certificate, passphrase: passPhrase}

/* var httpsServer = https.createServer(credentials, app)
httpsServer.listen(config.serverPort, async function(){
  await helper.createAdminUser()
  console.log(`HTTPS Server Started on Port ${config.serverPort} `)
}) */

 app.listen(config.serverPort, async function(){
  await helper.createAdminUser()
  console.log(`Server Started on Port ${config.serverPort} `)

})
 
