var nodemailer = require('nodemailer');

export async function sendEmail(emailAddress, subject, message) {

    var transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'blockcommerc@gmail.com',
            pass: 'Snapshooter1'
        },
        secure: true
    });

    const mailOptions = {
        from: 'BlockCommerc <blockcommerc@gmail.com>', // sender address
        to: emailAddress, // list of receivers
        subject: subject, // Subject line
        html: message// plain text body
    };

    await transporter.sendMail(mailOptions, function (err, info) {
    })
}