var nodemailer = require('nodemailer');

export async function sendEmail(emailAddress, subject, message) {

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'blockcommerc@gmail.com',
            pass: 'Snapshooter1'
        },
        secure: true
    });

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    const mailData = {
        from: 'BlockCommerc <blockcommerc@gmail.com>', // sender address
        to: emailAddress, // list of receivers
        subject: subject, // Subject line
        html: message// plain text body
    };

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });

    // var transporter = nodemailer.createTransport({
    //     port: 465,
    //     host: "smtp.gmail.com",
    //     auth: {
    //         user: 'blockcommerc@gmail.com',
    //         pass: 'Snapshooter1'
    //     },
    //     secure: true
    // });
    //
    // const mailOptions = {
    //     from: 'BlockCommerc <blockcommerc@gmail.com>', // sender address
    //     to: emailAddress, // list of receivers
    //     subject: subject, // Subject line
    //     html: message// plain text body
    // };
    //
    // await transporter.sendMail(mailOptions, function (err, info) {
    // })
}