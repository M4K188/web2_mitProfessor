const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { request } = require('http')

const app = express();
const userRouter = require('./api/user_api')
const messageRouter = require('./api/message_api')
const threadRouter = require('./api/thread_api')
const authentificationRouter = require('./api/authentification_api');


const helper = require('./meta/helper')


const config = require('./config')


app.use( bodyParser.json() )      // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));




app.use('/user', userRouter)
app.use('/message', messageRouter)
app.use('/thread', threadRouter)
app.use('/authentification', authentificationRouter)




app.listen(config.serverPort, async function(){
  await helper.createAdminUser()
  console.log(`Server Started on Port ${config.serverPort} `)

})
