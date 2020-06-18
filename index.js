const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { request } = require('http')
const https = require('https');

const app = express();
const userRouter = require('./api/user_api')
const messageRouter = require('./api/message_api')
const threadRouter = require('./api/thread_api')
const authentificationRouter = require('./api/authentification_api');
const fs = require('fs');
const key = fs.readFileSync('./certificates/keytmp.pem');
const cert = fs.readFileSync('./certificates/cert.pem');
const server = https.createServer({key: key, cert: cert }, app);

const helper = require('./meta/helper')


const config = require('./config')

app.get('/', (req, res) => { res.send('this is an secure server') });
app.use( bodyParser.json() )      // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

app.use('/user', userRouter)
app.use('/message', messageRouter)
app.use('/thread', threadRouter)
app.use('/authentification', authentificationRouter)



server.listen(443, () => { console.log('listening on 443') });

app.listen(config.serverPort, async function(){
  await helper.createAdminUser()
  console.log(`Server Started on Port ${config.serverPort} `)

})
