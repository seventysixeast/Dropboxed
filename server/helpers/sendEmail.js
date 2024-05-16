const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
dotenv.config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport(
    {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secureConnection: true, // Use SSL/TLS
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    }
);
/*const transporter = nodemailer.createTransport({
   host: "smtp.ethereal.email",
   port: 587,
   secure: false, // Use `true` for port 465, `false` for all other ports
   auth: {
       user: "maddison53@ethereal.email",
       pass: "jn7jnAPss4f63QBp6D",
   },
});*/

// Function to send an email
exports.sendEmail = function (to, subject, html) {
    console.log("to", to, "subject", subject, "html", html);
    // Define email options
    const mailOptions = {
        from: process.env.SMTP_EMAIL_FROM,
        to: to,
        subject: subject,
        html: html
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Email sending error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

exports.generateVerificationToken = () => {
    return crypto.randomBytes(20).toString('hex');
};