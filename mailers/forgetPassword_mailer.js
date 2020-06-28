const nodeMailer = require('../config/nodemailer');


// this Mailer function which actually sends mails providing the random password to user.
exports.forgetPassword = (user) => {
    let htmlString = nodeMailer.renderTemplate({user: user}, '/forgetPassword/forget_password.ejs');

    nodeMailer.transporter.sendMail({
       from: 'bhavyasapra96@gmail.com',
       to: user.email,
       subject: "Password reset!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        // console.log('Message sent', info);
        return;
    });
}