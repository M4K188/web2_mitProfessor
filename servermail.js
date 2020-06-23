const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    
    port: 25,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    },
    authMethod: 'PLAIN',
    debug: true
});

let mailOptions ={
    from: 'ilfilm1998@gmail.com',
    to: 'ilfilm1998@gmail.com',
    cc: 'email',
    subject: 'Web2 Zusatzleistung',
    text: 'Versenden von Emails hat geklappt'
};


transporter.sendMail(mailOptions, function(err, data){
    if(err){
         console.log('Error occurs',err);
    }else{
        console.log("The message was sent");
    }
});