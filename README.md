ToDo APP
ToDo App bulilt in NodeJS and Express

OverView
This small project help me understanding the working structure of a full scalable porject, and understanding the folder structure of the big projects.

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
        |      |__ style.css
        |   |__ 
        |   |__  
        |   |__  
        |__config
        |   |__ mongooese.js
        |   |__  
        |   |__  
        |   |__  
        |   |__  
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
        |   |__  
        |   |__  
        |   |__  
        |   |__  
        |__ .gitignore
        |__ index.js
        |__ package-lock.json
        |__ package.json
        |__ ReadMe.md

Run Project
    npm start
