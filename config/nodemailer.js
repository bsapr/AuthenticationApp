const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')
require('dotenv').config();
//Setting up configuration for SMTP.
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'bhavyasapra96@gmail.com',
        pass: 'Type Your Password here please'
    }
});

//Setting up template directory for mail template rendering
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template', err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}