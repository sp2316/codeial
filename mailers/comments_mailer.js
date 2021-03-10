const nodeMailer = require('../config/nodemailer');

//another way of exporting method 1. is module.exports=funcname 2. is below
exports.newComment = (comment) =>{
    console.log('Inside new comment mailer');

    nodeMailer.transporter.sendMail({
        from: 'saiprasadpalivela@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published',
        html:'<h1> Yup, your comment is  now published!</h1>'
    }),(err,info)=>{
        if(err){console.log('Error in sending mail',err);return;}

        console.log('Mail Delivered',info);
        return;
    };
}