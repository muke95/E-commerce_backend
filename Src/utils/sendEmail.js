const nodemailer = require("nodemailer");


const sendEmail = async(options)=>{



    let transporter = nodemailer.createTransport({
        service:process.env.SMPT_SERVICES,// true for 465, false for other ports
        auth: {
          user: process.env.SMPT_MAIL, // generated ethereal user
          pass: process.env.SMPT_MAIL_PASSWORD, // generated ethereal password
        },
      });

      const mailOptions = {
          from: process.env.SMPT_MAIL ,
          to:option.email,
          subject:options.subject,
          text: options.message
      } 

     await  transporter.sendMail(mailOptions);
};

module.exports =  sendEmail;