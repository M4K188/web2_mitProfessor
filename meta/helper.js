const user_db = require('../database/user')
const config = require('../config')


async function createAdminUser(){
    console.log("Creating Admin User")
    let isAdminExisting = await user_db.isUserExisting("admin")
    if(!isAdminExisting){
        await user_db.createUser("admin", config.adminEmail, config.adminPW, true)
    }
}


exports.createAdminUser = createAdminUser
