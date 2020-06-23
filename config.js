config = {
  databaseURL : "clusterweb-xhqih.mongodb.net",
  databaseUserName : "user",
  databasePassword : "user",
  serverPort : process.env.NODE_ENV === 'production' ? 80 : 5000,
  adminPW: "admin",
  adminEmail: "admin@admin.com",
  certifacateIssuer  : 'Ibrahim Soueid',
  certifacateSubject  : 's82753@beuth-hochschule.de',
  certifacateAudience  : 'https://www.beuth-hochschule.de/'
}


module.exports = config
