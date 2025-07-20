const nodeMailer = require('nodemailer');
require('dotenv').config();
const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EmailMailer,
        pass: process.env.EmailMailer_Pass
    }
});
module.exports = transporter;