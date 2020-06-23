const authentificationService = require('../permission/authentificationService')


function checkValidLogin(request,response){
  let accessControlHeader = request.header("Access-Control-Request-Headers")
  if (!accessControlHeader || !authentificationService.loggedIn(accessControlHeader)){
    response.status(401).send({ error: 'Not loggedIn' })
    response.end()
    return false
  }
  return true
}


function checkValidParameters(requestKeys, params, response){
  for (var key in requestKeys) {
    if (!key in params){
      response.status(400).send({ error: 'Bad Request' })
      response.end()
      return false
    }
  }
  return true
}


exports.checkValidLogin = checkValidLogin
exports.checkValidParameters = checkValidParameters