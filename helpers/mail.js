const nodemailer = require("nodemailer");

const sendMail = async (email, subject, template, otp)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // send mail with defined transport object
     await transporter.sendMail({
        from: '"on reply" ChatWeb', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: template(otp || "") // html body
    });
}

module.exports = sendMail