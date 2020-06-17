const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const saltRounds = 10


const database = require('./database')



async function isLoginValid(userName, passWord){
  const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(passWord, saltRounds, function(err, hash) {
          if (err) reject(err)
          resolve(hash)
    })
  })
  return  database.UserModel.findOne({'username': userName},'username hashedPassword')
  .then(
      function (content, err) {
          return bcrypt.compareSync(passWord, content.hashedPassword)
      })
}


function logout(userName){

}


async function createUser(userName, email, passWord, admin){
  const newUser = new database.UserModel({
	   username: userName,
	   hashedPassword: passWord,
	   email :email,
     admin: admin
  })
  const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(passWord, saltRounds, function(err, hash) {
          if (err) reject(err)
          resolve(hash)
    })
  })

  console.log(hashedPassword)

   database.UserModel.find({'username': userName},'username hashedPassword',
    function (err, content) {
      if ( content.length != 0){
        return false
      }
      else{
        newUser.hashedPassword = hashedPassword
        newUser.save(function (err) {
            if (err){
                return handleError(err)
            }
            else {
              return true
            }
        })
    }
  })
}


function deleteUser(userName){
  if (!userName === "admin"){
    return database.UserModel.deleteOne({ username: userName })
    .then(function (content, err) {
        if (err) return handleError(err);
        return userName
    })
  }
}


function isAdmin(userName){
  return database.UserModel.find({username: userName, admin: true}, "id")
  .then(function (content, err){
    return content.length != 0
  })
}


function isUserExisting(userName){
  return database.UserModel.find({username: userName}, "id")
  .then(function (content, err){
    return content != 0
  })
}

exports.isUserExisting = isUserExisting
exports.isAdmin = isAdmin
exports.isLoginValid = isLoginValid
exports.createUser = createUser
