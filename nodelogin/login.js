const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const { request } = require('http');



var mongoDB = 'mongodb+srv://user:user@test1-jhddl.mongodb.net/'
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));














var Schema = mongoose.Schema;
var UserSchema  = new Schema({
	username: String,
	password: String,
	email: String,
  });

var UserModel = mongoose.model('UserModel', UserSchema );


var app = express();
app.use('/static', express.static('static'))
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/register', function(request, response) {
	response.sendFile(path.join(__dirname + '/register.html'));
});
app.get('/register_action', function(request, response) {
	//console.log(request.query.user)
	let query = request.query
	let username = query.user
	let password = query.password
	let email = query.email
	// Create an instance of model SomeModel
var new_user = new UserModel({
	username: username,
	password: password,
	email :email
 });
 var Existinguser = mongoose.model('Existinguser', UserSchema,'usermodels');

// find all athletes who play tennis, selecting the 'name' and 'age' fields
Existinguser.find({'username': username},'username',function (err, Existinguser) {

  if (err) return handleError(err);
  if(Existinguser.length > 0 )
	{response.sendFile(path.join(__dirname + '/userexist.html'))}
	else{
		new_user.save(function (err) {

			if (err) return handleError(err);
			response.sendFile(path.join(__dirname + '/usercreated.html'))
			// saved!
		  });

	}
})
});

app.get('/login_action', function(request, response) {
		//console.log(request.query.user)
		let query = request.query
		let username = query.user
		let password = query.password
		let email = query.email
	 var Existinguser = mongoose.model('Existinguser', UserSchema,'usermodels');

	// find all athletes who play tennis, selecting the 'name' and 'age' fields
	Existinguser.find({'username': username, 'password': password},'username',function (err, Existinguser) {

	  if (err) return handleError(err);
	  if(Existinguser.length == 0 )
		{response.sendFile(path.join(__dirname + '/usernotfound.html'))}
		else{

				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');


		}
	})

});
app.get('/home',function(request,response){


	if(request.session.loggedin){
		response.sendFile(path.join(__dirname + '/loggedin.html'))
	}else {
		response.sendFile(path.join(__dirname + '/usernotloggedin.html'))
	}

});

app.get('/',function(request,response){


	if(request.session.loggedin){
		response.sendFile(path.join(__dirname + '/loggedin.html'))
	}else {
		response.sendFile(path.join(__dirname + '/usernotloggedin.html'))
	}

});


app.listen(PORT, console.log('Server Started on Port ${PORT} '));
