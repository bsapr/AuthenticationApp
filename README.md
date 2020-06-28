Authentication APP
Authentication App bulilt in NodeJS and Express

OverView
This project helped me understanding the authentication process including social authentication.

Important point to run this app in your system :-

In nodemailer.js config file, please add your gmail credentials.
One more thing - As googla captcha doesn't support localhost domain so run this app using following url :- 
http://127.0.0.1:8000/

Bonus Features & Implementation details :-
GoogleCaptcha for integrating captcha during sign in/sign up
Reset password feature
Bcrypto library for encryption of passwords.
Keu and Redis for parallel job execution of sending mails for passwords in order to implement forget password feature.

What I have done
Creating server
Handling server Requests
Managing Routes
Declaring Actions
Database Queries
Working of template engines (EJS)
NPM packages
express
mongoose
ejs
express-ejs-layouts
keu
request
bcrypto

Folder Structure
    |__ProjectDir
        |__assets
        |   |__css
        |      |__ layout.css
        |      |__ footer.css
        |      |__ home.css
        |      |__ header.css 
        |__config
        |   |__ mongooese.js
        |   |__ kue.js 
        |   |__ nodemailer.js
        |   |__ passport-local-strategy.js    
        |   |__ passport-google-oauth2-strategy.js
        |   |__ middleware.js 
        |__controllers
        |   |__ home_controller.js
        |   |__ users_controller  
        |__models
        |   |__ user.js
        |__routes
        |   |__ index.js
        |   |__user.js 
        |
        |__views
        |   |__home.ejs
        |   |__layout.ejs  
        |   |__ reset.ejs 
        |   |__ header.ejs 
        |   |__  footer.ejs
        |__ mailers
            |__forgetPassword_mailer.js
        |__ workers
            |__forgetPassword_email_worker.js    
        |__ .gitignore
        |__ index.js
        |__ package-lock.json
        |__ package.json
        |__ ReadMe.md

Run Project
    npm start
