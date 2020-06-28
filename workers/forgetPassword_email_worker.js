const queue = require('../config/kue');

const forgetPasswordMailer = require('../mailers/forgetPassword_mailer');

//Using kue's function "process" to add mail jobs in emails queue
queue.process('emails', function(job,done){
    console.log('email worker is processing a job', job.data.email);
    forgetPasswordMailer.forgetPassword(job.data);
    done();
});