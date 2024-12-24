// import node mailer
const nodemailer = require('nodemailer');

// create send email async function

const sendEmail = async (mailOptions) => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    let info = await transporter.sendMail(mailOptions);

    console.log(`Message sent: ${info.messageId}`);
};

module.exports = sendEmail;