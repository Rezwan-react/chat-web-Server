const nodemailer = require("nodemailer");

const sendMail = async ()=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true, // true for port 465, false for other ports
        auth: {
            user: "mdrazwanking10@gmail.com",
            pass: "jrtz rsfc davs gdun ",
        },
    });

    // send mail with defined transport object
     await transporter.sendMail({
        from: '"on reply" ChatWeb', // sender address
        to: email, // list of receivers
        subject: "Email varification ✔", // Subject line
        html: `verify your email address with otp ; ${randomOtp}`, // html body
    });
}

module.exports = sendMail