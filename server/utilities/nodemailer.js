const nodemailer = require('nodemailer');

module.exports = async function (options) {
    console.log(nodemailer);
    console.log('it is nodemailer');
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOption = {
        to: options.email,
        from: 'patreon <patreon@patreon.com>',
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOption);
};
