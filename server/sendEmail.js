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
        if (err)
            return false
        else
            return true
    })
}

// export async function sendEmail(emailAddress, subject, message) {
//     var api_key = 'edd408673845457d6104448d7275a82a-64574a68-9e6f04a7';
//     var domain = 'blockcommerc.com';
//     var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
//
//     var data = {
//         from: 'Excited User <me@blockcommerc.com>',
//         to: 'ays9065@hotmail.com',
//         subject: 'Hello',
//         text: 'Testing some Mailgun awesomeness!'
//     };
//
//     mailgun.messages().send(data, function (error, body) {
//         console.log(body);
//     });
// }


// const mailgun = require('mailgun-js')
//
// export async function sendEmail(emailAddress, subject, message) {
//     const apiKey = 'edd408673845457d6104448d7275a82a-64574a68-9e6f04a7'
//     const DOMAIN = 'www.blockcommerc.com'
//     const mg = mailgun({apiKey: apiKey, domain: DOMAIN})
//     const data = {
//         from: 'BlockCommerc <noreply@blockcommerc.com>',
//         to: emailAddress,
//         subject: subject,
//         text: message.replace(/(<([^>]+)>)/gi, ''),
//         html: message
//     }
//     mg.messages().send(data, function (error, body) {
//         if (!error) {
//             return true
//         } else
//             return false
//     })
// }


// const sgMail = require('@sendgrid/mail')
//
// export async function sendEmail(emailAddress, subject, message) {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//     const msg = {
//         to: emailAddress,
//         from: 'BlockCommerc <noreply@blockcommerc.com>',
//         subject: subject,
//         text: message.replace(/(<([^>]+)>)/gi, ''),
//         html: message
//     }
//     try {
//         await sgMail.send(msg)
//         return true
//     } catch (e) {
//         return false
//     }
// }