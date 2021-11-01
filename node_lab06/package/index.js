const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "email1@gmail.com",
        pass: "pass",
    },
});

function send(message) {
    const options = {
        from: "email1@gmail.com",
        to: "email2@gmail.com",
        subject: "06-03",
        text: message,
    }

    transporter.sendMail(options, (err, info) => {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    })
}

module.exports = send;