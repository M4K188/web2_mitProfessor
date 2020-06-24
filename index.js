const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const https = require("https")
const fs   = require('fs')


const app = express();
const userRouter = require('./api/user_api')
const messageRouter = require('./api/message_api')
const threadRouter = require('./api/thread_api')
const authentificationRouter = require('./api/authentification_api');
const helper = require('./meta/helper')
const config = require('./config')


app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/user', userRouter)
app.use('/message', messageRouter)
app.use('/thread', threadRouter)
app.use('/authentification', authentificationRouter)


var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var passPhrase = "abcd"


var credentials = {key: privateKey, cert: certificate, passphrase: passPhrase}

var httpsServer = https.createServer(credentials, app)
httpsServer.listen(config.serverPort, async function(){
  await helper.createAdminUser()
  console.log(`HTTPS Server Started on Port ${config.serverPort} `)
})
