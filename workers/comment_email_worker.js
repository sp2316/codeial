const queue = require('../config/kue');

const commentsMailer=require('../mailers/comments_mailer');

//tells the worker to execute a task if added to the queue
//process name- emails
//process function calls the mailer
queue.process('emails',function(job,done){
    console.log('emails worker is processing a job',job.data);

    commentsMailer.newComment(job.data);
    done();
});